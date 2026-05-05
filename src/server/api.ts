import { Router } from 'express';
import { db } from '../db';
import { colleges, courses, shortlists } from '../db/schema';
import { eq, like, and, or, lte, inArray } from 'drizzle-orm';
import crypto from 'crypto';

const router = Router();

// Get list of colleges with filters
router.get('/colleges', async (req, res) => {
  try {
    const { state, type, query, maxFees } = req.query;

    const filters = [];
    if (state) filters.push(eq(colleges.state, String(state)));
    if (type) filters.push(eq(colleges.type, String(type)));
    if (query) {
      const q = `%${String(query)}%`;
      filters.push(
        or(
          like(colleges.name, q),
          like(colleges.description, q),
          like(colleges.location, q)
        )
      );
    }
    if (maxFees) filters.push(lte(colleges.feesAnnual, Number(maxFees)));

    const result = await db.select().from(colleges).where(filters.length > 0 ? and(...filters) : undefined).all();
    res.json(result);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Compare colleges by IDs
router.get('/colleges/compare', async (req, res) => {
  try {
    const ids = req.query.ids;
    if (!ids || typeof ids !== 'string') {
      return res.status(400).json({ error: 'ids query parameter is required (comma separated)' });
    }
    const idArray = ids.split(',').filter(Boolean);
    if (idArray.length === 0) return res.json([]);

    const result = await db.select().from(colleges).where(inArray(colleges.id, idArray)).all();
    res.json(result);
  } catch (error) {
    console.error('Error comparing colleges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get single college by slug or id
router.get('/colleges/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const collegeList = await db
      .select()
      .from(colleges)
      .where(like(colleges.slug, slugOrId))
      .limit(1)
      .all();

    let college = collegeList[0];
    if (!college) {
       const byId = await db.select().from(colleges).where(eq(colleges.id, slugOrId)).limit(1).all();
       college = byId[0];
    }

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    const collegeCourses = await db.select().from(courses).where(eq(courses.collegeId, college.id)).all();

    res.json({ ...college, courses: collegeCourses });
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Shortlist Routes
router.get('/shortlists', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) return res.status(400).json({ error: 'Missing x-user-id header' });

    const userShortlists = await db.select({
      id: shortlists.id,
      college: colleges
    })
    .from(shortlists)
    .innerJoin(colleges, eq(shortlists.collegeId, colleges.id))
    .where(eq(shortlists.userId, userId))
    .all();

    res.json(userShortlists.map(s => s.college)); // Return just the populated colleges
  } catch (error) {
    console.error('Error fetching shortlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/shortlists', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const { collegeId } = req.body;
    
    if (!userId || !collegeId) {
      return res.status(400).json({ error: 'Missing userId or collegeId' });
    }

    // Check if college exists
    const college = await db.select().from(colleges).where(eq(colleges.id, collegeId)).get();
    if (!college) return res.status(404).json({ error: 'College not found' });

    // Ensure it's not already shortlisted
    const existing = await db.select().from(shortlists).where(and(eq(shortlists.userId, userId), eq(shortlists.collegeId, collegeId))).get();
    if (existing) {
      return res.json({ success: true, message: 'Already shortlisted' });
    }

    await db.insert(shortlists).values({
      id: "shrt-" + crypto.randomBytes(8).toString('hex'),
      userId,
      collegeId,
      createdAt: new Date()
    });

    res.json({ success: true, message: 'Added to shortlist' });
  } catch (error) {
    console.error('Error saving shortlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/shortlists/:collegeId', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const { collegeId } = req.params;

    if (!userId) return res.status(400).json({ error: 'Missing x-user-id header' });

    await db.delete(shortlists).where(and(eq(shortlists.userId, userId), eq(shortlists.collegeId, collegeId)));
    
    res.json({ success: true, message: 'Removed from shortlist' });
  } catch (error) {
    console.error('Error removing shortlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

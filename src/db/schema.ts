import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const colleges = sqliteTable('colleges', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  location: text('location').notNull(), /* specific city */
  state: text('state').notNull(), /* specific state */
  type: text('type').notNull(), /* "Public" | "Private" */
  rating: real('rating').notNull(), /* Out of 10 */
  ranking: integer('ranking'), /* NIRF or similar */
  feesAnnual: integer('fees_annual').notNull(), /* e.g. 500000 */
  placementAverageLpa: real('placement_average_lpa').notNull(), /* 12.5 */
  placementHighestLpa: real('placement_highest_lpa'), /* 50.0 */
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  logoUrl: text('logo_url').notNull(),
  website: text('website'),
});

export const courses = sqliteTable('courses', {
  id: text('id').primaryKey(),
  collegeId: text('college_id').notNull().references(() => colleges.id),
  name: text('name').notNull(),
  degree: text('degree').notNull(), /* B.Tech, MBA, etc */
  durationYears: integer('duration_years').notNull(),
  feesAnnual: integer('fees_annual').notNull(),
});

export const shortlists = sqliteTable('shortlists', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(), /* Simulating user auth */
  collegeId: text('college_id').notNull().references(() => colleges.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const collegesRelations = relations(colleges, ({ many }) => ({
  courses: many(courses),
  shortlists: many(shortlists),
}));

export const coursesRelations = relations(courses, ({ one }) => ({
  college: one(colleges, {
    fields: [courses.collegeId],
    references: [colleges.id],
  }),
}));

export const shortlistsRelations = relations(shortlists, ({ one }) => ({
  college: one(colleges, {
    fields: [shortlists.collegeId],
    references: [colleges.id],
  }),
}));

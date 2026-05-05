import { db } from './index';
import { colleges, courses, shortlists } from './schema';
import { eq, sql } from 'drizzle-orm';

export async function seedDB() {
  const existingCount = await db.select({ value: sql`count(*)` }).from(colleges);
  if (Number(existingCount[0].value) >= 1010) return; // already seeded 
  
  // Re-seeding logic
  console.log('Clearing existing db to re-seed with multi-domain colleges...');
  await db.delete(shortlists);
  await db.delete(courses);
  await db.delete(colleges);

  console.log('Seeding demo database with 1000+ colleges...');

  const c1 = 'cuid-iitb-001';
  const c2 = 'cuid-bits-002';
  const c3 = 'cuid-nit-003';
  const c4 = 'cuid-iiit-004';
  const c5 = 'cuid-vit-005';
  const c6 = 'cuid-srm-006';
  const c7 = 'cuid-mit-007';
  const c8 = 'cuid-iitd-008';
  const c9 = 'cuid-amrita-009';
  const c10 = 'cuid-dtu-010';

  const defaultColleges = [
    {
      id: c1,
      name: 'Indian Institute of Technology Bombay',
      slug: 'iit-bombay',
      location: 'Mumbai',
      state: 'Maharashtra',
      type: 'Public',
      rating: 9.8,
      ranking: 3,
      feesAnnual: 250000,
      placementAverageLpa: 23.5,
      placementHighestLpa: 150.0,
      description: 'IIT Bombay is a globally recognized engineering institution known for top-tier academics, vibrant campus life, and an exceptional alumni network across tech and entrepreneurship.',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
      website: 'https://www.iitb.ac.in'
    },
    {
      id: c2,
      name: 'BITS Pilani',
      slug: 'bits-pilani',
      location: 'Pilani',
      state: 'Rajasthan',
      type: 'Private',
      rating: 9.5,
      ranking: 15,
      feesAnnual: 550000,
      placementAverageLpa: 18.0,
      placementHighestLpa: 80.0,
      description: 'Birla Institute of Technology and Science, Pilani is a premier private engineering college known for its flexible curriculum, zero attendance policy, and strong entrepreneurial culture.',
      imageUrl: 'https://images.unsplash.com/photo-1590124792610-d8a1f49615a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg',
      website: 'https://www.bits-pilani.ac.in'
    },
    {
      id: c3,
      name: 'National Institute of Technology Trichy',
      slug: 'nit-trichy',
      location: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      type: 'Public',
      rating: 9.2,
      ranking: 8,
      feesAnnual: 180000,
      placementAverageLpa: 14.5,
      placementHighestLpa: 55.0,
      description: 'NIT Trichy is one of the oldest and most prestigious NITs in India, offering rigorous academics and excellent placements, primarily in software and core engineering sectors.',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/NIT_Trichy_logo.png',
      website: 'https://www.nitt.edu'
    },
    {
      id: c4,
      name: 'IIIT Hyderabad',
      slug: 'iiit-hyderabad',
      location: 'Hyderabad',
      state: 'Telangana',
      type: 'Public',
      rating: 9.4,
      ranking: 40,
      feesAnnual: 330000,
      placementAverageLpa: 25.0,
      placementHighestLpa: 100.0,
      description: 'The International Institute of Information Technology Hyderabad boasts incredibly strong computer science academics and coding culture, rivaling top IITs in CSE placements.',
      imageUrl: 'https://images.unsplash.com/photo-1560931505-1a3b1904b7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/International_Institute_of_Information_Technology%2C_Hyderabad_logo.png',
      website: 'https://www.iiit.ac.in'
    },
    {
      id: c5,
      name: 'Vellore Institute of Technology',
      slug: 'vit-vellore',
      location: 'Vellore',
      state: 'Tamil Nadu',
      type: 'Private',
      rating: 8.5,
      ranking: 12,
      feesAnnual: 450000,
      placementAverageLpa: 8.5,
      placementHighestLpa: 45.0,
      description: 'VIT is a heavily populated and popular private university with diverse program offerings and extensive corporate connections leading to massive recruitment drives.',
      imageUrl: 'https://images.unsplash.com/photo-1594901416462-8e7c10b2f0a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Vellore_Institute_of_Technology_seal_2017.svg',
      website: 'https://vit.ac.in'
    },
    {
      id: c6,
      name: 'SRM Institute of Science and Technology',
      slug: 'srm-chennai',
      location: 'Chennai',
      state: 'Tamil Nadu',
      type: 'Private',
      rating: 8.0,
      ranking: 24,
      feesAnnual: 400000,
      placementAverageLpa: 7.0,
      placementHighestLpa: 42.0,
      description: 'SRM IST offers wide-ranging undergraduate disciplines, huge campus infrastructure, and solid placement opportunities through extensive global tie-ups.',
      imageUrl: 'https://images.unsplash.com/photo-1581452932230-08709322b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f5/SRM_Institute_of_Science_and_Technology_logo.png',
      website: 'https://www.srmist.edu.in'
    },
    {
      id: c7,
      name: 'Manipal Institute of Technology',
      slug: 'mit-manipal',
      location: 'Manipal',
      state: 'Karnataka',
      type: 'Private',
      rating: 8.6,
      ranking: 55,
      feesAnnual: 520000,
      placementAverageLpa: 10.5,
      placementHighestLpa: 54.0,
      description: 'MIT Manipal is renowned for a comprehensive collegiate experience, very active student organizations, modern infrastructure, and strong alumni network.',
      imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Manipal_Institute_of_Technology_logo.png',
      website: 'https://manipal.edu/mit'
    },
    {
      id: c8,
      name: 'Indian Institute of Technology Delhi',
      slug: 'iit-delhi',
      location: 'New Delhi',
      state: 'Delhi',
      type: 'Public',
      rating: 9.7,
      ranking: 2,
      feesAnnual: 240000,
      placementAverageLpa: 22.0,
      placementHighestLpa: 125.0,
      description: 'IIT Delhi stands at the forefront of technical education and research in India. Its prime location drives immense post-graduate startup opportunities.',
      imageUrl: 'https://images.unsplash.com/photo-1568228020953-b1dca5a528cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Indian_Institute_of_Technology_Delhi_logo.svg/1200px-Indian_Institute_of_Technology_Delhi_logo.svg.png',
      website: 'https://home.iitd.ac.in'
    },
    {
      id: c9,
      name: 'Amrita Vishwa Vidyapeetham',
      slug: 'amrita-coimbatore',
      location: 'Coimbatore',
      state: 'Tamil Nadu',
      type: 'Private',
      rating: 8.8,
      ranking: 16,
      feesAnnual: 350000,
      placementAverageLpa: 9.0,
      placementHighestLpa: 35.0,
      description: 'Amrita focuses strongly on research and value-based education, with high discipline and rising academic profiles across its multi-campus structure.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/25/Amrita_Vishwa_Vidyapeetham_logo.png',
      website: 'https://www.amrita.edu'
    },
    {
      id: c10,
      name: 'Delhi Technological University',
      slug: 'dtu-delhi',
      location: 'New Delhi',
      state: 'Delhi',
      type: 'Public',
      rating: 9.0,
      ranking: 35,
      feesAnnual: 210000,
      placementAverageLpa: 15.0,
      placementHighestLpa: 60.0,
      description: 'DTU (formerly DCE) holds a vast legacy in engineering education, boasting excellent ROI, great placements, and a vibrant college campus life close to civil services hubs.',
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Delhi_Technological_University_logo.png',
      website: 'http://www.dtu.ac.in'
    }
  ];
  
  // Insert initial default real-ish colleges
  try {
    await db.insert(colleges).values(defaultColleges);
  } catch (e) {
    console.log("Defaults might already exist");
  }

  // Generate 1000 mockup colleges across different domains
  const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Telangana', 'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Rajasthan'];
  const cities: Record<string, string[]> = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'],
    'Delhi': ['New Delhi', 'Dwarka', 'Rohini'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
    'Uttar Pradesh': ['Noida', 'Kanpur', 'Lucknow', 'Varanasi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'West Bengal': ['Kolkata', 'Durgapur', 'Haldia', 'Asansol'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
  };
  const types = ['Public', 'Private'];
  
  const domains = [
    { type: 'Engineering', suffix: 'Institute of Technology', degrees: ['B.Tech', 'M.Tech', 'BE'], courses: ['Computer Science', 'Electronics', 'Mechanical'] },
    { type: 'Medical', suffix: 'Medical College & Hospital', degrees: ['MBBS', 'BDS', 'BAMS'], courses: ['Medicine', 'Dental', 'Ayurvedic'] },
    { type: 'Management', suffix: 'Institute of Management', degrees: ['MBA', 'BBA', 'PGDM'], courses: ['Finance', 'Marketing', 'Human Resources'] },
    { type: 'Law', suffix: 'Law School', degrees: ['LLB', 'LLM', 'BA LLB'], courses: ['Corporate Law', 'Criminal Law', 'Constitutional Law'] },
  ];
  
  const generatedColleges = [];
  const generatedCourses = [];
  
  for(let i=1; i<=1000; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const stateCities = cities[state];
    const city = stateCities[Math.floor(Math.random() * stateCities.length)];
    const type = types[Math.floor(Math.random() * types.length)] as "Public"|"Private";
    const fees = (Math.floor(Math.random() * 20) + 1) * 50000;
    const avgLpa = Math.floor(Math.random() * 15) + 3 + Math.random();
    const highestLpa = avgLpa + Math.floor(Math.random() * 30) + 10;
    const rating = Math.floor(Math.random() * 40)/10 + 6; // 6.0 to 9.9
    const id = `cuid-mock-${i}`;
    
    const domainInfo = domains[Math.floor(Math.random() * domains.length)];
    
    generatedColleges.push({
      id,
      name: `${city} ${domainInfo.suffix} ${i}`,
      slug: `mock-${city.toLowerCase()}-${domainInfo.type.toLowerCase()}-${i}`,
      location: city,
      state: state,
      type: type,
      rating: Number(rating.toFixed(1)),
      ranking: i + 50,
      feesAnnual: fees,
      placementAverageLpa: Number(avgLpa.toFixed(1)),
      placementHighestLpa: Number(highestLpa.toFixed(1)),
      description: `A prime ${domainInfo.type} institution established in ${city}, providing state-of-the-art facilities and strong industry connections in the region.`,
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_custom_logo.png',
      website: `https://www.mock-its-${i}.edu.in`
    });
    
    generatedCourses.push({ id: `crs-mock-${i}-1`, collegeId: id, name: domainInfo.courses[0], degree: domainInfo.degrees[0], durationYears: 4, feesAnnual: fees });
    generatedCourses.push({ id: `crs-mock-${i}-2`, collegeId: id, name: domainInfo.courses[1], degree: domainInfo.degrees[1], durationYears: 4, feesAnnual: fees });
  }

  // Batch insert
  for (let i = 0; i < generatedColleges.length; i += 100) {
    const batch = generatedColleges.slice(i, i + 100);
    const crsBatch = generatedCourses.slice(i * 2, (i + 100) * 2);
    try {
      await db.insert(colleges).values(batch);
      await db.insert(courses).values(crsBatch);
    } catch (e) {
      console.error("Batch insert error:", e);
    }
  }

  const defaultCourses = [
    { id: 'crs-iitb-001', collegeId: c1, name: 'Computer Science and Engineering', degree: 'B.Tech', durationYears: 4, feesAnnual: 250000 },
    { id: 'crs-iitb-002', collegeId: c1, name: 'Electrical Engineering', degree: 'B.Tech', durationYears: 4, feesAnnual: 250000 },
    { id: 'crs-bits-001', collegeId: c2, name: 'Computer Science', degree: 'B.E (Hons)', durationYears: 4, feesAnnual: 550000 },
    { id: 'crs-bits-002', collegeId: c2, name: 'Electronics and Instrumentation', degree: 'B.E (Hons)', durationYears: 4, feesAnnual: 550000 },
    { id: 'crs-nit-001', collegeId: c3, name: 'Mechanical Engineering', degree: 'B.Tech', durationYears: 4, feesAnnual: 180000 },
    { id: 'crs-nit-002', collegeId: c3, name: 'Computer Science', degree: 'B.Tech', durationYears: 4, feesAnnual: 180000 },
    { id: 'crs-iiit-001', collegeId: c4, name: 'Computer Science and Engg', degree: 'B.Tech', durationYears: 4, feesAnnual: 330000 },
    { id: 'crs-vit-001', collegeId: c5, name: 'Computer Science', degree: 'B.Tech', durationYears: 4, feesAnnual: 450000 },
    { id: 'crs-srm-001', collegeId: c6, name: 'Information Technology', degree: 'B.Tech', durationYears: 4, feesAnnual: 400000 },
    { id: 'crs-mit-001', collegeId: c7, name: 'Electronics and Communication', degree: 'B.Tech', durationYears: 4, feesAnnual: 520000 },
    { id: 'crs-iitd-001', collegeId: c8, name: 'Mathematics and Computing', degree: 'B.Tech', durationYears: 4, feesAnnual: 240000 },
    { id: 'crs-dtu-001', collegeId: c10, name: 'Software Engineering', degree: 'B.Tech', durationYears: 4, feesAnnual: 210000 },
  ];

  await db.insert(courses).values(defaultCourses);

  console.log('Database seeded successfully!');
}

'use strict';

const bcrypt = require('bcryptjs');
const {
  AdminUser,
  Service,
  Product,
  Testimonial,
  CompanySettings,
  PortfolioItem,
} = require('../models');

/**
 * runSeed — seeds initial data into the database.
 * Safe to call on every startup: each section checks its own table independently.
 *
 * @param {import('sequelize').Sequelize} sequelize
 */
async function runSeed(sequelize) {
  console.log('[Seed] Checking seed status...');

  // ── Portfolio Items (always check independently) ──────────────────────────────
  const portfolioCount = await PortfolioItem.count();
  if (portfolioCount === 0) {
    await PortfolioItem.bulkCreate([
      {
        title: 'R Services – Enterprise Software & Web Platform',
        description:
          'Comprehensive service management, real-time client tracking, and automated service delivery portal built with high-performance React frontend and Node.js REST API.',
        image: '',
        link: '',
      },
    ]);
    console.log('[Seed] ✅ Portfolio items seeded (R Services).');
  } else {
    console.log('[Seed] Portfolio items already exist. Skipping.');
  }

  // Guard: skip rest of seeding if admin user already exists
  const existingAdmin = await AdminUser.findOne({ where: { email: 'admin@aventrixsolutions.com' } });
  if (existingAdmin) {
    console.log('[Seed] Core data already seeded. Skipping.');
    return;
  }

  console.log('[Seed] Starting database seed...');

  // ── 1. Admin User ────────────────────────────────────────────────────────────
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash('Admin@123', saltRounds);

  await AdminUser.create({
    email: 'admin@aventrixsolutions.com',
    password_hash: passwordHash,
  });
  console.log('[Seed] ✓ Admin user created: admin@aventrixsolutions.com');

  // ── 2. Company Settings ───────────────────────────────────────────────────────
  await CompanySettings.create({
    company_name: 'Aventrix Solutions',
    address: 'Vaishnodevi, Ahmedabad',
    phone: '7863880313',
    email: 'yatinpatel2747@gmail.com',
    social_links: {},
    favicon_url: null,
  });
  console.log('[Seed] ✓ Company settings created.');

  // ── 3. Services ───────────────────────────────────────────────────────────────
  await Service.bulkCreate([
    {
      title: 'Website Development',
      description:
        'We build modern, responsive, and high-performance websites tailored to your business needs. From landing pages to complex web portals, we deliver pixel-perfect results.',
      icon: 'FaGlobe',
      display_order: 1,
    },
    {
      title: 'App Development',
      description:
        'Native and cross-platform mobile applications for iOS and Android. We create seamless user experiences that drive engagement and business growth.',
      icon: 'FaMobileAlt',
      display_order: 2,
    },
    {
      title: 'Software Development',
      description:
        'Custom enterprise software solutions that streamline your operations. Scalable, secure, and built for the future with modern architectures.',
      icon: 'FaCode',
      display_order: 3,
    },
    {
      title: 'AI Automation',
      description:
        'Leverage the power of artificial intelligence to automate repetitive tasks, reduce costs, and unlock new levels of business efficiency.',
      icon: 'FaRobot',
      display_order: 4,
    },
    {
      title: 'AI Chatbots',
      description:
        'Intelligent conversational AI solutions that engage your customers 24/7, answer queries, and drive conversions through natural language understanding.',
      icon: 'FaComments',
      display_order: 5,
    },
  ]);
  console.log('[Seed] ✓ 5 services created.');

  // ── 4. Product: KrushiBill ERP ────────────────────────────────────────────────
  await Product.create({
    name: 'KrushiBill ERP',
    slug: 'krushibili-erp',
    description:
      'KrushiBill ERP is a comprehensive billing and ERP solution designed specifically for agriculture pesticide and seeds shops. Manage your inventory, billing, customers, and accounting all in one place.',
    features: [
      'Complete billing management with GST support',
      'Real-time inventory tracking for pesticides & seeds',
      'Farmer/customer database management',
      'Purchase and sales return management',
      'Detailed reports and analytics dashboard',
      'Multi-company support with individual settings',
      'Payment receipt and ledger management',
      'Stock management with low-stock alerts',
    ],
    modules: [
      'Dashboard',
      'New Billing',
      'Bill History',
      'Sales Return',
      'Payment Receipts',
      'Farmers',
      'Products',
      'Stock Management',
      'Purchase Entry',
      'Purchase Return',
      'Accounting & Ledgers',
      'Reports & Analytics',
      'Company Settings',
    ],
    images: [],
  });
  console.log('[Seed] ✓ Product KrushiBill ERP created.');

  // ── 5. Testimonials ───────────────────────────────────────────────────────────
  await Testimonial.bulkCreate([
    {
      name: 'Ravi Patel',
      designation: 'CEO',
      company: 'AgroFresh Distributors',
      review_text:
        'Aventrix Solutions transformed our business with their KrushiBill ERP. The software perfectly handles our pesticide and seed shop operations. Billing is 10x faster and inventory tracking has eliminated stock shortages.',
      photo_url: '',
    },
    {
      name: 'Meera Shah',
      designation: 'Director',
      company: 'GreenLeaf Agro',
      review_text:
        'Outstanding development team! They built our e-commerce platform within the promised timeline and budget. The website is fast, beautiful, and our sales have increased by 40% since launch.',
      photo_url: '',
    },
    {
      name: 'Suresh Mehta',
      designation: 'Founder',
      company: 'TechRetail Solutions',
      review_text:
        'The AI chatbot Aventrix Solutions implemented for us has been a game-changer. Our customer support costs reduced by 60% and customer satisfaction scores went up. Highly recommend their AI services!',
      photo_url: '',
    },
    {
      name: 'Priya Desai',
      designation: 'Operations Head',
      company: 'HealthFirst Clinics',
      review_text:
        'We needed a custom healthcare management system and Aventrix delivered beyond expectations. The software is intuitive, HIPAA-compliant, and the team was always responsive to our needs.',
      photo_url: '',
    },
    {
      name: 'Arjun Sharma',
      designation: 'CTO',
      company: 'EduLearn Platform',
      review_text:
        'Aventrix Solutions built our entire learning management platform from scratch. The React frontend is blazing fast, the backend is rock-solid, and the admin panel saves us hours of work every week.',
      photo_url: '',
    },
    {
      name: 'Kavita Joshi',
      designation: 'Managing Director',
      company: 'Krishnamurthy Agro Inputs',
      review_text:
        'As a traditional agriculture supplies dealer, we were hesitant about software. But KrushiBill ERP by Aventrix Solutions made the transition seamless. Now managing 500+ farmers and billing has never been this easy!',
      photo_url: '',
    },
  ]);
  console.log('[Seed] ✓ 6 testimonials created.');

  console.log('[Seed] ✅ Database seeding complete!');
}

module.exports = { runSeed };

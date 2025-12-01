require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const College = require('../models/College');
const Post = require('../models/Post');
const Certification = require('../models/Certification');
const Material = require('../models/Material');
const Comment = require('../models/Comment');
const connectDB = require('../config/database');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await College.deleteMany({});
    await Post.deleteMany({});
    await Certification.deleteMany({});
    await Material.deleteMany({});
    await Comment.deleteMany({});

    // Create colleges
    console.log('Creating colleges...');
    const college1 = await College.create({
      name: 'Tech University',
      address: '123 Tech Street, City, State 12345',
      contactEmail: 'info@techuniversity.edu',
      website: 'https://techuniversity.edu',
    });

    const college2 = await College.create({
      name: 'Business College',
      address: '456 Business Ave, City, State 12345',
      contactEmail: 'info@businesscollege.edu',
      website: 'https://businesscollege.edu',
    });

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@educonnect.com',
      passwordHash: 'password123', // Will be hashed by pre-save hook
      role: 'admin',
    });

    // Update college createdByAdminId
    college1.createdByAdminId = admin._id;
    college2.createdByAdminId = admin._id;
    await college1.save();
    await college2.save();

    // Create student users
    console.log('Creating student users...');
    const student1 = await User.create({
      name: 'John Doe',
      email: 'student@college1.edu',
      passwordHash: 'password123',
      role: 'student',
      collegeName: college1.name,
      bio: 'Computer Science student passionate about web development',
    });

    const student2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@college1.edu',
      passwordHash: 'password123',
      role: 'student',
      collegeName: college1.name,
      bio: 'Software Engineering student',
    });

    const student3 = await User.create({
      name: 'Bob Johnson',
      email: 'bob@college2.edu',
      passwordHash: 'password123',
      role: 'student',
      collegeName: college2.name,
      bio: 'Business Administration student',
    });

    // Create posts
    console.log('Creating posts...');
    const post1 = await Post.create({
      authorId: student1._id,
      content: 'Just finished an amazing project on React! Excited to share what I learned.',
      type: 'post',
      likes: [student2._id],
    });

    const post2 = await Post.create({
      authorId: student2._id,
      content: 'Looking for study partners for the upcoming exams. Anyone interested?',
      type: 'post',
      likes: [student1._id],
    });

    // Create certifications
    console.log('Creating certifications...');
    const cert1 = await Certification.create({
      userId: student1._id,
      title: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      issueDate: new Date('2024-01-15'),
      credentialUrl: 'https://aws.amazon.com/certification',
      description: 'Earned AWS Solutions Architect certification after completing the exam.',
      visibility: 'college',
    });

    const certPost1 = await Post.create({
      authorId: student1._id,
      content: `Earned certification: ${cert1.title} from ${cert1.organization}`,
      type: 'certification',
      likes: [student2._id],
    });

    cert1.postId = certPost1._id;
    await cert1.save();

    const cert2 = await Certification.create({
      userId: student2._id,
      title: 'React Developer Certification',
      organization: 'Meta',
      issueDate: new Date('2024-02-20'),
      credentialUrl: 'https://react.dev',
      description: 'Completed React Developer certification program.',
      visibility: 'college',
    });

    const certPost2 = await Post.create({
      authorId: student2._id,
      content: `Earned certification: ${cert2.title} from ${cert2.organization}`,
      type: 'certification',
    });

    cert2.postId = certPost2._id;
    await cert2.save();

    // Create comments
    console.log('Creating comments...');
    const comment1 = await Comment.create({
      postId: post1._id,
      authorId: student2._id,
      content: 'Great work! Would love to see the code.',
    });

    const reply1 = await Comment.create({
      postId: post1._id,
      authorId: student1._id,
      parentCommentId: comment1._id,
      content: 'Thanks! I\'ll share it soon.',
    });

    // Create materials (note: fileUrl is placeholder, actual files would be uploaded to S3)
    console.log('Creating materials...');
    await Material.create({
      uploadedByAdminId: admin._id,
      collegeName: college1.name,
      title: 'Introduction to Web Development',
      description: 'Comprehensive guide to web development fundamentals',
      fileUrl: 'https://example.com/materials/web-dev-intro.pdf',
      fileType: 'pdf',
      fileSize: 2048000,
    });

    await Material.create({
      uploadedByAdminId: admin._id,
      collegeName: college1.name,
      title: 'React Best Practices',
      description: 'Presentation on React best practices and patterns',
      fileUrl: 'https://example.com/materials/react-best-practices.pptx',
      fileType: 'pptx',
      fileSize: 5120000,
    });

    await Material.create({
      uploadedByAdminId: admin._id,
      collegeName: college2.name,
      title: 'Business Strategy Fundamentals',
      description: 'Core concepts in business strategy',
      fileUrl: 'https://example.com/materials/business-strategy.docx',
      fileType: 'docx',
      fileSize: 1024000,
    });

    console.log('✅ Database seeded successfully!');
    console.log('\nDefault credentials:');
    console.log('Admin: admin@educonnect.com / password123');
    console.log('Student 1: student@college1.edu / password123');
    console.log('Student 2: jane@college1.edu / password123');
    console.log('Student 3: bob@college2.edu / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();


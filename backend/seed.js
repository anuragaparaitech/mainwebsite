const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Remove existing admins
    await Admin.deleteMany({});

    // Create admin from .env credentials
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Super Admin',
    });

    await admin.save();
    console.log(`✅ Admin created successfully!`);
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    console.log('\nYou can now log in to the admin panel.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();

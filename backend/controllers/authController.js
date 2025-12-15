import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }
    
    
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bio: ""
    });
    
    await newUser.save();
    
    
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error("Error signing up:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Check for admin credentials first
    if (email === 'admin@forum.com' && password === 'admin123') {
      // Create or find admin user
      let adminUser = await User.findOne({ email: 'admin@forum.com' });
      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        adminUser = new User({
          username: 'Admin',
          email: 'admin@forum.com',
          password: hashedPassword,
          role: 'admin',
          bio: 'System Administrator'
        });
        await adminUser.save();
      }
      const adminResponse = adminUser.toObject();
      delete adminResponse.password;
      return res.json({ message: "Admin login successful", user: adminResponse });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ message: "Login successful", user: userResponse });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};



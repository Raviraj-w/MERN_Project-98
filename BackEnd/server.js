const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const User = require('./models/schema');
const bcrypt = require('bcryptjs');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Backend server is running successfully!");
});

// SIGN UP ROUTE
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
});

// SIGN IN ROUTE
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: "Welcome back, " + user.firstName });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log("Server running on: http://localhost:" + PORT);
});
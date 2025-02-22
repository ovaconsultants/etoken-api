const express = require('express');
const path = require("path");
// const dotenv = require('dotenv').config({ path: '.env.development' });
const providerRoutes = require('./routes/providerRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const accountRoutes = require('./routes/accountRoutes');
const patientRoutes = require('./routes/patientRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const exceptionRoutes= require('./routes/exceptionRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 


// Remove duplicate dotenv.config() call here, as it was already done in the previous line.

const app = express();
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: process.env.WEB_URL, // Use the WEB_URL from environment or fallback to localhost
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies (including JWT cookie) to be sent
}));

app.use(express.json()); // Parse JSON bodies

// Register routes
app.use('/provider', providerRoutes);
app.use('/registration', accountRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/token', tokenRoutes);
app.use('/exception', exceptionRoutes);


// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

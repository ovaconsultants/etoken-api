const express = require('express');
// const dotenv = require('dotenv').config({ path: '.env.development' });
const providerRoutes = require('./routes/providerRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const accountRoutes = require('./routes/accountRoutes');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 


// Remove duplicate dotenv.config() call here, as it was already done in the previous line.

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: process.env.WEB_URL, // Use the WEB_URL from environment or fallback to localhost
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies (including JWT cookie) to be sent
}));

app.use(express.json()); // Parse JSON bodies

// Register routes
app.use('/api/provider', providerRoutes);
app.use('/api/registration', accountRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);


// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

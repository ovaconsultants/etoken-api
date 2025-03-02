const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

/*
POST http://localhost:5000/advertisement/insertAdvertisement
{
    "doctor_id": 10,
    "company_name": "Pharma Inc.",
    "content_type": "Video",
    "content_url": "https://example.com/video.mp4",
    "display_duration": 30,
    "display_frequency": "1 hour",
    "start_date": "2024-02-20",
    "end_date": "2024-03-20",
    "start_time": "09:00:00",
    "end_time": "18:00:00"
}

*/ 
const insertAdvertisement = asyncHandler(async (req, res) => {
    const {
      doctor_id,
      company_name,
      content_type,
      content_url,
      display_duration,
      display_frequency = "1 hour",
      start_date,
      end_date,
      start_time = "09:00:00",
      end_time = "18:00:00"
    } = req.body;
  
    // Validate required fields
    if (!doctor_id || !company_name || !content_type || !content_url || !display_duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
        error: "Doctor ID, Company Name, Content Type, Content URL, and Display Duration are required."
      });
    }
  
    // Call stored procedure (SP) correctly
    await db.query(
      "CALL etoken.sp_insert_advertisement($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
      [
        doctor_id,
        company_name,
        content_type,
        content_url,
        display_duration,
        display_frequency,
        start_date,
        end_date,
        start_time,
        end_time
      ]
    );
  
    res.status(201).json({
      success: true,
      message: "Advertisement inserted successfully",
      advertisement: {
        doctor_id,
        company_name,
        content_type,
        content_url,
        display_duration,
        display_frequency,
        start_date,
        end_date,
        start_time,
        end_time
      },
      error: null
    });
  }, "Error inserting advertisement");
  
module.exports = { insertAdvertisement };

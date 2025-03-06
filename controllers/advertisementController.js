const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

/*
POST http://localhost:5000/advertisement/insertAdvertisement
{
    "doctor_id": 2,
    "clinic_id": 2,
    "company_name": "Pharma Inc.",
    "content_type": "Video",
    "content_url": "https://example.com/video.mp4",
    "display_duration": 30,
    "display_frequency": "1 hour",
    "start_date": "2024-02-20",
    "end_date": "2025-05-20",
    "start_time": "09:00:00",
    "end_time": "18:00:00"
}
*/ 
const insertAdvertisement = asyncHandler(async (req, res) => {
    const {
      doctor_id,
      clinic_id,
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
    if (!doctor_id || !clinic_id || !company_name || !content_type || !content_url || !display_duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
        error: "Doctor ID, Clinic ID, Company Name, Content Type, Content URL, and Display Duration are required."
      });
    }
  
    // Call stored procedure correctly
    await db.query(
      "CALL etoken.sp_insert_advertisement($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
      [
        doctor_id,
        clinic_id,
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
        clinic_id,
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

  //http://localhost:3001/advertisement/fetchActiveAdvertisements?doctor_id=2&clinic_id=2
  const fetchActiveAdvertisements = asyncHandler(async (req, res) => {
    const { doctor_id, clinic_id } = req.query;

    // Validate required fields
    if (!doctor_id || !clinic_id) {
        return res.status(400).json({
            success: false,
            message: "Missing required parameters.",
            error: "Doctor ID and Clinic ID are required."
        });
    }

    // Call stored function and get response
    const result = await db.query(
        "SELECT * FROM etoken.fn_fetch_active_advertisements($1, $2);",
        [parseInt(doctor_id), parseInt(clinic_id)]
    );

    // If no advertisements found
    if (!result.rows.length) {
        return res.status(404).json({
            success: false,
            message: "No active advertisements found.",
            advertisements: [],
            error: "No records found."
        });
    }

    res.status(200).json({
        success: true,
        message: "Active advertisements fetched successfully.",
        advertisements: result.rows,
        error: null
    });
}, "Error fetching active advertisements");

/* PUT http://localhost:5000/advertisement/updateAdvertisement
{
    "ad_id": 2,
    "doctor_id": 2,
    "clinic_id": 2,
    "company_name": "Pharma Inc.",
    "content_type": "Video",
    "content_url": "https://example.com/video.mp4",
    "display_duration": 30,
    "display_frequency": "1 hour",
    "start_date": "2024-02-20",
    "end_date": "2026-05-20",
    "start_time": "09:00:00",
    "end_time": "18:00:00"
}
*/

const updateAdvertisement = asyncHandler(async (req, res) => {
    const {
        ad_id,
        doctor_id,
        clinic_id,
        company_name,
        content_type,
        content_url,
        display_duration,
        display_frequency,
        start_date,
        end_date,
        start_time,
        end_time
    } = req.body;

    // Validate required fields
    if (!ad_id) {
        return res.status(400).json({
            success: false,
            message: "Missing required field.",
            error: "Advertisement ID is required."
        });
    }

    // Call stored procedure
    const result = await db.query(
        "CALL etoken.sp_update_advertisement($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
        [
            ad_id,
            doctor_id || null,
            clinic_id || null,
            company_name || null,
            content_type || null,
            content_url || null,
            display_duration || null,
            display_frequency || null,
            start_date || null,
            end_date || null,
            start_time || null,
            end_time || null,
            null // OUT parameter for message
        ]
    );

    // Extract returned message
    const message = result.rows[0]?.message;

    // If no message, return an error
    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Advertisement not found.",
            error: "Invalid Advertisement ID."
        });
    }

    res.status(200).json({
        success: true,
        message: message,
        error: null
    });
}, "Error updating advertisement");
  
module.exports = { insertAdvertisement, fetchActiveAdvertisements,updateAdvertisement };

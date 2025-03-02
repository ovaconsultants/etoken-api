const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

/*
POST advertisementPayment/insertAdvertisementPayment
{
    "ad_id": 42,
    "amount": 500.00,
    "payment_date": "2024-02-20",
    "is_paid": true,
    "effective_date": "2024-02-21",
    "end_date": "2024-03-21",
    "company_name": "Pharma Inc.",
    "payment_method": "Credit Card"
}

*/
const insertAdvertisementPayment = asyncHandler(async (req, res) => {
    const {
      ad_id,
      amount,
      payment_date,
      is_paid,
      effective_date,
      end_date,
      company_name,
      payment_method
    } = req.body;
  
    // Validate required fields
    if (!ad_id || !amount || !payment_date || !effective_date || !end_date || !company_name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
        error: "Ad ID, Amount, Payment Date, Effective Date, End Date, and Company Name are required."
      });
    }
  
    // Call stored procedure (SP) correctly
    await db.query(
      "CALL etoken.sp_insert_advertisement_payment($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        ad_id,
        amount,
        payment_date,
        is_paid,
        effective_date,
        end_date,
        company_name,
        payment_method
      ]
    );
  
    res.status(201).json({
      success: true,
      message: "Advertisement payment inserted successfully",
      payment: {
        ad_id,
        amount,
        payment_date,
        is_paid,
        effective_date,
        end_date,
        company_name,
        payment_method
      },
      error: null
    });
  }, "Error inserting advertisement payment");
  
  module.exports = { insertAdvertisementPayment };
  
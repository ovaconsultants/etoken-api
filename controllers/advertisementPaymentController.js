const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

/*
POST advertisementPayment/insertAdvertisementPayment
{
    "ad_id": 2,
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
  if (!ad_id || !amount || !payment_date || !effective_date || !end_date || !company_name || !payment_method) {
      return res.status(400).json({
          success: false,
          message: "Missing required fields.",
          error: "All fields except is_paid are mandatory."
      });
  }

  // Call stored procedure
  const result = await db.query(
      "CALL etoken.sp_insert_advertisement_payment($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      [
          ad_id,
          amount,
          payment_date,
          is_paid || false,
          effective_date,
          end_date,
          company_name,
          payment_method,
          null // OUT parameter for message
      ]
  );

  // Extract returned message
  const message = result.rows[0]?.message;

  // If the function returns an error message
  if (message.includes("Error")) {
      return res.status(400).json({
          success: false,
          message: message,
          error: "Validation failed."
      });
  }

  res.status(201).json({
      success: true,
      message: message,
      error: null
  });
}, "Error inserting advertisement payment");

 /* Sample request body for updateAdvertisementPayment:
 {
    "payment_id": 10,
    "ad_id": 5,
    "amount": 500.00,
    "payment_date": "2024-03-01",
    "is_paid": true,
    "effective_date": "2024-03-01",
    "end_date": "2024-06-01",
    "company_name": "Pharma Corp",
    "payment_method": "Credit Card",
    "modified_by": "admin"
}
    */


const updateAdvertisementPayment = asyncHandler(async (req, res) => {
  const {
      payment_id,
      ad_id,
      amount,
      payment_date,
      is_paid,
      effective_date,
      end_date,
      company_name,
      payment_method,
      is_active,
      is_deleted,
      modified_by
  } = req.body;

  // Validate required fields
  if (!payment_id || !modified_by) {
      return res.status(400).json({
          success: false,
          message: "Missing required fields.",
          error: "Payment ID and modified_by are required."
      });
  }

  // Validate is_active and is_deleted
  const allowedStatus = ["Y", "N"];
  if (is_active && !allowedStatus.includes(is_active)) {
      return res.status(400).json({
          success: false,
          message: "Invalid is_active value. Allowed values: Y, N",
          error: "Validation failed."
      });
  }
  if (is_deleted && !allowedStatus.includes(is_deleted)) {
      return res.status(400).json({
          success: false,
          message: "Invalid is_deleted value. Allowed values: Y, N",
          error: "Validation failed."
      });
  }

  // Call stored procedure
  const result = await db.query(
      "CALL etoken.sp_update_advertisement_payment($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
      [
          payment_id,
          ad_id || null,
          amount || null,
          payment_date || null,
          is_paid || null,
          effective_date || null,
          end_date || null,
          company_name || null,
          payment_method || null,
          is_active || "Y",
          is_deleted || "N",
          modified_by,
          null // OUT parameter for message
      ]
  );

  // Extract returned message
  const message = result.rows[0]?.message;

  // If the function returns an error message
  if (message.includes("Error")) {
      return res.status(400).json({
          success: false,
          message: message,
          error: "Validation failed."
      });
  }

  res.status(200).json({
      success: true,
      message: message,
      error: null
  });
}, "Error updating advertisement payment");

const fetchAdvertisementPaymentsByAdId = asyncHandler(async (req, res) => {
  const { ad_id } = req.query;

  // Validate required fields
  if (!ad_id || isNaN(ad_id)) {
      return res.status(400).json({
          success: false,
          message: "Invalid advertisement ID.",
          error: "Advertisement ID must be a valid number."
      });
  }

  // Call stored function
  const result = await db.query(
      "SELECT * FROM etoken.fn_fetch_advertisement_payments_by_ad_id($1);",
      [parseInt(ad_id)]
  );

  res.status(200).json({
      success: true,
      message: "Advertisement payments fetched successfully.",
      payments: result.rows,
      error: null
  });
}, "Error fetching advertisement payments");
  
  module.exports = { insertAdvertisementPayment, updateAdvertisementPayment, fetchAdvertisementPaymentsByAdId };
  
const { sendEmailService } = require("../services/emailService");
//const { Int } = require("mssql");
const p = require("../config/db");
const XLSX = require("xlsx");

const { generateToken } = require("../utils/jwtUtils");

// Simulate user login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Mock user validation (replace with real DB lookup)
  if (username === "test" && password === "password") {
    const token = generateToken(1); // Mock userId as 1
    return res.status(200).send({ token });
  }

  return res.status(401).send({ message: "Invalid credentials." });
};

// Protected route example
const getProfile = (req, res) => {
  res.send({ message: `Hello, user ${req.user.id}!` });
};

// getting registrstion types from database
const getRegistrationType = (req, res) => {
  var resp;
  p.query(
    "SELECT * FROM ova2.udf_fetch_registration_type();",
    (err, response) => {
      if (err) {
        console.error("Query error", err.stack);
      } else {
        resp = response.rows;
      }
      res.send({ message: resp });
    }
  );
};

// registereing user in the database
const registerUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    address,
    registration_type_id,
    current_location,
    experience_in_years,
    technology,
  } = req.body;

  // Validate required fields
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    // Insert user data into the database
    const dbResponse = await p.query(
      `SELECT ova2.udf_insert_into_registration($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        first_name,
        last_name,
        email,
        phone,
        password,
        address,
        registration_type_id,
        current_location,
        experience_in_years,
      ]
    );

    // Check if database response indicates success
    if (dbResponse.rowCount === 0) {
      return res
        .status(500)
        .json({ message: "User registration failed in the database." });
    }

    // Format email content
    const emailContent = `
      <h1>New User Registration</h1>
      <p><strong>First Name:</strong> ${first_name}</p>
      <p><strong>Last Name:</strong> ${last_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Registration Type ID:</strong> ${registration_type_id}</p>
      <p><strong>Current Location:</strong> ${current_location}</p>
      <p><strong>Experience (Years):</strong> ${experience_in_years}</p>
      <p><strong>Technology:</strong> ${technology}</p>
    `;

    // Send registration success email
    const emailResponse = await sendEmailService({
      to: "hr@ova2consultancy.com",
      subject: "Registration of New User on OVA2 Consultancy",
      text: `New user registered:\n
        First Name: ${first_name}\n
        Last Name: ${last_name}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Address: ${address}\n
        Registration Type ID: ${registration_type_id}\n
        Current Location: ${current_location}\n
        Experience (Years): ${experience_in_years}\n
        Technology: ${technology}`,
      html: emailContent,
    });

    console.log(
      "Email sent successfully:",
      emailResponse.messageId || emailResponse
    );

    res
      .status(200)
      .json({ message: "User registered and email sent successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// fetching all the users for the admin panel
const FetchUsers = async (req, res) => {
  try {
    const result = await p.query("SELECT * FROM ova2.udf_fetch_users();");
    res.status(200).send({ users: result.rows });
  } catch (err) {
    console.error("Query Error", err.stack);
    res.status(500).send({ error: "Failed to fetch users" });
  }
};

// Admin user authentication functionality from database
const AuthenticateAdminUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const { rows } = await p.query(
      `SELECT * FROM ova2.udf_authenticate_user($1, $2);`,
      [userName, password]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    const token = generateToken(rows[0]._registration_id);
    console.log("Token generated for this user:", token);

    //  const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600 * 8 * 1000,
      sameSite: "Lax",
    });

    const user = rows[0];
    return res.status(200).json({ message: "Authentication successful", user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res
      .status(500)
      .json({ message: "Error authenticating user", error: error.message });
  }
};

// Updating user in the databse and handle put request from the ui
const updateUser = async (req, res) => {
  const { id, userNewData } = req.body;
  console.log("getting this data in the server", id, userNewData);
  if (!id || !userNewData) {
    return res.status(400).json({ error: "ID and userNewData are required" });
  }

  try {
    const userData = { registration_id: parseInt(id), ...userNewData };
    const result = await p.query(
      `SELECT ova2.udf_update_user_data($1::jsonb) AS message`,
      [userData]
    );
    const { message } = result.rows[0];
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// updating user technologies in the database
const updateUserTechnologies = async (req, res) => {
  console.log("getting this data in the server", req.body);
  const { id, technologyIds } = req.body;
  if (!id || !technologyIds) {
    return res.status(400).json({ error: "ID and technologies are required" });
  }
  try {
    const result = await p.query(
      "SELECT ova2.udf_update_user_technologies($1::int, $2::text) ;",
      [id, technologyIds]
    );
    const { message } = result.rows[0];
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error updating user technologies:", error);
    res.status(500).json({ error: "Failed to update user technologies" });
  }
};

// fetching technologies IDs from the database
const fetchTechnologyIds = async (req, res) => {
  console.log("getting this data in the server", req.params);
  const registration_id = req.params._registration_id;
  const _registration_id = parseInt(registration_id, 10);
  if (isNaN(_registration_id)) {
    return res.status(400).json({ error: "Invalid registration ID" });
  }
  try {
    const { rows } = await p.query(
      "SELECT * FROM ova2.udf_fetch_technologies_with_registration_id($1::int);",
      [_registration_id]
    );
    const response = rows[0].udf_fetch_technologies_with_registration_id;
    res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error occurred while fetching the technologies:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

// fetching all the user roles
const fetchRoles = async (req, res) => {
  try {
    const { rows } = await p.query("select * from  ova2.udf_fetch_roles() ;");
    res.status(200).send(rows);
  } catch (error) {
    console.log("error ocuured during the fetching of Role Types");
    throw error;
  }
};

// fetching company Types
const fetchCompanyTypes = async (req, res) => {
  try {
    const { rows } = await p.query(
      "SELECT * FROM ova2.udf_fetch_company_types();"
    );
    res.send(rows);
  } catch (error) {
    console.log("Erroe while fetching the company types");
    throw error;
  }
};

// fetching companies from database
const fetchCompanies = async (req, res) => {
  try {
    const { rows } = await p.query("SELECT * from ova2.udf_fetch_companies();");
    res.send(rows);
  } catch (error) {
    console.log("error ocurred fetching companies data from databse ");
    throw error;
  }
};

// fetching Details of company with companyId
const getCompanyDetails = async (req, res) => {
  const { companyId } = req.params;
  try {
    const query = `SELECT * FROM ova2.udf_fetch_company_by_id($1);`;

    const { rows } = await p.query(query, [companyId]);

    if (rows.length) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({
      message: "Error fetching company details",
      error: error.message,
    });
  }
};

// updating company data in databse
const updateCompanyData = async (req, res) => {
  const { companyId, companyData } = req.body;

  if (!companyId || !companyData) {
    return res
      .status(400)
      .json({ message: "Company ID and data are required." });
  }

  try {
    const { rows } = await p.query(
      `SELECT ova2.udf_update_company_from_json($1::INT, $2::JSONB);`,
      [companyId, JSON.stringify(companyData)]
    );
    const message = rows[0]?.udf_update_company_from_json;
    if (message) {
      const status = message === "Company updated successfully." ? 200 : 400;
      return res.status(status).json({ message });
    } else {
      return res
        .status(500)
        .json({ message: "Unexpected response from the database." });
    }
  } catch (error) {
    console.error("Error updating company:", error);
    return res
      .status(500)
      .json({ message: "Error updating company", error: error.message });
  }
};

//  posting company data
const postCompanyDataJson = async (req, res) => {
  const companyData = req.body;
  const jsonObjectString = JSON.stringify(companyData);
  try {
    const query = "SELECT ova2.udf_insert_company_from_json($1);";
    const response = await p.query(query, [jsonObjectString]);
    res.send(response);
  } catch (error) {
    console.log("error ocuured");
    throw error;
  }
};

// getting company from the json as single object
const gettingCompanyInJson = async (req, res) => {
  const { companyId } = req.params;
  try {
    const response = await p.query(
      "SELECT ova2.udf_fetch_company_by_id_in_json($1);",
      [companyId]
    );
    if (response.rows.length > 0) {
      response.rows[0].udf_fetch_company_by_id_in_json;
      res.json(response);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error("An error occurred while fetching company as JSON", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// fetch user with the id from databse
const fetchUserWithId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rows } = await p.query(
      "SELECT ova2.udf_fetch_user_with_id_and_technologies($1::int);",
      [parseInt(userId)]
    );
    res.json(rows[0]?.udf_fetch_user_with_id_and_technologies);
  } catch (error) {
    console.error("An error occurred while fetching user as JSON", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// deleting user
const deleteUser = async (req, res) => {
  const { registration_id } = req.body;
  try {
    const { rows } = await p.query("SELECT ova2.udf_delete_user($1);", [
      registration_id,
    ]);
    res.send(rows[0]?.udf_delete_user);
  } catch (error) {
    console.error("An error occurred while deleting user ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// fetching users with filetring with registration type id
const fetchUsersWithRegistrationId = async (req, res) => {
  const { registration_id } = req.query;
  try {
    const { rows } = await p.query(
      "SELECT * FROM ova2.udf_retrieve_users_names_by_registration_type_id($1::int);",
      [registration_id]
    );
    res.send(rows);
  } catch (error) {
    console.error("An error occurred while deleting user ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// fetching users with filetring with registration type id
const registerEnrollment = async (req, res) => {
  const courseData = req.body;
  console.log("getting this course data in server", courseData);
  try {
    const { rows } = await p.query(
      "SELECT ova2.udf_enroll_student($1::jsonb)",
      [courseData]
    );
    res.send(rows);
  } catch (error) {
    console.error("An error occurred while enrolling a  user ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// fetching all the Enrollments in the All courses
const fetchAllEnrollments = async (req, res) => {
  try {
    const { rows } = await p.query(
      "SELECT * FROM ova2.udf_fetch_all_course_enrollments();"
    );
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error("An error occurred while enrolling a  user ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const fetchSoftwareTechnologies = async (req, res) => {
  try {
    const { rows } = await p.query(
      "SELECT * FROM ova2.udf_fetch_software_technologies();"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(
      "Error occurred while fetching the software technologies:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const postExcelFile = async (req, res) => {
  const { file } = req;

  if (!file) return res.status(400).send("No file uploaded.");

  try {
    const workbook = XLSX.readFile(file.path);
    const sheetData = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    const successfulRegistrations = [];
    const failedRegistrations = [];

    for (const candidate of sheetData) {
      try {
        console.log("Processing candidate:", candidate);
        const {
          CandidateName,
          MobileNo,
          EmailId,
          CurrentLocation,
          Experience,
        } = candidate;

        if (
          !CandidateName ||
          !MobileNo ||
          !EmailId ||
          !CurrentLocation ||
          !Experience
        ) {
          throw new Error("Missing required fields in the candidate data.");
        }

        const [first_name, ...rest] = CandidateName.split(" ");
        const last_name = rest.join(" ") || "";

        // Assume the query throws an error if the record already exists
        await p.query(
          `SELECT ova2.udf_insert_into_registration($1, $2, $3, $4, 'default_password', NULL, 1, $5, $6)`,
          [
            first_name,
            last_name,
            EmailId,
            MobileNo,
            CurrentLocation,
            parseInt(Experience, 10),
          ]
        );

        successfulRegistrations.push({ CandidateName, EmailId });
      } catch (error) {
        console.error(
          `Error processing candidate ${candidate.CandidateName || "Unknown"}:`,
          error
        );

        // Determine if the error is due to a duplicate record
        const isDuplicate = error.message.includes("already exists");
        const errorMessage = isDuplicate
          ? "Record already exists."
          : error.message;

        // Always add to failedRegistrations with appropriate message
        failedRegistrations.push({
          CandidateName: candidate.CandidateName || "Unknown",
          EmailId: candidate.EmailId || "Unknown",
          error: errorMessage,
        });
      }
    }

    const totalCandidates = sheetData.length;
    const allDuplicates =
      failedRegistrations.length === totalCandidates &&
      failedRegistrations.every((f) => f.error === "Record already exists.");

    // Determine the appropriate response message
    if (successfulRegistrations.length > 0) {
      res.status(200).json({
        message: "Records processed successfully!",
        successfulRegistrations,
        failedRegistrations,
      });
    } else if (allDuplicates) {
      res.status(200).json({
        message: "All records already exist.",
        successfulRegistrations,
        failedRegistrations,
      });
    } else if (failedRegistrations.length > 0) {
      res.status(200).json({
        message: "Processing completed with some errors.",
        successfulRegistrations,
        failedRegistrations,
      });
    } else {
      // This case should only trigger if there were no candidates in the file
      res.status(200).json({
        message: "No candidates processed.",
        successfulRegistrations,
        failedRegistrations,
      });
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process the Excel file." });
  }
};

module.exports = {
  loginUser,
  getProfile,
  getRegistrationType,
  registerUser,
  FetchUsers,
  AuthenticateAdminUser,
  updateUser,
  updateUserTechnologies,
  fetchRoles,
  fetchCompanyTypes,
  fetchCompanies,
  postCompanyDataJson,
  updateCompanyData,
  getCompanyDetails,
  gettingCompanyInJson,
  fetchUserWithId,
  deleteUser,
  fetchUsersWithRegistrationId,
  registerEnrollment,
  fetchAllEnrollments,
  fetchSoftwareTechnologies,
  fetchTechnologyIds,
  postExcelFile,
};

const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database configuration
const config = {
  user: "gimhana",
  password: "gimhana",
  server: "GIMHANA\\MSSQLSERVER01", // Specify both server name and instance name
  database: "angularcrud",
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    port: 1433,
  },
};

// API endpoint to query the database
app.post("/api/student/add", async (req, res) => {
  try {
    let details = {
      stname: req?.body.stname,
      course: req?.body.course,
      fee: req?.body.fee,
    };
    let query = `INSERT INTO student (stname, course, fee) VALUES ('${details.stname}', '${details.course}', '${details.fee}')`;

    await sql.connect(config);
    const result = await sql.query(query);

    sql.close();
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/student/get", async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query("SELECT * FROM student");

    // Send the result as JSON
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
});

app.put("/api/student/update/:id", async (req, res) => {
  try {
    let details = {
      stname: req?.body.stname,
      course: req?.body.course,
      fee: req?.body.fee,
    };
    let studentId = req.params.id;

    let query = `UPDATE student SET stname = '${details.stname}', course = '${details.course}', fee = '${details.fee}' WHERE id = ${studentId}`;

    await sql.connect(config);
    const result = await sql.query(query);

    sql.close();
    if (result.rowsAffected[0] > 0) {
      res.send({ status: true, message: `Student update successful` });
    } else {
      res.send({
        status: false,
        message: `Student update failed. Student with ID ${studentId} not found.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/student/delete/:id", async (req, res) => {
  try {
    let studentId = req.params.id;

    let query = `DELETE FROM student WHERE id = ${studentId}`;

    await sql.connect(config);
    const result = await sql.query(query);

    sql.close();
    if (result.rowsAffected[0] > 0) {
      res.send({ status: true, message: `Student delete successful` });
    } else {
      res.send({
        status: false,
        message: `Student delete failed. Student with ID ${studentId} not found.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

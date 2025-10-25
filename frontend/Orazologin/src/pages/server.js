import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = 8080; // must match frontend fetch("http://localhost:8080")

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CAPSTONE_INTEGRATED_DATABASE", // your DB name
  password: "1104", // your password
  port: 5432,
});

// API endpoint to get usage by user_id
app.get("/api/usage/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT u.user_id, u.name,
       p.call_limit, p.data_limit, p.sms_limit,
       ur.progressive_call, ur.progressive_data, ur.progressive_sms
FROM prepaid_users u
JOIN prepaid_plans p ON u.plan_id = p.plan_id
JOIN prepaid_usage_records ur ON ur.user_id = u.user_id
WHERE u.user_id = $1
ORDER BY ur.id DESC
LIMIT 1;
`;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching usage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

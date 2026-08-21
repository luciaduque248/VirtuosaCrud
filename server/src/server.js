require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const pool =
  require("./config/db");

const productRoutes =
  require("./routes/productRoutes");

const errorHandler =
  require("./middleware/errorHandler");

const app = express();

const PORT =
  process.env.PORT || 4000;

/* =========================================================
   MIDDLEWARES
========================================================= */

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================================================
   HEALTH
========================================================= */

app.get(
  "/api/health",
  async (req, res) => {
    try {
      const result =
        await pool.query(
          "SELECT NOW() AS current_time"
        );

      res.status(200).json({
        success: true,

        message:
          "Virtuosa API running",

        database:
          "PostgreSQL connected",

        timestamp:
          result.rows[0]
            .current_time,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message:
          "Database connection failed",
      });
    }
  }
);

/* =========================================================
   ROUTES
========================================================= */

app.use(
  "/api/products",
  productRoutes
);

/* =========================================================
   404
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      "Endpoint not found",
  });
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(errorHandler);

/* =========================================================
   SERVER
========================================================= */

app.listen(PORT, () => {
  console.log(
    `🚀 Virtuosa API running on http://localhost:${PORT}`
  );
});
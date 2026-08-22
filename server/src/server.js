require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const helmet =
  require("helmet");

const pool =
  require("./config/db");

const productRoutes =
  require("./routes/productRoutes");

const authRoutes =
  require("./routes/authRoutes");

const orderRoutes =
  require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const errorHandler =
  require("./middleware/errorHandler");

const app =
  express();

const PORT =
  process.env.PORT ||
  4000;


/* =========================================================
   REQUIRED ENV
========================================================= */

if (
  !process.env.JWT_SECRET
) {
  console.error(
    "❌ JWT_SECRET no está configurado."
  );

  process.exit(1);
}


/* =========================================================
   SECURITY
========================================================= */

app.use(
  helmet()
);


/* =========================================================
   CORS
========================================================= */

const allowedOrigins =
  (
    process.env
      .CLIENT_URLS ||
    process.env
      .CLIENT_URL ||
    "http://localhost:3000"
  )
    .split(",")
    .map(
      (
        origin
      ) =>
        origin.trim()
    )
    .filter(Boolean);


app.use(
  cors({
    origin:
      (
        origin,
        callback
      ) => {
        /*
          Permite herramientas
          sin Origin como curl,
          Postman, etc.
        */

        if (!origin) {
          return callback(
            null,
            true
          );
        }

        if (
          allowedOrigins.includes(
            origin
          )
        ) {
          return callback(
            null,
            true
          );
        }

        return callback(
          new Error(
            "Origen no permitido por CORS."
          )
        );
      },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);


/* =========================================================
   HEALTH
========================================================= */

app.get(
  "/api/health",
  async (
    req,
    res
  ) => {
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
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use("/api/payments", paymentRoutes);


/* =========================================================
   404
========================================================= */

app.use(
  (
    req,
    res
  ) => {
    res.status(404).json({
      success: false,

      message:
        "Endpoint not found",
    });
  }
);


/* =========================================================
   ERRORS
========================================================= */

app.use(
  errorHandler
);


/* =========================================================
   SERVER
========================================================= */

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Virtuosa API running on http://localhost:${PORT}`
    );
  }
);

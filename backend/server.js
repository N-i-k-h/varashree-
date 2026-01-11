const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
// ✅ Import Sequelize + models (with relationships)
const { sequelize, Plant, Order, OrderItem } = require("./models");


// ✅ Import routes
const plantRoutes = require("./routes/plantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes"); // optional
const estimationRoutes = require("./routes/estimationRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);


// ✅ Root route
app.get("/", (req, res) => {
  res.json({ ok: true, name: "Varashree Farm & Nursery API (MySQL)" });
});

// ✅ API routes
app.use("/api/plants", plantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/estimations", estimationRoutes);
app.use("/api/purchases", purchaseRoutes);

// ✅ Start server after DB sync
const PORT = process.env.PORT || 5000;

sequelize
  .sync()   // ✅ Removed { alter: true } to fix SQLite unique constraint error
  .then(() => {
    console.log("✅ MySQL/SQLite connected & synced successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  });

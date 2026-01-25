const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
// ✅ Import Sequelize + models (with relationships)
const { sequelize, Plant, Order, OrderItem, User } = require("./models");


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

// ✅ Deployment: Serve Frontend Static Files
const publicPath = path.join(__dirname, "public");
if (require("fs").existsSync(publicPath)) {
  console.log("📂 Serving static files from:", publicPath);
  app.use(express.static(publicPath));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

// 🔧 Auto-seed Admin User
async function seedAdmin() {
  try {
    const email = "admin@nursery.com";
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      await User.create({
        name: "Admin User",
        email,
        password: "admin", // Model hook will hash this
      });
      console.log("✅ Admin user created: admin@nursery.com / admin");
    }
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
  }
}

sequelize
  .sync()   // ✅ Removed { alter: true } to fix SQLite unique constraint error
  .then(async () => {
    console.log("✅ MySQL/SQLite connected & synced successfully");

    // Auto-create admin if database is empty
    await seedAdmin();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  });

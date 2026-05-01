const { sequelize, Order, OrderItem, Estimation, EstimationItem, Plant } = require('./models');

async function clearTestData() {
    console.log("🧹 Clearing All Business Data (Including Plants)...");

    try {
        // 1. Clear Order Items first (Child)
        console.log(" - Deleting Order Items...");
        await OrderItem.destroy({ where: {}, truncate: true });

        // 2. Clear Orders (Parent)
        console.log(" - Deleting Orders...");
        await Order.destroy({ where: {}, truncate: true });

        // 3. Clear Estimation Items (Child)
        console.log(" - Deleting Estimation Items...");
        await EstimationItem.destroy({ where: {}, truncate: true });

        // 4. Clear Estimations (Parent)
        console.log(" - Deleting Estimations...");
        await Estimation.destroy({ where: {}, truncate: true });

        // 5. Clear Plants (Stock Catalog)
        console.log(" - Deleting Plants (Catalog)...");
        await Plant.destroy({ where: {}, truncate: true });

        console.log("✅ All data (Orders, Estimations, Plants) cleared successfully!");
    } catch (err) {
        console.error("❌ Error clearing data:", err);
    } finally {
        await sequelize.close();
    }
}

clearTestData();

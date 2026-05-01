const sequelize = require("./config/db");

async function fix() {
    try {
        // Update the specific order to have a full datetime string
        await sequelize.query("UPDATE Orders SET finalPaymentDate = '2026-01-30 12:00:00' WHERE orderNo = 'ADV-1768242514053'");
        console.log("Updated row.");
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

fix();

const sequelize = require('./config/db');

async function addEmployeeName() {
    try {
        await sequelize.query("ALTER TABLE Orders ADD COLUMN employeeName TEXT");
        console.log("Successfully added column 'employeeName' to Orders table.");
    } catch (err) {
        if (err.message && err.message.includes("duplicate column name")) {
            console.log("Column 'employeeName' already exists. Skipping.");
        } else {
            console.error("Error adding column:", err);
        }
    } finally {
        // Close connection properly
        if (sequelize) {
            await sequelize.close();
        }
    }
}

addEmployeeName();

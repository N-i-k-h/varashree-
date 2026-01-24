const sequelize = require("./config/db");

async function check() {
    try {
        const [results] = await sequelize.query("SELECT orderNo, finalPaymentDate FROM Orders ORDER BY createdAt DESC LIMIT 1");
        console.log("RAW RESULTS:", results);
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

check();

const sequelize = require("./config/db");

async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, orderNo, finalPaymentDate FROM Orders ORDER BY createdAt DESC LIMIT 5");
        console.log(JSON.stringify(results, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

check();

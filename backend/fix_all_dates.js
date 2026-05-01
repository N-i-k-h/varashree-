const sequelize = require("./config/db");

async function fixAll() {
    try {
        // 1. Get all orders with a finalPaymentDate length of 10 (YYYY-MM-DD)
        // We use raw query because Sequelize might fail to load them
        const [orders] = await sequelize.query("SELECT id, finalPaymentDate FROM Orders WHERE length(finalPaymentDate) = 10");

        console.log(`Found ${orders.length} orders to fix.`);

        for (const o of orders) {
            const oldDate = o.finalPaymentDate;
            const newDate = `${oldDate} 00:00:00`;

            console.log(`Fixing Order ${o.id}: ${oldDate} -> ${newDate}`);

            await sequelize.query(`UPDATE Orders SET finalPaymentDate = '${newDate}' WHERE id = ${o.id}`);
        }

        console.log("All fixed.");

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

fixAll();

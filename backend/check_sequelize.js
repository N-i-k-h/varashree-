const { Order } = require("./models");
const sequelize = require("./config/db");

async function check() {
    try {
        const orders = await Order.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
            attributes: ['id', 'orderNo', 'finalPaymentDate']
        });

        console.log("Sequelize Orders:");
        orders.forEach(o => {
            console.log(`${o.orderNo}: ${o.finalPaymentDate} (Type: ${typeof o.finalPaymentDate})`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

check();

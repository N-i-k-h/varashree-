const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  orderNo: { type: DataTypes.STRING, allowNull: false },
  customerName: { type: DataTypes.STRING, allowNull: false },
  customerContact: DataTypes.STRING,
  customerAddress: DataTypes.STRING,
  employeeName: DataTypes.STRING, // ✅ Added Employee Name field

  subTotal: DataTypes.FLOAT,

  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,   // ✅ IMPORTANT
  },

  tax: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  grandTotal: DataTypes.FLOAT,
  paidAmount: DataTypes.FLOAT,
  balanceAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  finalPaymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: "Cash",
  },

  status: {
    type: DataTypes.ENUM("Paid", "Pending", "Cancelled"),
    defaultValue: "Paid",
  },
});

const OrderItem = sequelize.define("OrderItem", {
  plantName: DataTypes.STRING,
  rate: DataTypes.FLOAT,
  quantity: DataTypes.INTEGER,
  total: DataTypes.FLOAT,
});

module.exports = { Order, OrderItem };

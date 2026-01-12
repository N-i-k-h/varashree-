const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("ALTER TABLE Orders ADD COLUMN finalPaymentDate DATE", (err) => {
        if (err) {
            console.log("Column 'finalPaymentDate' might already exist or error occurred:", err.message);
        } else {
            console.log("Successfully added column 'finalPaymentDate' to Orders table.");
        }
    });
});

db.close();

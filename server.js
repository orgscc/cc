const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// تحميل البيانات
function loadDatabase() {
    return JSON.parse(fs.readFileSync("database.json", "utf8"));
}

// حفظ البيانات
function saveDatabase(db) {
    fs.writeFileSync("database.json", JSON.stringify(db, null, 2));
}

// إرجاع المنتجات
app.get("/products", (req, res) => {
    const db = loadDatabase();
    res.json(db.products);
});

// إضافة منتج جديد
app.post("/add-product", (req, res) => {
    const db = loadDatabase();
    db.products.push(req.body);
    saveDatabase(db);
    res.sendStatus(200);
});

// حذف منتج
app.delete("/delete-product/:name", (req, res) => {
    const db = loadDatabase();
    db.products = db.products.filter(product => product.name !== req.params.name);
    saveDatabase(db);
    res.sendStatus(200);
});

// تشغيل السيرفر
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

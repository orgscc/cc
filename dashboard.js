document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadUsers();

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("admin");
        window.location.href = "login.html";
    });

    document.getElementById("add-product-btn").addEventListener("click", () => {
        const name = prompt("اسم المنتج:");
        const priceSAR = prompt("السعر بالريال:");
        const priceCredit = prompt("السعر بالكريدت:");
        if (name && priceSAR && priceCredit) {
            addProduct(name, priceSAR, priceCredit);
        }
    });
});

// تحميل المنتجات
function loadProducts() {
    fetch("/products")
        .then(response => response.json())
        .then(products => {
            const productsList = document.getElementById("products-list");
            productsList.innerHTML = "";
            products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.priceSAR} ريال</td>
                    <td>${product.priceCredit} كريدت</td>
                    <td>
                        <button onclick="deleteProduct('${product.name}')">حذف</button>
                    </td>
                `;
                productsList.appendChild(row);
            });
        });
}

// تحميل المستخدمين
function loadUsers() {
    fetch("/users")
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById("users-list");
            usersList.innerHTML = "";
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>
                        <button onclick="promoteUser('${user.username}')">ترقية</button>
                    </td>
                `;
                usersList.appendChild(row);
            });
        });
}

// إضافة منتج جديد
function addProduct(name, priceSAR, priceCredit) {
    fetch("/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, priceSAR, priceCredit })
    }).then(() => loadProducts());
}

// حذف منتج
function deleteProduct(name) {
    fetch(`/delete-product/${name}`, { method: "DELETE" })
        .then(() => loadProducts());
}

// ترقية مستخدم
function promoteUser(username) {
    fetch(`/promote-user/${username}`, { method: "POST" })
        .then(() => loadUsers());
}

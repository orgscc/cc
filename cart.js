document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // تحميل المنتجات عند فتح الصفحة
});

// تحميل السلة من التخزين المحلي
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-cart-message");
    const checkoutBtn = document.getElementById("checkout-container");
    const clearCartBtn = document.getElementById("clear-cart-container");

    cartList.innerHTML = ""; // مسح القائمة قبل إعادة تحميلها

    if (cart.length === 0) {
        emptyMessage.style.display = "block"; // عرض رسالة السلة الفارغة
        checkoutBtn.style.display = "none";  // إخفاء زر إتمام الشراء
        clearCartBtn.style.display = "none"; // إخفاء زر إزالة الكل
    } else {
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 40px; vertical-align: middle; margin-right: 10px;">
                <span>${item.name} - ${item.price} </span>
                <img src="https://cdn.discordapp.com/attachments/1186721878363091031/1348944475631652914/130_20250311120308.png?ex=67d34831&is=67d1f6b1&hm=9a55d86eb770adfe55a40ecc9a3ad198391e0ee829b9f719ec9eee5083f24ff9&" width="16" height="16" style="vertical-align: middle;">
                <button onclick="removeItem(${index})" class="remove-btn">إزالة</button>
            `;
            cartList.appendChild(listItem);
        });

        if (cart.length === 0) {
            document.getElementById("cart-count").textContent = "0";
            emptyMessage.style.display = "block";
            checkoutBtn.style.display = "none";
            clearCartBtn.style.display = "none";
        } else {
            document.getElementById("cart-count").textContent = cart.length;
            emptyMessage.style.display = "none";
            checkoutBtn.style.display = "block";
            clearCartBtn.style.display = "block";
        }
    }
}

// الدالة الخاصة بحذف منتج معين من السلة
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // تحديث الواجهة
}

// دالة إزالة كل المنتجات
function clearCart() {
    localStorage.removeItem('cart'); // حذف جميع المنتجات من التخزين المحلي
    loadCart(); // إعادة تحميل الواجهة بعد الحذف
}

// وظيفة الرجوع إلى الصفحة السابقة
function goBack() {
    window.history.back();
}

// الانتقال إلى صفحة السلة عند الضغط على الأيقونة
document.getElementById("cart-icon").addEventListener("click", function() {
    window.location.href = "cart.html";
});

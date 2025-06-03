document.addEventListener("DOMContentLoaded", () => {
    // بيانات المنتجات - يمكن تخزينها في ملف JSON أو قاعدة بيانات حسب الحاجة
    const products = [
        { id: 1, name: "بوت سيستم", price: 5.75, image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348932000475648002/discotools-xyz-icon_1.png?ex=67d14252&is=67cff0d2&hm=3a7e746b190a6a521b55b99430a676094af1855582d93e632f343dbdd419e337&" },
        { id: 2, name: "بوت إدارة", price: 10.00, image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348937486759362591/discotools-xyz-icon_3.png?ex=67d1476e&is=67cff5ee&hm=7055c34a35439239e4d4904843b77b6ba420692169dd13230921e4b3e2eb3cf2&" },
        { id: 3, name: "بوت تكت", price: 7.50, image: "https://cdn.discordapp.com/attachments/1186721878363091031/1348938332213743668/discotools-xyz-icon_4.png?ex=67d14838&is=67cff6b8&hm=56dfcd536b1df6949a77d95ccfc3a4589bcb3ff90ebb351ca6dfca3d59b4c953&" }
    ];

    // الحصول على ID المنتج من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // العثور على المنتج باستخدام الـ ID
    const product = products.find(p => p.id === productId);

    if (product) {
        // عرض تفاصيل المنتج في الصفحة
        const productDetailContainer = document.getElementById("product-detail-container");
        const formattedPrice = product.price.toFixed(2);

        productDetailContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px;">
            <h2>${product.name}</h2>
            <p>
                <img src="https://cdn.discordapp.com/attachments/1186721878363091031/1348944475631652914/130_20250311120308.png?ex=67d14df1&is=67cffc71&hm=4a19f495ffe0938b3c52c91a6adaf8489ef8133a0c6612b8bff1869e8472666e&" 
                alt="ريال" class="currency-icon" style="width: 20px; vertical-align: middle;"> 
                <span style="font-weight: bold; font-size: 1.5em;">${formattedPrice}</span>
            </p>
            <button onclick="addToCart('${product.name}', ${product.price}, '${formattedPrice}')">أضف للسلة +</button>
        `;
    }
});

function addToCart(name, price, formattedPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // إضافة المنتج إلى السلة
    cart.push({ name, price, formattedPrice });

    // تحديث السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // تحديث عدد العناصر في السلة
    document.getElementById("cart-count").innerText = cart.length;
}

function goToCartPage() {
    // الانتقال إلى صفحة السلة
    window.location.href = "cart.html";
}

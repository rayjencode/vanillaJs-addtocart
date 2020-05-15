// Show Cart
(function () {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function () {
        cart.classList.toggle('show-cart');
    });
})();

// Add Item to the cart

(function () {
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (e.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath =
                    e.target.parentElement.previousElementSibling.src;
                let position = fullPath.indexOf('img') + 3;
                let partPath = fullPath.slice(position);

                const item = {};
                item.img = `img-cart${partPath}`;
                item.name =
                    e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent
                    .slice(1)
                    .trim();

                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3'
                );
                cartItem.innerHTML = `
                <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text">
    
                  <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                  <span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
                </a>
                `;

                const total = document.querySelector('.cart-total-container');

                document.getElementById('cart').insertBefore(cartItem, total);

                // Show Total
                showTotal();
            }
        });
    });

    function showTotal() {
        let total = [];

        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(function (item) {
            total.push(parseFloat(item.textContent));
        });

        let computeTotal = total.reduce(function (a, b) {
            return a + b;
        }, 0);

        document.getElementById(
            'cart-total'
        ).textContent = computeTotal.toFixed(2);

        document.querySelector(
            '.item-total'
        ).textContent = computeTotal.toFixed(2);

        document.getElementById('item-count').textContent = total.length;

        console.log(computeTotal);
    }
})();

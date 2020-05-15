const cart = document.getElementById('cart');
let itemData = JSON.parse(localStorage.getItem('list')) || [];

if (itemData.length > 0) {
    itemData.forEach(function (item) {
        cart.insertAdjacentHTML(
            'afterbegin',
            `
        <div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="cart-item-title font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
            </div>
            `
        );

        handleDelete(item.name);
    });
}

showTotal();

function showTotal() {
    let total = [];

    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(function (item) {
        total.push(parseFloat(item.textContent));
    });

    let computeTotal = total.reduce(function (a, b) {
        return a + b;
    }, 0);

    document.getElementById('cart-total').textContent = computeTotal.toFixed(2);

    document.querySelector('.item-total').textContent = computeTotal.toFixed(2);

    document.getElementById('item-count').textContent = total.length;

    console.log(computeTotal);
}

function handleDelete(name) {
    const cartItemList = cart.querySelectorAll('.cart-item');
    cartItemList.forEach(function (item) {
        if (item.querySelector('.cart-item-title').textContent === name) {
            // Execute Delete Item
            item.querySelector('.cart-item-remove').addEventListener(
                'click',
                function () {
                    cart.removeChild(item);

                    itemData = itemData.filter(function (item) {
                        console.log(name);
                        return item !== name;
                    });

                    showTotal();

                    localStorage.setItem('list', JSON.stringify(itemData));

                    // console.log(itemData);
                }
            );
        }
    });
}

console.log(itemData);

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
    const cart = document.getElementById('cart');
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
    
                  <p id="cart-item-title" class="cart-item-title font-weight-bold mb-0">${item.name}</p>
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

                // handle Delete
                handleDelete(item.name);
                itemData.push(item);
                localStorage.setItem('list', JSON.stringify(itemData));
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

    function handleDelete(name) {
        const cartItemList = cart.querySelectorAll('.cart-item');
        cartItemList.forEach(function (item) {
            if (item.querySelector('.cart-item-title').textContent === name) {
                // Execute Delete Item
                item.querySelector('.cart-item-remove').addEventListener(
                    'click',
                    function () {
                        cart.removeChild(item);
                        itemData = itemData.filter(function (item) {
                            return item !== name;
                        });
                        showTotal();

                        localStorage.setItem('list', JSON.stringify(itemData));
                    }
                );
            }
        });
    }
})();

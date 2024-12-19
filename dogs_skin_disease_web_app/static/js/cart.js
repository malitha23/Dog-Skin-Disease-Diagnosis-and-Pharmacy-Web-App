document.addEventListener("DOMContentLoaded", () => {
    // Load cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cartItems[0] || {};  // Assuming there's only one item in the cart

    if (!cartItem.name) {
      document.getElementById("cart-item").innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    // Populate cart item details
    const itemImage = document.getElementById("cart-item-image");
    const itemName = document.getElementById("cart-item-name");
    const itemPrice = document.getElementById("cart-item-price");
    const itemQuantityInput = document.getElementById("cart-item-quantity");
    const totalPrice = document.getElementById("total-price");
    itemImage.src = `http://localhost:3000/api${cartItem.image}`;
    itemName.textContent = cartItem.name;
    itemPrice.textContent = cartItem.price;
    itemQuantityInput.value = cartItem.quantity || 1;
    totalPrice.textContent = (cartItem.price * (cartItem.quantity || 1));

    // Update total price on quantity change
    itemQuantityInput.addEventListener("input", (event) => {
        const quantity = parseInt(event.target.value, 10);
        if (quantity < 1) {
            event.target.value = 1;
            return;
        }

        cartItem.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify([cartItem]));
        totalPrice.textContent = (cartItem.price * quantity).toFixed(2);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const totalPriceElem = document.getElementById('total-price');
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cartItems[0] || {};

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const user = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            username: formData.get('username'),
            address: formData.get('address'),
            phone_number: formData.get('phone_number'),
            email: formData.get('email')
        };
        const deliveryOption = formData.get('delivery_option');
        const paymentOption = formData.get('payment_option');
        const cartItems = [{
            name: cartItem.name,
            price: cartItem.price,
            quantity: parseInt(document.getElementById('cart-item-quantity').value, 10)
        }];

        try {
            const response = await fetch('http://localhost:3000/api/ordersRoutes/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, cartItems, deliveryOption, paymentOption }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Order placed successfully! Order ID: ${data.orderId}`);
                window.location.href = "/order";
                // Redirect or clear the form as needed
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order.');
        }
    });
});

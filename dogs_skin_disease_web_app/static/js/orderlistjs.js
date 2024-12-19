let products = []; // Global variable to store products

// Function to generate product HTML
function generateProductHTML(product) {
  return `
        <li class="product">
            <a href="#" class="productbody" data-id="${product.id}" >
                <span class="onsale">${product.category.name}</span>
                <img alt="" class="attachment-shop_catalog" src="http://localhost:3000/api${
                  product.image
                }" />
                <h3>${product.name}</h3>
                <span class="price">
                    Rs 
                    ${
                      product.oldPrice
                        ? `<del> <span class="amount">${product.oldPrice}</span> </del>`
                        : ""
                    }
                    <ins> <span class="amount">${product.price}</span> </ins>
                    ${
                      product.discount
                        ? `<span class="sale-tag sale-tag-square">${product.discount}</span>`
                        : ""
                    }
                </span>
            </a>
            <a class="button add_to_cart_button product_type_simple" style="color:white;" rel="nofollow" style="cursor:pointer;" data-id="${
              product.id
            }">
                Buy 
            </a>
        </li>
    `;
}

// Function to display products
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  const noDataMessage = document.getElementById("no-data-message");

  productList.innerHTML = ""; // Clear any existing content
  noDataMessage.style.display = "none"; // Hide no data message

  if (products.length === 0) {
    noDataMessage.style.display = "block"; // Show no data message if no products
  } else {
    products.forEach((product) => {
      productList.innerHTML += generateProductHTML(product);
    });
  }
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to fetch and display products
async function fetchAndDisplayProducts() {
  const productList = document.getElementById("product-list");
  const loader = document.getElementById("loader");

  loader.style.display = "block"; // Show loader

  try {
    // Retrieve the 'result' parameter
    const result = getQueryParam("result");

    let url; // Use 'let' since url's value changes

    if (result === null) {
      url = "http://127.0.0.1:3000/api/itemRoutes/items";
    } else {
      let categoryId = 0; // Use 'let' since categoryId's value changes

      if (result === "Fungal_infections") {
        categoryId = 1;
      } else if (result === "Hypersensitivity_allergic_dermatosis") {
        categoryId = 2;
      } else if (result === "Bacterial_dermatosis") {
        categoryId = 3;
      }

      const categoryResponse = await fetch(
        `http://127.0.0.1:3000/api/categoryRoutes/categories/${categoryId}`
      );
      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch category details");
      }

      const category = await categoryResponse.json();

      // Extract name and description
      const categoryName = category.name;
      const categoryDescription = category.description;
      document.getElementById("category-name").textContent = categoryName;
      document.getElementById("category-description").textContent =
        categoryDescription;
      document.getElementById("category-info").style.display = "block";

      url = `http://127.0.0.1:3000/api/itemRoutes/items/category/${categoryId}`; // Use backticks for template literals
    }
    const response = await fetch(url);
    products = await response.json(); // Store products globally
    displayProducts(products); // Display products
  } catch (error) {
    console.error("Error fetching products:", error);
    productList.innerHTML = "<p>Unable to load products at this time.</p>";
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to search products
function searchProducts(query) {
  const filteredProducts = products.filter((product) => {
    const categoryName = product.category.name.toLowerCase();
    const productName = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const searchQuery = query.toLowerCase();

    return (
      categoryName.includes(searchQuery) ||
      productName.includes(searchQuery) ||
      description.includes(searchQuery)
    );
  });

  displayProducts(filteredProducts);
}

// Function to open the modal with product details
function openModal(product) {
  const modal = document.getElementById("product-modal");
  const modalProductName = document.getElementById("modal-product-name");
  const modalProductImage = document.getElementById("modal-product-image");
  const modalProductDescription = document.getElementById(
    "modal-product-description"
  );
  const modalProductHowToUse = document.getElementById(
    "modal-product-howtouse"
  );
  const modalProductExpDate = document.getElementById("modal-product-expdate");
  const modalProductMfd = document.getElementById("modal-product-mfd");
  const modalProductPrice = document.getElementById("modal-product-price");

  modalProductName.textContent = product.name;
  modalProductImage.src = `http://localhost:3000/api${product.image}`;

  // Replace new lines with <br> for proper formatting
  modalProductDescription.innerHTML = product.description.replace(
    /\r\n/g,
    "<br>"
  );
  modalProductHowToUse.innerHTML = `<strong>How to Use:</strong> ${product.howtouse}`;
  modalProductExpDate.innerHTML = `<strong>Expiration Date:</strong> ${product.expdate}`;
  modalProductMfd.innerHTML = `<strong>Manufacture Date:</strong> ${product.mfd}`;
  modalProductPrice.textContent = `Rs ${product.price}`;

  modal.style.display = "block";
}

// Event listener for search input
document.getElementById("search").addEventListener("input", (event) => {
  searchProducts(event.target.value);
});

// Event listener for modal close
document.querySelector(".modal .close").addEventListener("click", () => {
  document.getElementById("product-modal").style.display = "none";
});

// Event listener for product list clicks
document.getElementById("product-list").addEventListener("click", (event) => {
  const addToCartButton = event.target.closest(".add_to_cart_button");
  if (addToCartButton) {
    const productId = addToCartButton.getAttribute("data-id");
    const product = products.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      addToCart(product);
    }
  }

  const productId = event.target
    .closest(".productbody")
    ?.getAttribute("data-id");
  if (productId) {
    const product = products.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      openModal(product);
    }
  }
});

function addToCart(product) {
  // Create a cart with just one product
  const cart = [product];

  // Save the cart to local storage
  // Clear the existing cart from localStorage (optional step)
  localStorage.removeItem("cart");

  // Set the new cart value
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the checkout page
  window.location.href = "/checkout";
}

// Load products on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);

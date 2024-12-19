document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("edit-item-modal");
  const itemForm = document.getElementById("item-form");
  const imagePreview = document.getElementById("image-preview");

  const fetchItems = async () => {
    const token = document
      .querySelector('meta[name="auth-token"]')
      .getAttribute("content");
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/itemRoutes/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch items");

      const items = await response.json();
      populateItemsTable(items);
    } catch (error) {
      alert("Error fetching items: " + error.message);
    }
  };

  const fetchCategories = async () => {
    const token = document
      .querySelector('meta[name="auth-token"]')
      .getAttribute("content");
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/categoryRoutes/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch categories");

      const categories = await response.json();
      populateCategoriesTable(categories);
      populateCategorySelect(categories);
    } catch (error) {
      alert("Error fetching categories: " + error.message);
    }
  };

  const populateItemsTable = (items) => {
    const itemsTableBody = document.querySelector("#items-table tbody");
    itemsTableBody.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.category ? item.category.name : ""}</td>
                <td>${item.description || ""}</td>
                <td>${item.howtouse || ""}</td>
                <td>${item.expdate || ""}</td>
                <td>${item.mfd || ""}</td>
                <td>${
                  item.image
                    ? `<img src="http://localhost:3000/api${item.image}" alt="${item.name}" width="100">`
                    : ""
                }</td>
                <td>
                    <button onclick="editItem(${item.id})">Edit</button>   
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
      itemsTableBody.appendChild(row);
    });
  };

  const populateCategoriesTable = (categories) => {
    const categoriesTableBody = document.querySelector(
      "#categories-table tbody"
    );
    categoriesTableBody.innerHTML = "";
    categories.forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.description || ""}</td>
                <td>
                    <button onclick="deleteCategory(${
                      category.id
                    })">Delete</button>
                </td>
            `;
      categoriesTableBody.appendChild(row);
    });
  };

  const populateCategorySelect = (categories) => {
    console.log("Categories:", categories); // Debug line
    const categorySelect = document.getElementById("category");
    categorySelect.innerHTML = "";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });

    const categorySelectupdate = document.getElementById("categoryupdate");
    categorySelectupdate.innerHTML = "";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelectupdate.appendChild(option);
    });
  };

  const populateItemForm = async (id) => {
    const token = document
      .querySelector('meta[name="auth-token"]')
      .getAttribute("content");
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/itemRoutes/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch item");

      const item = await response.json();
      document.querySelector("#item-updateid").value = item.id;
      document.querySelector("#nameupdate").value = item.name;
      document.querySelector("#priceupdate").value = item.price;
      const categorySelectUpdate = document.querySelector('#categoryupdate');
      categorySelectUpdate.value = item.category_id;
      document.querySelector("#descriptionupdate").value =
        item.description || "";
      document.querySelector("#howtouseupdate").value = item.howtouse || "";
      document.querySelector("#expdateupdate").value = item.expdate || "";
      document.querySelector("#mfdupdate").value = item.mfd || "";

      // Set image preview
      imagePreview.src = item.image
        ? `http://localhost:3000/api${item.image}`
        : "";
      imagePreview.style.display = item.image ? "block" : "none";
    } catch (error) {
      alert("Error fetching item details: " + error.message);
    }
  };

  window.editItem = (id) => {
    populateItemForm(id);
    modal.style.display = "block"; // Show the modal
  };

  itemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(itemForm);
    const token = document
      .querySelector('meta[name="auth-token"]')
      .getAttribute("content");
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/itemRoutes/items",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        alert("Item updated successfully!");
        fetchItems(); // Refresh the items list
        modal.style.display = "none"; // Hide the modal
      } else {
        const errorData = await response.json();
        alert("Failed to update item: " + errorData.message);
      }
    } catch (error) {
      alert("Error updating item: " + error.message);
    }
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });

  document.querySelector('#item-updateform').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/itemRoutes/items/${formData.get('id')}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                // FormData automatically sets the correct Content-Type
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to update item');

        const result = await response.json();
        alert('Item updated successfully!');

    } catch (error) {
        alert('Error updating item: ' + error.message);
    }
});

    // Function to delete an item
    window.deleteItem = async (id) => {
        const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/itemRoutes/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert('Item deleted successfully!');
                fetchItems(); // Refresh the items list
            } else {
                const errorData = await response.json();
                alert('Failed to delete item: ' + errorData.message);
            }
        } catch (error) {
            alert('Error deleting item: ' + error.message);
        }
    };

    // Function to delete a category
    window.deleteCategory = async (id) => {
        const token = document.querySelector('meta[name="auth-token"]').getAttribute('content');
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/categoryRoutes/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert('Category deleted successfully!');
                fetchCategories(); // Refresh the categories list
            } else {
                const errorData = await response.json();
                alert('Failed to delete category: ' + errorData.message);
            }
        } catch (error) {
            alert('Error deleting category: ' + error.message);
        }
    };

        const categoryForm = document.getElementById("category-form");
    
        categoryForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent default form submission
    
            const name = document.getElementById("category-name").value;
            const description = document.getElementById("category-description").value;
    
            const token = document.querySelector('meta[name="auth-token"]').getAttribute('content'); // Assuming you have a token meta tag
    
            try {
                const response = await fetch("http://127.0.0.1:3000/api/categoryRoutes/categories", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, description }),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    alert("Category created successfully!");
                    // Optionally, you can update the UI or redirect here
                } else {
                    const errorData = await response.json();
                    alert("Failed to create category: " + errorData.message);
                }
            } catch (error) {
                alert("Error creating category: " + error.message);
            }
        });

    

  // Initial data fetch
  fetchItems();
  fetchCategories();
});



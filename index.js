let allProducts = [];

async function filterProductsByCategory(category) {
  let cat = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  let filteredProducts = await cat.json();

  let displayProduct = document.getElementById("displayProduct");
  let productsByCategory = filteredProducts
    .map((product) => {
      return `
        <div class="col-md-3 mb-4">
          <div class="card p-3">
            <a href='./productInfo.html?id=${product.id}'>
              <img src="${product.image}" class="w-75 mx-auto img-card" alt="${
        product.title
      }">
            </a>
            <div class="card-body">
              <h6 class="card-title">${product.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}</h6>
              <h6 class="card-title">${product.category}</h6>
              <p class="card-text">$${product.price}</p>
              <button class="btn btn-danger" onclick="deleteProduct(${
                product.id
              })">Delete</button>
              <button class="btn btn-success" onclick="updataProduct(${
                product.id
              })">Update</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  displayProduct.innerHTML = productsByCategory;
}

async function getAllCategories() {
  let data = await fetch(`https://fakestoreapi.com/products/categories`);
  let categories = await data.json();

  let displayCategories = document.getElementById("displayCategories");
  let allCategories = categories
    .map(
      (category) =>
        `<button class="btn cat-btn" onclick="filterProductsByCategory('${category}')">${category}</button>`
    )
    .join("");

  displayCategories.innerHTML = allCategories;
}

async function getAllProducts() {
  let data = await fetch(`https://fakestoreapi.com/products`);
  allProducts = await data.json();
  displayProducts(allProducts);
}

function displayProducts() {
  let displayProduct = document.getElementById("displayProduct");
  let Products = allProducts
    .map((product) => {
      return `
        <div class="col-md-3 mb-4">
          <div class="card p-3">
            <a href='./productInfo.html?id=${product.id}'>
              <img src="${product.image}" class="w-75 mx-auto img-card" alt="${
        product.title
      }">
            </a>
            <div class="card-body">
              <h6 class="card-title">${product.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}</h6>
              <h5 class="card-title">${product.category}</h5>
              <p class="card-text">$${product.price}</p>
              <button class="btn btn-danger" onclick="deleteProduct(${
                product.id
              })">Delete</button>
              <button class="btn btn-success" onclick="updataProduct(${
                product.id
              })">Update</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  displayProduct.innerHTML = Products;
}

// Add product
function addProduct() {
  const productName = document.getElementById("productName").value;
  const productCategory = document.getElementById("productCategory").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").value;

  const newProduct = {
    title: productName,
    category: productCategory,
    price: productPrice,
    image: productImage,
  };
  allProducts.push(newProduct);
  displayProducts(allProducts);
}

// Update product
var updatedIndex = null;

function updataProduct(id) {
  updatedIndex = allProducts.findIndex((product) => product.id === id);
  console.log(updatedIndex);

  const productUpdated = allProducts[updatedIndex];
  document.getElementById("title").value = productUpdated.title;
  document.getElementById("price").value = productUpdated.price;
  document.getElementById("category").value = productUpdated.category;
  document.getElementById("image").value = productUpdated.image;
  document
    .getElementById("updateProduct")
    .scrollIntoView({ behavior: "smooth" });
}

function saveUpdates() {
  allProducts[updatedIndex].title = title.value;
  allProducts[updatedIndex].price = price.value;
  allProducts[updatedIndex].category = category.value;
  allProducts[updatedIndex].image = image.value;

  console.log(allProducts[updatedIndex]);
  console.log("saved");

  displayProducts(allProducts);
}

// delete product
function deleteProduct(productId) {
  allProducts = allProducts.filter((product) => product.id !== productId);

  displayProducts(allProducts);
}

async function display() {
  await getAllCategories();
  await getAllProducts();
}
display();

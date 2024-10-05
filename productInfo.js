var queryParam = window.location.search;
var urlParam = new URLSearchParams(queryParam);
var id = urlParam.get("id");
console.log(id);

// get product by id
async function getSpcificProduct(id) {
  let data = await fetch(`https://fakestoreapi.com/products/${id}`);
  let specificProduct = await data.json();
  console.log(specificProduct);
  let productDetails = document.getElementById("productDetails");
  productDetails.innerHTML = `
    <div class='col-md-4'>
    <img src=${specificProduct.image} class='w-75'/>
    
    </div>
    <div class='col-md-6'>
    <h5>${specificProduct.title}</h5>
    <h6>${specificProduct.price}$</h6>
    <p>${specificProduct.description}</p>
    </div>
    `;
}
getSpcificProduct(id);

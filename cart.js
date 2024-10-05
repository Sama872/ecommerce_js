async function getCart() {
  let data = await fetch(` https://fakestoreapi.com/carts/5`);
  let cartItem = await data.json();
  console.log(cartItem);
  let cartItems = document.getElementById("cartItems");
  let cartDetails = cartItem.products
    .map((item) => {
      return `
            <div class="d-flex justify-content-evenly" >
                <h4 class="text-warning">Product Id: ${item.productId}</h4>
                <p>Quantity: ${item.quantity}</p>
                
            </div>
            
        `;
    })
    .join("");
  cartItems.innerHTML += cartDetails;
}
getCart();

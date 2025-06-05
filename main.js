let iconcart = document.querySelector(".icon-cart");
let cartpage = document.querySelector(".cart-page");
let overlay = document.querySelector(".overlay");
let closecart = document.querySelector(".close");
let Productlisthtml = document.querySelector(".product-list");
let cartlisthtml = document.querySelector(".cart-list");
let iconCartSpan = document.querySelector(".icon-cart span");
let productlist;
let carts;

iconcart.addEventListener("click", () => {
  cartpage.classList.toggle("show");
  overlay.classList.toggle("overlay-show");
});

closecart.addEventListener("click", () => {
  cartpage.classList.toggle("show");
  overlay.classList.toggle("overlay-show");
});

overlay.addEventListener("click", () => {
  cartpage.classList.toggle("show");
  overlay.classList.toggle("overlay-show");
});

const initapp = () => {
  //get data from json file
  fetch("products.json")
    .then((Response) => Response.json())
    .then((data) => {
      productlist = data;
      adddatatohtml();
      if (localStorage.cart) {
        carts = JSON.parse(localStorage.cart);
        addcarttohtml();
      }
    });
};
initapp();

const adddatatohtml = () => {
  let newproduct = "";
  productlist.forEach((product) => {
    newproduct += `<div class="card">
            <img src="${product.image}" alt="img1">
            <div class="content" data-id="${product.id}">
                <h3 class="total">${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart">Add To Cart</button>
            </div>
        </div>`;
  });
  Productlisthtml.innerHTML = newproduct;
};

const addcart = (product_id) => {
  let productPositionIncart = carts.findIndex(
    (value) => value.product_id == product_id
  );

  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (productPositionIncart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[productPositionIncart].quantity += 1;
  }
  addcarttohtml();
  addtomemmory();
};

const addtomemmory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addcarttohtml = () => {
  let newcart = "";
  let totalquantity = 0;
  carts.forEach((cart) => {
    totalquantity += cart.quantity;
    let positionproduct = productlist.findIndex(
      (value) => value.id == cart.product_id
    );
    let info = productlist[positionproduct];
    newcart += `   <div class="item" data-id="${cart.product_id}">
                <div class="image">
                    <img src="${info.image}" alt="img1">
                </div>
                <div class="title">${info.name}</div>
                <div class="price">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span>-</span>
                    <span>${cart.quantity}</span>
                    <span>+</span>
                </div>
            </div>`;
  });
  iconCartSpan.innerHTML = totalquantity;
  cartlisthtml.innerHTML = newcart;
};

cartlisthtml.addEventListener("click", (e) => {
  if (e.target.innerHTML == "+" || e.target.innerHTML == "-") {
    let product_id = e.target.parentElement.parentElement.dataset.id;
    let mood = "minus";
    if (e.target.innerHTML == "+") {
      mood = "plus";
    }
    changequantity(product_id, mood);
  }
});

const changequantity = (product_id, mood) => {
  let positionitemincart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionitemincart >= 0) {
    switch (mood) {
      case "plus":
        carts[positionitemincart].quantity += 1;
        break;

      default:
        let valuechange = carts[positionitemincart].quantity - 1;
        if (valuechange > 0) {
          carts[positionitemincart].quantity = valuechange;
        } else {
          carts.splice(positionitemincart, 1);
        }
        break;
    }
  }
  addtomemmory();
  addcarttohtml();
};

Productlisthtml.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    let product_id = e.target.parentElement.dataset.id;
    addcart(product_id);
  }
});
/**
    initapp()
    addtomemmory()
    addcarttohtml()
    addcarttohtml()
    addcart()
    changequantity()
 */

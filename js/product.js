import axios from "axios";
let categories_Icons_Container = document.querySelector(
  ".categories_Icons_Container"
);
let All_Products_Dom = document.querySelector(".All_Products .container .row");
let count_In_Cart = document.querySelector(".count_In_Cart");
let products_cart_content_Dom = document.querySelector(".products_cart") 
let cart_content = document.querySelector(".cart_content");
let cart_icon_svg = document.querySelector(".cart_icon_svg");
let Data = [];
let categories_Li = [];
let Btn_Add_To_Cart = [];
let products_In_Cart = [];
let products = [];

//  start get data
(async function getData() {
  let data = await axios.get("../data/products.json");
  try {
    Data = await data.data;
  } catch (err) {
    console.log(err);
  }
  return Put_Category(Data), default_Product_display(Data);;
})();
//  end get data
// start put category in dom
function Put_Category(data) {
  for (let category in data) {
    let first_element_Image = data[category][0].urlImage;
    categories_Icons_Container.innerHTML += ` <li class="category" style="background-image: url('${first_element_Image}'); "  data-category =${category}>
              <div class="layer_text"  data-category =${category}>
                <span>${category}</span>
              </div>
          </li>`;
  }
  categories_Li = document.querySelectorAll(".layer_text");
  get_All_Product_To_Dom(categories_Li, data);
}
// end put category in dom
// start default category display
function default_Product_display(data) {
  let electronic_category = data.الالكترونيات;
  electronic_category.forEach((product) => {
    putElement(product);
  });
}
default_Product_display();

// end default category display
// start get All product

function get_All_Product_To_Dom(categories,data) {
    categories.forEach((category) => {
    category.addEventListener("click", (e) => {
      e.stopPropagation();
      All_Products_Dom.innerHTML = "";
       let  category_element = e.target.dataset.category;
       products = data[category_element];
    });
     products.forEach((product) => {
       putElement(product);
     });
  });
}
// put product in html

function putElement(product) {
  All_Products_Dom.innerHTML += `  <div class="product_Card">
 <div class="sale_icon animate__animated animate__bounceInRight">
  <div class="slid_show "data-id= ${product.id}>
  <i class="fa-solid fa-cart-arrow-down " data-id = ${product.id}></i>
  </div>
    </div>
            <div class="image_Container">
              <img src=${product.urlImage}>
            </div>
            <h4 class="name_Product">${product.name}</h4>
            <div class="price_Content">
              <span class="price"> ${product.price} لكل كيلو</span>
              <span class="point">${product.point} نقطه</span>
            </div>
          </div>`;
  Btn_Add_To_Cart = document.querySelectorAll(".slid_show");
  add_To_Cart(Btn_Add_To_Cart);
}
// end get All product
// add to cart
function add_To_Cart(Btn) {
  Btn.forEach((btn) => {
    btn.addEventListener("click",(e) => {
      console.log(e.target)
      let product_Id = e.target.dataset.id;
      // Convert Data object values to an array
      let dataArray = Object.values(Data);
      // Flatten the array (if necessary)
      let productsArray = dataArray.flat();
      let get_element = productsArray.find(
        (product) => product.id === product_Id
      );
      products_In_Cart.push({...get_element,quantity:1});
      alert_nav_add_To_cart();
      count_In_Cart.innerHTML = products_In_Cart.length;
      display_Product_From_Cart_To_Dom();
      console.log(products_In_Cart)
    });
  });
 
}
// end add_To_Cart
function alert_nav_add_To_cart(){
  Toastify({
       text: "item added to cart",
       className: "info",
       gravity: "top", // `top` or `bottom`
       position: "center",
       style: {
         background: "linear-gradient(to right, #00b09b, #96c93d)",
         color: "white",
       },
     }).showToast();
}

function display_Product_From_Cart_To_Dom() {
    products_cart_content_Dom.innerHTML = "";
  products_In_Cart.forEach((product) => {
  
    products_cart_content_Dom.innerHTML += ` <li class="display_product">
            <div class="remove">
              <i class="fa-regular fa-trash-can"></i>
            </div>
            <div class="increment_decrement">
              <span class="increment">+</span>
              <span class="counter">${product.quantity}</span>
              <span class="decrmrnt">-</span>
            </div>
            <h6 class="name_product">${product.name}</h6>
            <div class="image_cart">
              <img src=${product.urlImage}>
            </div>
          </li>`;
  })
}



import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {alert_nav_add_To_cart} from './notification'
let categories_Icons_Container = document.querySelector(
  ".categories_Icons_Container"
);
let All_Products_Dom = document.querySelector(".All_Products .container .row");
let count_In_Cart = document.querySelector(".count_In_Cart");
let products_cart_content_Dom = document.querySelector(".products_cart");
let total_Price_content = document.querySelector(".total_Price_content");
let cart_content = document.querySelector(".cart_content");
let cart_icon_svg = document.querySelector(".cart_icon_svg");
let total_Price_Dom = document.querySelector(".mony");
let total_Coins = document.querySelector(".coins");
let contain_payment = document.querySelector(".contain_payment");
let Btn_increment = [];
let Btn_decrement = [];
let Btn_remove = [];
let Data = [];
let categories_Li = [];
let Btn_Add_To_Cart = [];
export let products_In_Cart = [];
let products = [];

//  start get data
(async function getData() {
  let data = await axios.get("../data/products.json");
  try {
    Data = await data.data;
  } catch (err) {
 
  }
  return Put_Category(Data), default_Product_display(Data);;
})();
//  end get data
//  start get products  form localStorage
get_Products_From_LocalStorage();
function get_Products_From_LocalStorage() {
   if (localStorage.getItem("products")) {
     let DataLocal = JSON.parse(localStorage.getItem("products"));
     products_In_Cart = DataLocal;
   
     let total_Products = products_In_Cart.reduce(
       (current, product) => current + product.quantity,
       0
     );
     count_In_Cart.innerHTML = total_Products;
     display_Product_From_Cart_To_Dom();
   }
}
 
//  end get products  form localStorage
  

// start add and remove class active from cart
cart_icon_svg.addEventListener('click',() => {
  cart_content.classList.toggle("active");
})
// start add and remove class active from cart
window.addEventListener('scroll',() => {
  if(window.scrollY > 80) {
    cart_content.style.top = 0;
    cart_content.style.height = '100vh'
  } else {
     cart_content.style.top = '141px';
  }
})
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
  get_All_Product_To_Dom(categories_Li, Data);
}
// end put category in dom
// start default category display
function default_Product_display(data) {
  let electronic_category = data.الالكترونيات;
  electronic_category.forEach((product) => {
    DisplayProducts(product);
  });
}
default_Product_display();

// end default category display



// start get All product

function get_All_Product_To_Dom(categoriesElement,data) {
  categoriesElement.forEach((category) => {
    category.addEventListener("click",(e) => {
      let category_element = e.target.dataset.category;
      products = data[category_element];
       All_Products_Dom.innerHTML = "";
      products.forEach((product) => {
        DisplayProducts(product);
      })
    });
  });
}
// end get All product



// start stander display products 
function DisplayProducts(product) {
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
              <span class="price"> ${product.price} ج.م  ${product.weights}</span>
              <span class="point">${product.coins} نقطه</span>
            </div>
          </div>`;
  Btn_Add_To_Cart = document.querySelectorAll(".slid_show");
  add_To_Cart(Btn_Add_To_Cart);
}
// end stander display products 

// add to cart
function add_To_Cart(Btn) {
  Btn.forEach((btn) => {
    btn.addEventListener("click",(e) => {

      let product_Id = e.target.dataset.id;
      // Convert Data object values to an array
      let dataArray = Object.values(Data);
      // Flatten the array (if necessary)
      let productsArray = dataArray.flat();
      let get_element = productsArray.find(
        (product) => product.id === product_Id
      );
       let existingProduct = products_In_Cart.find(
         (ele) => ele.id === get_element.id
       );

       if (existingProduct) {
         existingProduct.quantity++;
       } else {
         products_In_Cart.push({ ...get_element,quantity: 1 });
         alert_nav_add_To_cart();
       }
       let total_Products = products_In_Cart.reduce(
         (current, product) => current + product.quantity,
         0
       );
       count_In_Cart.innerHTML = total_Products;
       localStorage.setItem('products',JSON.stringify(products_In_Cart))
       display_Product_From_Cart_To_Dom();
        
    
    });
  });
 
}
// end add_To_Cart

 function display_Product_From_Cart_To_Dom() {
  if (products_In_Cart.length < 1) {
    products_cart_content_Dom.innerHTML = `<h2 class="no_Products">لا توجد منتجات فى العربه</h2>`;
    total_Price_content.classList.remove("active");
    contain_payment.classList.remove("active");
  } else {
    products_cart_content_Dom.innerHTML = "";
    total_Price_content.classList.add("active");
    contain_payment.classList.add("active");
    display_content_Html_tags(products_cart_content_Dom, products_In_Cart);
  
  }
 
  Btn_increment = document.querySelectorAll(".increment");
  Btn_decrement = document.querySelectorAll(".decrement");
  Btn_remove = document.querySelectorAll(".remove_Icon ");
  increment();
  decrement();
  remove_product();
  total_Price();
}

 // start display_content_Html_tags
  function display_content_Html_tags(element,data_products) {
     data_products.forEach((product) => {
       element.innerHTML += ` <li class="display_product">
            <div class="remove">
              <i class="remove_Icon fa-regular fa-trash-can"></i>
            </div>
            <div class="increment_decrement">
              <span class="increment" >+</span>
              <span class="counter" >${product.quantity}</span>
              <span class="decrement ">-</span>
            </div>
            <h6 class = "product_Price"> ${
              product.price * product.quantity
            } ج.م</h6>
            <h6 class="name_product">${product.name}</h6>
            <div class="image_cart">
              <img src=${product.urlImage}>
            </div>
          </li>`;
     });
  }
// end display_content_Html_tags
// start increment 
function increment() {
  Btn_increment.forEach((Btn,index) => {
    Btn.addEventListener('click',() => {
      products_In_Cart[index].quantity++
      localStorage.setItem("products", JSON.stringify(products_In_Cart));
      display_Product_From_Cart_To_Dom();
      total_Price();
      get_Products_From_LocalStorage();
    })
  })
}
// start increment 
// start decrement 
function decrement() {
  Btn_decrement.forEach((Btn, index) => {
    Btn.addEventListener("click",() => {
      if(products_In_Cart[index].quantity > 1)  {
        products_In_Cart[index].quantity--;
        localStorage.setItem("products", JSON.stringify(products_In_Cart));
        display_Product_From_Cart_To_Dom();
        total_Price();
        get_Products_From_LocalStorage();
      } 
    });
  });
}
// start decrement
// start remove Element
function remove_product() {
 Btn_remove.forEach((Btn, index) => {
   Btn.addEventListener("click",(e) => {
     products_In_Cart.splice(index,1);
     localStorage.setItem("products", JSON.stringify(products_In_Cart));
     display_Product_From_Cart_To_Dom();
     total_Price();
     get_Products_From_LocalStorage();
     
   });
 });
}
// end remove Element
//start  contain payment process


//end  contain payment process
// start price function 
function total_Price() {
  let total_price_count = products_In_Cart.reduce((current,item) => current + (item.price * item.quantity),0)
  let total_Coins_count = products_In_Cart.reduce(
    (current, item) => current + (item.coins * item.quantity),
    0
  );
  total_Price_Dom.innerHTML = `${total_price_count} ج.م `;
  total_Coins.innerHTML = `${total_Coins_count} عمله `;
}



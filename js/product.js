import axios from "axios";
let categories_Icons_Container = document.querySelector(
  ".categories_Icons_Container"
);
let All_Products_Dom = document.querySelector(".All_Products .container .row");
let categories_Li = [];

//  start get data
(async function getData() {
  let data = await axios.get("../data/products.json");
  let res = [];
  try {
     res = await data.data
  } catch(err) {
    console.log(err);
  }
  return Put_Category(res),default_Product_display(res) ;
}())
//  end get data
// start put category in dom 
function Put_Category(data) {
  for(let category in data) {
    let first_element_Image = data[category][0].urlImage;;
    categories_Icons_Container.innerHTML += ` <li class="category" style="background-image: url('${first_element_Image}'); "  data-category =${category}>
              <div class="layer_text"  data-category =${category}>
                <span>${category}</span>
              </div>
          </li>`;
  }
  categories_Li = document.querySelectorAll(".layer_text");
  get_All_Product_To_Dom(categories_Li,data);
}
// end put category in dom
// start default category display 
function default_Product_display(data) {
  let electronic_category = data.الالكترونيات;
  electronic_category.forEach((product) => {
    putElement(product);
  })  
}
default_Product_display();
// end default category display 
// start get All product 

function get_All_Product_To_Dom(categories,data) {
  categories.forEach((category) => {
    category.addEventListener("click",(e) => {
      e.stopPropagation();
      All_Products_Dom.innerHTML = "";
     let category_element = e.target.dataset.category;
     let products = data[category_element];
     console.log(products);
     products.forEach((product) => {
      putElement(product);
     })
   });
 });
}
// put product in html
function putElement(product) {
   All_Products_Dom.innerHTML += `  <div class="product_Card">
            <div class="image_Container">
              <img src=${product.urlImage}>
            </div>
            <h4 class="name_Product">${product.name}</h4>
            <div class="price_Content">
              <span class="price"> ${product.price} لكل كيلو</span>
              <span class="point">${product.point} نقطه</span>
            </div>
          </div>`;
}
// end get All product 
import axios from "axios";
import {send_Details_Msg} from './notification'

let get_Data_from_LocalStorage = JSON.parse(
  localStorage.getItem("products"));
let display_products_cart = document.querySelector(".display_products_cart");
let main_Input_Content_Input = document.querySelectorAll(".main_Input_Content input");
let total_Coins_Dom = document.querySelector(".total_Coins");
let total_Price_Dom = document.querySelector(".total_price");
const options_section = document.querySelectorAll(".options_section");
const form_Payment = document.querySelector(".form_Payment");



display_content_Html_tags()
// display total price first viewing
total_Price_Dom.innerHTML = get_Data_from_LocalStorage.reduce(
  (current, items) => current + items.price * items.quantity,
  0
);
// display total coins first viewing
total_Coins_Dom.innerHTML = get_Data_from_LocalStorage.reduce(
  (current, items) => current + items.coins * items.quantity,
  0
);
//################## start display content in cart product section##############
function display_content_Html_tags() {
 
   
   get_Data_from_LocalStorage.forEach((product) => {
     display_products_cart.innerHTML += ` <li class="display_product" >
            <div class="remove" data-id = ${product.id}>
              <i class="remove_Icon fa-regular fa-trash-can"  data-id = ${
                product.id
              }></i>
            </div>
            <div class="increment_decrement">
              <span class="increment"  data-id= ${product.id}>+</span>
              <span class="counter" data-id= ${product.id}>${
       product.quantity
     }</span>
              <span class="decrement" data-id= ${product.id}>-</span>
            </div>
            <h6 class = "product_Price" > ${
              product.price * product.quantity
            } ج.م</h6>
            <h6 class="name_product">${product.name}</h6>
            <div class="image_cart">
              <img src=${product.urlImage}>
            </div>
          </li>`;
   });
   let inCrement_Btn = document.querySelectorAll(".increment");
   let deCrement_Btn = document.querySelectorAll(".decrement");
   let quantity_Span = document.querySelectorAll(".counter");
   let price_Products = document.querySelectorAll(".product_Price");
   let remove_Icon_Btn = document.querySelectorAll(".remove");
   inCrement(inCrement_Btn, quantity_Span, price_Products);
   deCrement(deCrement_Btn, quantity_Span, price_Products);
   remove_product(remove_Icon_Btn);
 }
//################## end display content in cart product section##############


// ######################start choose option payments ##########################
main_Input_Content_Input.forEach((input) => {
  input.addEventListener("change",(e) => {
    const input_selected = e.target;
    if(e.target.checked) {
      main_Input_Content_Input.forEach((inputs_Unchecked) => {
        if(inputs_Unchecked !== e.target) {
          inputs_Unchecked.checked = false;
        }
      });
      if(input_selected.dataset.section !== undefined) {
        const Input_Data_section = input_selected.dataset.section;
        options_section.forEach((option) => {
          const option_Data_section = option.dataset.section;
          if(Input_Data_section === option_Data_section) {
            option.style.display = "flex";
          } else {
            option.style.display = "none";
          }
        })
      }
    } else {
        const Input_Data_section = input_selected.dataset.section;
      options_section.forEach((option) => {
        const option_Data_section = option.dataset.section;
        if(Input_Data_section === option_Data_section) {
          option.style.display = "none";
        } 
      })
    }
  });
});
// ######################  end choose option payments ##########################

// ######################  start increment function ##########################
function inCrement(increment_Btn, quantity_Span, price_Products) {
  increment_Btn.forEach((Btn, index) => {
    Btn.addEventListener("click", () => {
      const Btn_Id = Btn.dataset.id;
      let products = JSON.parse(localStorage.getItem("products"));
      products = products.map((product) => {
        if (product.id == Btn_Id) {
          product.quantity++;
          quantity_Span[index].innerHTML = product.quantity;
          price_Products[index].innerHTML = `${
            product.quantity * product.price
            } ج.م`;
          total_Price(products); 
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(products));
      
    });
  });
}

// ######################  end increment function ##########################
// ######################  start decrement function ##########################
function deCrement(decrement_Btn, quantity_Span, price_Products) {
  decrement_Btn.forEach((Btn,index) => {
    Btn.addEventListener("click", () => {
      const Btn_Id = Btn.dataset.id;
      let products = JSON.parse(localStorage.getItem("products"));
      products = products.map((product) => {
        if(product.id == Btn_Id) {
          console.log(product)
          if(product.quantity > 1) {
              product.quantity--;
              total_Price(products);
              quantity_Span[index].innerHTML = product.quantity;
              price_Products[index].innerHTML = `${
                product.quantity * product.price
              } ج.م`;
          }
        
          }
          return product;
        });
        localStorage.setItem("products", JSON.stringify(products));
    });
  });
}

// ######################  end decrement function ##########################


// ######################  start remove product  function ##########################
function remove_product(remove_Icon_Btn) {
  remove_Icon_Btn.forEach((Btn) => {
    Btn.addEventListener("click", (e) => {
      const Btn_Id = e.target.dataset.id;
      let products = JSON.parse(localStorage.getItem("products"));

      // Find the index of the product to be removed
      const index = products.findIndex((product) => product.id == Btn_Id);
      if (index !== -1) {
        // Remove the product from the products array
        products.splice(index, 1);
        // Update the local storage
        localStorage.setItem("products", JSON.stringify(products));

        // Remove the product's HTML element from the DOM
        const productElement = e.target.closest(".display_product");
        if (productElement) {
          productElement.remove();
        }

        // Update total price and total coins
        total_Price(products);
      }
    });
  });
}
// function remove_product (remove_Icon_Btn) {
//   remove_Icon_Btn.forEach((Btn,index) => {
//     Btn.addEventListener('click',(e) => {
//     console.log(e.target)
//       const Btn_Id = e.target.dataset.id;
//        console.log(Btn_Id);
//       let products = JSON.parse(localStorage.getItem('products'));
//       products.splice(index,1);     
//       localStorage.setItem('products',JSON.stringify(products));
//       display_content_Html_tags();
//     })
//   })
// }



// ######################  end  remove product  function ##########################



// ######################  start total_Price function ##########################
function total_Price(products) {
  let Total_price_calc = products.reduce(
    (current, item) => current + item.price * item.quantity,
    0
    );
  let Total_Coins_calc = products.reduce(
    (current, item) => current + item.coins * item.quantity,
    0
  );
    
  total_Price_Dom.innerHTML = Total_price_calc;
  total_Coins_Dom.innerHTML = Total_Coins_calc;
    return Total_price_calc, Total_Coins_calc;
  }
// ######################  end total_Price function ##########################


 
// ######################  start Get user form data ##########################
async function add_Payment_Data_To_User(Data_Form) {
  const get_User_Token = localStorage.getItem("token");
  console.log(get_User_Token);
  let users = await axios.get("http://localhost:3000/users");
  let users_Data = users.data;
  let get_User = users_Data.find((user) => user.status_user.token === get_User_Token);
   get_User.Operations.push(Data_Form);
  let user_Id = get_User.id
  axios.put(`http://localhost:3000/users/${user_Id}`, {
   ... get_User
  });
  send_Details_Msg()
  localStorage.setItem('products',"");
  setTimeout(() => {
     window.location.replace("../index.html");
     window.history.replaceState({}, document.title, window.location.href);
  },2000)
   
}

// ######################  end  Get user form data ##########################
// ######################  start collect form data ##########################
form_Payment.addEventListener('submit',(e) => {
  e.preventDefault();
  const get_User_Token = localStorage.getItem('token');
  
  if(get_User_Token) {
    
  } else {
     window.location.replace("http://localhost:5173/page/login_register.html");
     window.history.replaceState({}, document.title, window.location.href);
  }
 
  let FormCollect_Payment = new FormData(e.currentTarget);
  let FormData_Object_Data = Object.fromEntries(
    Array.from(FormCollect_Payment)
  );
  console.log(FormData_Object_Data.payment_way);
  console.log(FormData_Object_Data);
  let cart_Operations = {
    ...FormData_Object_Data,
    products: {
      product_buy_It:get_Data_from_LocalStorage,
      Total_payment_many: +total_Price_Dom.innerHTML,
      Total_payment_coins: +total_Coins_Dom.innerHTML,
    },
  };
  add_Payment_Data_To_User(cart_Operations); 
  
})
// ######################  end collect form data ##########################
  
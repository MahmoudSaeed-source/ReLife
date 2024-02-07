import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { user_LogIn_Don } from '../js/notification';
import { user_LogIn_error } from "../js/notification";
let email_Sign_In = document.getElementById("email_Sign_In");
let password_Sign_In = document.getElementById("password_Sign_In");
let form_Sign_In = document.getElementById("form_Sign_In");

// start find user try login
form_Sign_In.addEventListener("submit", (e) => {
  e.preventDefault();
  let email_Sign_In_value = email_Sign_In.value;
  let password_Sign_In_value = password_Sign_In.value;
   let email_next_element = email_Sign_In.nextElementSibling;
   let password_Sign_In_next_element = password_Sign_In.nextElementSibling;
  if(email_Sign_In_value === "" || email_Sign_In_value === undefined || email_Sign_In_value === null) {
   email_next_element.style.display = "flex";
  } else {
    email_next_element.style.display = "none";
    
  }
  if (
    password_Sign_In_value === "" ||
    password_Sign_In_value === undefined ||
    password_Sign_In_value === null
  ) {
    password_Sign_In_next_element.style.display = "flex";
  } else {
    password_Sign_In_next_element.style.display = "none";
  }
    axios.get("http://localhost:3000/users").then((res) => {
      let users_Data = res.data;
      let newToken = createToken(32);
      let find_user = users_Data.find(
        (user) =>
          user.info.email === email_Sign_In_value &&
          user.info.password === password_Sign_In_value
      );
      let user_id = find_user.id
        let user_Api = `http://localhost:3000/users/${user_id}`;
        if (find_user) {
          axios.put(user_Api, {
            ...find_user,
            status_user: { is_Login: true, token: newToken },
          });
          localStorage.setItem("token", newToken);
          user_LogIn_Don();
          setTimeout(() => {
            if (document.referrer === "http://localhost:5173/index.html") {
              window.location.replace("../index.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            } else if (
              document.referrer === "http://localhost:5173/index.html"
            ) {
              window.location.replace("../index.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            } else if (
              document.referrer === "http://localhost:5173/page/products.html"
            ) {
              window.location.replace("../page/products.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            } else if (
              document.referrer === "http://localhost:5173/page/cart.html"
            ) {
              window.location.replace("../page/cart.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            } else {
              window.location.replace("../index.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            }
          }, 2000);
        } else {
          user_LogIn_error()
        }
      
       
    })
  
});

// end find user try login

// end get user form db

// start create token
function createToken(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }

  return token;
}
// end create token

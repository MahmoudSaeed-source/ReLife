import axios from "axios";
import { user_LogIn_Don } from '../js/notification';
import { user_LogIn_error } from "../js/notification";
let email_Sign_In = document.getElementById("email_Sign_In");
let password_Sign_In = document.getElementById("password_Sign_In");
let form_Sign_In = document.getElementById("form_Sign_In");

// start find user try login
form_Sign_In.addEventListener("submit", (e) => {
  e.preventDefault();
  axios.get("http://localhost:3000/users").then((res) => {
    let users_Data = res.data;
    let newToken = createToken(32);
    let email_Sign_In_value = email_Sign_In.value;
    let password_Sign_In_value = password_Sign_In.value;
      users_Data.forEach((user) => {
        const userId = user.id;
        const user_Email = user.info.email;
        const user_Password = user.info.password;
        let user_Api = `http://localhost:3000/users/${userId}`;
        if (
          user_Email === email_Sign_In_value &&
          user_Password === password_Sign_In_value
        ) {
          axios.put(user_Api, {
            ...user,
            status_user: { is_Login: true, token: newToken },
          });
          localStorage.setItem("token",newToken);
          console.log(user.status_user.token);
          console.log(user);
          user_LogIn_Don();
          setTimeout(() => {
            if(document.referrer === "http://localhost:5173/index.html") {
              window.location.replace("../index.html");
              window.history.replaceState(
                {},
                document.title,
                window.location.href
              );
            }else if (document.referrer === "http://localhost:5173/index.html") {
                window.location.replace("../index.html");
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.href
                );
              }else if(document.referrer === 'http://localhost:5173/page/products.html') {
                window.location.replace("../page/products.html");
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.href
                );
            }else if (document.referrer === "http://localhost:5173/page/cart.html") {
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
          user_LogIn_error();
        }
      });
    
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

import axios from "axios";
import { alert_Register_Don } from "./notification";
import { email_Register_Before } from "./notification";
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
let form_Register = document.querySelector(".form_Register");
let form_Register_Inputs = document.querySelectorAll(".form_Register input");
let form_Sign_In = document.querySelector(".form_Sign_In");
let user_Name_register = document.querySelector(".user_Name_register");
let phon_number = document.querySelector(".phon_number");
let email_Register = document.querySelector(".email_Register");
let password_register = document.querySelector(".password_register");
let validation_In_put_Span = document.querySelectorAll("validation_Error");
let password_regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const egyptianPhoneNumberRegex = /^01[0-9]{9}$/;


// ########################### start register_section  functions #########################
// start chang form element Dom
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
// end chang form element Dom.


// start display error message
form_Register_Inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    const validationErrorElement = e.target.nextElementSibling;
    validationErrorElement.style.display = "none";
  });
});
// end display error message

// start form_Register
form_Register.addEventListener("submit", (e) => {
  e.preventDefault();
  let form_Register_Data = new FormData(e.currentTarget);
  let formDataObject = Object.fromEntries(Array.from(form_Register_Data));
  let password_Valid = password_register.value.match(password_regex);
  let phon_number_Valid = phon_number.value.match(egyptianPhoneNumberRegex);
  let email_valid = email_Register.value.match(emailRegex);
  console.log(formDataObject);
  if (!password_Valid) {
    password_register.nextElementSibling.style.display = "flex";
  }


  if (!phon_number_Valid) {
    phon_number.nextElementSibling.style.display = "flex";
  }


  if (!email_valid) {
    email_Register.nextElementSibling.style.display = "flex";
  } 


   checkEmail(formDataObject,formDataObject,password_Valid,phon_number_Valid,email_valid,);
});
// end form_Register


// start check if email address register before

async function checkEmail(form_User_Data,formDataObject,
password_Valid,
phon_number_Valid,
email_valid,) {
  let all_Users = await axios.get("http://localhost:3000/users");
  try {
    let users = await all_Users.data;
    let find_User = users.find((user) => user.info.email === form_User_Data.email)
    

    if(find_User) {
      email_Register_Before();
       setTimeout(() => {
         window.location.replace("../page/login_register.html");
         window.history.replaceState({}, document.title, window.location.href);
       }, 2000);
    } else {
      if (password_Valid && phon_number_Valid && email_valid) {
        axios.post("http://localhost:3000/users", {
          info: formDataObject,
          msg: [],
          status_user: { is_Login: false, token: "" },
          Operations: [],
          Default_payment_status: {
            cash: true,
            Electronic_wallet: false,
            donation: false,
            points: false,
          },
          coins: 0,
        });
        alert_Register_Don();
        setTimeout(() => {
          window.location.replace("../page/login_register.html");
          window.history.replaceState({}, document.title, window.location.href);
        },2000);
        user_Name_register.value = "";
        phon_number.value = "";
        email_Register.value = "";
        password_register.value = "";
      } 
    }
  } catch(err) {
    console.log(err)
  }
 
}
// end check if email address register before


// ########################### end register_section  functions #########################









const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
let form_Register = document.querySelector(".form_Register");
let form_Sign_In = document.querySelector(".form_Sign_In");
let password_regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$";
// start chang form element Dom
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
// end chang form element Dom

import axios from "axios";
import { user_sign_out } from './notification'

export  let get_Token = localStorage.getItem("token");
get_User_login();
export function get_User_login() {
  let user_Section = document.querySelector('.user');
  if(get_Token) {
    axios.get("http://localhost:3000/users").then((res) => {
      let users = res.data;
      let get_Token = localStorage.getItem("token");
      users.forEach(user => {   
       if (user.status_user.token === get_Token) {
          user_Section.innerHTML = `<div class="image_container_user">
              <img src="/assets/logo/user.png " alt="user" class="user_img">
            </div>
            <span class="user_name_login">${user.info.user_name}</span>
            <div class="coins_section">
                  <span class="counter_coins">${user.coins}</span>
                  <span class="user_coins"><i class="fa-solid fa-coins"></i></span>
              </div>
           
              <div class="mail">
                  <span class="counter_mail">${user.msg.length}</span>
                  <span class="user_Mail"><i class="fa-regular fa-envelope"></i></span>
              </div>
               <ul class="user_nav">
            <li class="profile"><a href="./page/profile.html">الصفحة الشخصية</a></li>
            <li class="sign_out">تسجيل الخروج</li>
          </ul>
              `;
       } else {
          user_Section.innerHTML = `  <i class="fa-regular fa-user"></i>
              <span><a href="../page/login_register.html">تسجيل الدخول</a></span>`;
       }
      
      });
      let image_Profile = document.querySelector(".user_img");
      let user_nav = document.querySelector(".user_nav");
      image_Profile.addEventListener("click",(e) => {
       user_nav.classList.toggle("active");
      });
      let Btn_sign_out = document.querySelector(".sign_out");
      sign_out(Btn_sign_out, get_Token);

 
     
    })
   
  } else {
     user_Section.innerHTML = `  <i class="fa-regular fa-user"></i>
              <span><a href="../page/login_register.html">تسجيل الدخول</a></span>`;
  }
}


export function sign_out(Btn_sign_out, get_Token) {
  Btn_sign_out.addEventListener("click",(e) => {
    axios.get('http://localhost:3000/users').then((data) => {
      let users = data.data
      users.forEach((user) => {
        let userId = user.id;
        let user_Api = `http://localhost:3000/users/${userId}`;
        let user_Token = user.status_user.token;
        console.log(user_Token);
        if(user_Token === get_Token) {
           axios.put(user_Api, {
             ...user,
             status_user: { is_Login: false, token: "" },
           });
          localStorage.removeItem("token");
         
          setTimeout(() => {
            window.location.replace("../index.html");
            window.history.replaceState(
              {},
              document.title,
              window.location.href
            );
          }, 1000);
       }
      });
    })
  });
}

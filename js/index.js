import axios from "axios";
import { msg } from './notification'
import { confirm_SignOut } from "./notification";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
export let get_Token = localStorage.getItem("token");
let mail_center = document.querySelector(".mail_center");
let mail_content = document.querySelector(".mail_content");
let over_layer = document.querySelector(".over_layer");
let massage_content_document = document.querySelector(
  ".massage_content_document"
);
get_User_login();
// start get  unread messages
function unread_Messages(user) {
   let falseMessagesCounter = 0;
   user.msg.forEach((ms) => {
     if (ms.msg_status === false) {
       falseMessagesCounter++;
     } 
   });
  return falseMessagesCounter;
}
// start sea a new massage
see_New_massage();
export function see_New_massage() {
  axios.get("http://localhost:3000/users").then((res) => {
    let users_Data = res.data;
    let get_User = users_Data.find(
      (user) => user.status_user.token === get_Token
    );
    let msg_counter = get_User.msg.length;
    let Msg_length_Local = +localStorage.getItem("user_msgs");

    let msg_Interval = setInterval(() => {
      if (msg_counter !== Msg_length_Local) {
        msg();
        localStorage.setItem("user_msgs", msg_counter);
        localStorage.setItem("user_msgs", msg_counter);
        clearInterval(msg_Interval);
      }
    }, 2000);
  });
}

// end ser a new massage
// end get  unread messages
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
                  <span class="counter_mail">
                  ${unread_Messages(user)}</span>
                  <span class="user_Mail"><i class="fa-regular fa-envelope"></i></span>
              </div>
               <ul class="user_nav">
            <li class="profile"><a href="/page/profile.html">الصفحة الشخصية</a></li>
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
      let user_Mail = document.querySelector(".user_Mail");
      user_Mail.addEventListener('click',() => {
        mail_center.classList.toggle("active");
      
      })
      sign_out(Btn_sign_out,get_Token);
    })
   
  } else {
     user_Section.innerHTML = `  <i class="fa-regular fa-user"></i>
              <span><a href="../page/login_register.html">تسجيل الدخول</a></span>`;
  }
}

// start sign_out user
export function sign_out(Btn_sign_out, get_Token) {
  Btn_sign_out.addEventListener("click",(e) => {
    axios.get('http://localhost:3000/users').then((data) => {
      let users = data.data
      users.forEach((user) => {
        let userId = user.id;
        let user_Api = `http://localhost:3000/users/${userId}`;
        let user_Token = user.status_user.token;
        if(user_Token === get_Token) {
           axios.put(user_Api, {
             ...user,
             status_user: { is_Login: false, token: "" },
           });
          localStorage.removeItem("token");
         confirm_SignOut()
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
// end sign_out user
// start get mails form user
  get_Mails();
function get_Mails() {
  axios.get("http://localhost:3000/users").then((res) => {
    let users_Data = res.data;
    let get_User = users_Data.find(
      (user) => user.status_user.token === get_Token
    );
    let msg = get_User.msg;

    msg.forEach((sms, index) => {
      mail_content.innerHTML += ` <li class="sms" data-index = ${index}>
            <span class="status">
              ${
                sms.msg_status
                  ? '<span class="read"></span>'
                  : '<span class="circle"></span>'
              }
            
            </span>
            <span class="from">خدمه العملاء</span>
            <span class="subject">${sms.msg_text}</span>
           </li>`;
    });
    let massage_Sms = document.querySelectorAll(".sms");
    display_Content_Massage(massage_Sms, msg, get_User);
  });
}

// end get mails form user

// start display all content massage
function display_Content_Massage(massage_Sms, msg, get_User) {
  massage_Sms.forEach((sms,index) => {
    sms.addEventListener("click", (e) => {
      mail_center.classList.remove("active");
      
      over_layer.classList.add("active");
      massage_content_document.innerHTML = `<div  class="from_who">
           <span class="who"> من :</span>
            <span class="who_content">خدمه العملاء</p>
              </div>
             <div class="date">
              <span class="when">تاريخ :</span>
              <p class="massage_Date">${msg[index].date}</p>
             </div>
             <div class="massage_subject">
              <span class="sub">الموضوع :</span>
<p class="massage">${msg[index].msg_text}</p>
             </div>`;
      get_User.msg[index].msg_status = true;
      axios.put(`http://localhost:3000/users/${get_User.id}`,{ ...get_User });
      
        get_User_login();
     
    });
  });
  over_layer.addEventListener("click", () => {
    over_layer.classList.remove("active");
  });
}
// end display all content massage
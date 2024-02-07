import "bootstrap";
import axios from "axios";
let display_Profile_Sections_layout = document.querySelector(
  ".display_Profile_Sections_layout"
);
let name_User =document.querySelector(".name_User");
let get_User_Token = localStorage.getItem("token");
let info = document.querySelector(".info");
let Operation = document.querySelector(".Operation");



  
  axios.get("http://localhost:3000/users").then((response) => {
    let data_users = response.data;
    console.log(data_users);
   let get_User = data_users.find(
      (user) => user.status_user.token === get_User_Token
    );
    name_User.innerHTML = ` ${get_User.info.user_name}`;
   
  }) 

2 
User_info();
function User_info() {
  axios.get("http://localhost:3000/users").then((response) => {
    let data_users = response.data;
   
    let get_User = data_users.find(
      (user) => user.status_user.token === get_User_Token
    );

    display_Profile_Sections_layout.innerHTML = "";
    display_Profile_Sections_layout.innerHTML = `  <div class="display_Info">
                  <h4 class="title_section_info">المعلومات الشخصيه</h4>
                  <div class="user_Details">
                    <span class="head">الاسم</span>
                    <span class="user">${get_User.info.user_name}</span>
                  </div>
                  <div class="user_Details">
                    <span class="head">رقم الهاتف</span>
                    <span class="user">${get_User.info.phon}</span>
                  </div>
                  <div class="user_Details">
                    <span class="head">الايميل</span>
                    <span class="user">${get_User.info.email}</span>
                  </div>
                </div>`;
  }); 
  }
    
info.addEventListener("click", User_info);
Operation.addEventListener("click",user_Operations);


function user_Operations(get_User) {
  axios.get("http://localhost:3000/users").then((response) => {
    let data_users = response.data;
   
    let get_User = data_users.find(
      (user) => user.status_user.token === get_User_Token
    );
    let operationsHTML = `<div class="history_Operations">
            <table>
              <tr>
                <th class="table_heder">رقم العملية</th>
                <th class="table_heder">تاريخ العملية</th>
                <th class="table_heder">عدد القطع</th>
                <th class="table_heder">المنتجات</th>
                <th class="table_heder">المبلغ</th>
                <th class="table_heder">طريقه الدفع</th>
              </tr>`;

    // Loop through each operation and add table rows
    get_User.Operations.forEach((operation,index) => {
      let productsHTML = "";
    
      // Loop through each product in the operation
      operation.products.product_buy_It.forEach((product) => {
        productsHTML += `<div class = "products_names">${product.name}</div>`; // Add each product name
      });

      operationsHTML += `<tr class="operation_row">
                <td class="pro_details no_op">${index + 1}</td>
                <td class="pro_details date_op">${operation.products.operations_Date.substring(
        0,
        10
      )}</td>
                <td class="pro_details pro_Op">${operation.products.product_buy_It.length
        }</td>
                <td class="pro_details pro_Op">${productsHTML}</td>
                <td class="pro_details pro_Op">${operation.products.Total_payment_many
        } ج.م</td>
                <td class="pro_details pay_way">${operation.payment_way}</td>
              </tr>`;
    });

    operationsHTML += `</table></div>`;

    // Set the HTML content to the generated operations HTML
    display_Profile_Sections_layout.innerHTML = operationsHTML;
  })
}

import axios from "axios";
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

    for(let i = 0; i < users_Data.length; i++) {
      let user = users_Data[i];
      let user_id = user.id;

      if(
        user.info.email == email_Sign_In_value &&
        user.info.password === password_Sign_In_value
      ) {
        console.log(user)
      }
      //     let userApi = `http://localhost:3000/users/:${user_id}`;
      //  axios
      //    .post(userApi, {
      //      "status_user.is_Login": true,
      //      "status_user.token": newToken,
      //    })
      //    .then((response) => {
      //      console.log("User fields updated successfully", response.data);
      //    })
      //    .catch((err) => {
      //      if (err.response.status === 404) {
      //        console.log(
      //          "User not found. Check the user_id and server-side code."
      //        );
      //  } else {
      //    console.log("Error updating user:", err.response.data);
      //  }
      //  });
      //   return {
      //     status_user: {
      //       is_Login: true,
      //       token: newToken,
      //     },
      //     };
      //   }
      // }
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

// start alert_Register_Done
export function alert_Register_Don() {
  Toastify({
    text: "تم انشاء الحساب ",
    className: "info",
    gravity: "top", // `top` or `bottom`
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}
// end alert_Register_Done

// start email_Register_Before
export function email_Register_Before() {
  Toastify({
    text: "هذا الحساب مسجل من قبل بامكانك تسجيل الدخول",
    className: "info",
    gravity: "top", // `top` or `bottom`
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}
//end email_Register_Before

// start user login
export function user_LogIn_Don() {
  Toastify({
    text: "تم تسجيل الدخول ",
    className: "info",
    gravity: "top", // `top` or `bottom`
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}
// end user login

// start userName or password wrong
export function user_LogIn_error() {
  Toastify({
    text: "خطا فى الايميل او الباسورد",
    className: "info",
    gravity: "top", // `top` or `bottom`
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}
// end userName or password wrong
//  start user sign_out
export function user_sign_out() {
  Toastify({
    text: "تم تسجيل الخروج",
    className: "info",
    gravity: "top", // `top` or `bottom`
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}
//  end  user sign_out
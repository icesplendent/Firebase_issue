import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { init_firebase } from "./config";

// Custom alert
function create_alert(type, message) {
  const alertarea = document.getElementById("custom-alert");
  if (type == "success") {
    const str_html =
      "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" +
      message +
      "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    alertarea.innerHTML = str_html;
  } else if (type == "error") {
    const str_html =
      "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" +
      message +
      "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    alertarea.innerHTML = str_html;
  }
}

const initApp = () => {
  init_firebase();

  // Login with Email/Password
  const txtEmail = document.getElementById("inputEmail");
  const txtPassword = document.getElementById("inputPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnGoogle = document.getElementById("btngoogle");
  const btnSignUp = document.getElementById("btnSignUp");

  btnSignUp.addEventListener("click", () => {
    // TODO 2: Add email signup button event
    //     Steps:
    //     1. Get user input email and password to signup
    //     2. Show success message by "create_alert()" and clean input field
    //     3. Show error message by "create_alert()" and clean input field
    console.log(txtEmail.value);
    console.log(txtPassword.value);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, txtEmail.value, txtPassword.value)
      .then((result) => {
        txtEmail.value = "";
        txtPassword.value = "";
        create_alert("success", result.user.email);
      })
      .catch((e) => {
        txtEmail.value = "";
        txtPassword.value = "";
        create_alert("error", e.message);
      });
  });

  btnLogin.addEventListener("click", () => {
    // TODO 3: Add email login button event
    //     Steps:
    //     1. Get user input email and password to login
    //     2. Back to index.html when login success
    //     3. Show error message by "create_alert()" and clean input field
    const auth = getAuth();
    signInWithEmailAndPassword(auth, txtEmail.value, txtPassword.value)
      .then((result) => {
        window.location.href = "index.html";
      })
      .catch((e) => {
        txtEmail.value = "";
        txtPassword.value = "";
        create_alert("error", e.message);
      });
  });

  btnGoogle.addEventListener("click", () => {
    // TODO 4: Add google login button event
    //     Steps:
    //     1. Use popup function to login google
    //     2. Back to index.html when login success
    //     3. Show error message by "create_alert()"
    console.log("Google Login");
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        window.location.href = "index.html";
      })
      .catch((e) => {
        create_alert("error", e.message);
      });
  });
};

window.onload = () => {
  initApp();
};

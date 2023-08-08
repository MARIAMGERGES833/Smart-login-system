//===+++==== data signup
"Use strict";
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const signUpData = document.getElementById("signUp");
const ankorSignIn = document.querySelector("#ankorSignIn");
const formBox = document.querySelector(".form-box");
const paragraph = document.querySelector("p");
// =======variable logout
const logOutGroup = document.querySelector(".logOutGroup");
// =======variable login
const login = document.getElementById("Login");
const userEmailLogIn = document.querySelector("#userEmailLogIn");
const userPasswordLogIn = document.querySelector("#userPasswordLogIn");
const formBox2 = document.querySelector(".form-box2");
const welcome = document.querySelector(".welcome");
const welcomeUser = document.querySelector(".welcomeUser");
const ankorSignUp = document.querySelector("#ankorSignUp");

let userList = [];

// =======check data in locatstorage
if (localStorage.getItem("signup") !== null) {
  userList = JSON.parse(localStorage.getItem("signup"));
} else {
  userList = [];
}

//===========signup ======signup===========
signUpData.addEventListener("click", () => {
  signUp();
});
userName.addEventListener("keyup", function () {
  if (userName.value == 0) {
    clearNameBorder();
  } else {
    validateBorderName();
  }
});
userEmail.addEventListener("keyup", function () {
  if (userEmail.value == 0) {
    clearEmailBorder();
  } else {
    validateBorderEmail();
  }
});
userPassword.addEventListener("keyup", function () {
  if (userPassword.value == 0) {
    clearPasswordBorder();
    // checkValue();

  } else {
    validateBorderPassword();
  }
});

///////////////////////
function checkValue() {
  if (userName.value != 0 && userEmail.value != 0 && userPassword.value != 0) {
    seenSuccess();
  }
}
checkValue();
function seenSuccess() {
  if (validateName() && validateEmail() && validatePassword()) {
    paragraph.classList.replace("d-none", "d-block");
  }
}
//===========clearData

//==============signUp
function signUp() {
  let val = validateName() && validateEmail() && validatePassword();
  let emailExists = false;

  for (let i = 0; i < userList.length; i++) {
    if (userEmail.value === userList[i].email) {
      emailExists = true;
      break;
    }
  }

  if (val && !emailExists) {
    let userData = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    userList.push(userData);
    localStorageData(userList);
    showLoginForm();
    showSuccessMessage('Sign Up Success', 'You have successfully signed up!');
    clearAllBorderAndData()
    } else {
    if (emailExists) {
      showError("This email is already in use. Please choose another email.");
    } else {
      showError("Please follow the rules...");
    }
  }
}


function showSuccessMessage(title, message) {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
  });
}
function showError(message) {
  Swal.fire({
    icon: "error",
    title: "Sign Up Error",
    text: message,
  });
}

//==============localstorage
function localStorageData(data) {
  localStorage.setItem("signup", JSON.stringify(data));
}

//============= validation
function validateName() {
  let regexName = /^[A-Za-z\d_\s]{3,}$/;
  return regexName.test(userName.value);
}

function validateEmail() {
  let regexEmail = /^[\w\@]{3,}\.com$/;
  return regexEmail.test(userEmail.value);
}

function validatePassword() {
  let regexPassword = /^[\w\s.]{8,10}$/;
  return regexPassword.test(userPassword.value);
}

//============= validation with border

function validateBorderName() {
  if (validateName() == true) {
    userName.style = "border-bottom:1px solid green";
  } else {
    userName.style = "border-bottom:1px solid red";
  }
}
function validateBorderEmail() {
  if (validateEmail() == true) {
    userEmail.style = "border-bottom:1px solid green";
  } else {
    userEmail.style = "border-bottom:1px solid red";
  }
}
function validateBorderPassword() {
  if (validatePassword() == true) {
    userPassword.style = "border-bottom:1px solid green";
  } else {
    userPassword.style = "border-bottom:1px solid red";
  }
}

//============= clear border
function clearNameBorder() {
  userName.style = "border-bottom:1px solid var(--color-white)";
}
function clearEmailBorder() {
  userEmail.style = "border-bottom:1px solid var(--color-white)";
}
function clearPasswordBorder() {
  userPassword.style = "border-bottom:1px solid var(--color-white)";
}

//============= clear All border
function clearAllBorderAndData() {
  userName.style = "border-bottom:1px solid var(--color-white)";
  userEmail.style = "border-bottom:1px solid var(--color-white)";
  userPassword.style = "border-bottom:1px solid var(--color-white)";
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}

//============= ankorSignIn
ankorSignIn.addEventListener("click", function () {
  showLoginForm();
});
function showLoginForm() {
  formBox.classList.replace("d-block", "d-none");
  formBox2.classList.replace("d-none", "d-block");
  clearAllBorderAndData();     // Reset border styles
}

//============= login===========login======login
login.addEventListener("click", logIn);

function logIn() {
  if (userEmailLogIn.value == 0 && userPasswordLogIn.value == 0) {
    Swal.fire({
      icon: "error",
      title: " Try again :",
      text: ` All input is required `,
    });
  } else {
    funLogIn();
  }
}

//============= ankorSignUp
ankorSignUp.addEventListener("click", function () {
showSignUpForm();
});
function showSignUpForm() {
  formBox.classList.replace("d-none", "d-block");
  formBox2.classList.replace("d-block", "d-none");
}
function funLogIn() {
  x = JSON.parse(localStorage.getItem("signup"));
  let loginSuccessful = false; // Add a flag to track login success

  for (let i = 0; i < userList.length; i++) {
    console.log(x[i].name, x[i].password, x[i].email);
    if (
      userEmailLogIn.value == x[i].email &&
      userPasswordLogIn.value == x[i].password
    ) {
      // Set the flag to true for successful login
      loginSuccessful = true;
      formBox2.classList.replace("d-block", "d-none");
      welcomeUser.classList.replace("d-none", "d-block");
      welcome.innerHTML = "welcome " + x[i].name;
      setInterval(creatBubble, 50)
      clearLoginData()
      break; // Exit the loop after successful login
    }
  }

  if (!loginSuccessful) {
    // Show error message if login was unsuccessful
    Swal.fire({
      icon: "error",
      title: " Try again :",
      text: ` They aren't true data `,
    });
  }
  if (loginSuccessful) {
    Swal.fire({
      icon: "success",
      title: "Login Success",
      text: "You have successfully logged in!",
      timer: 1000,
    })
    
  }
}

//===========clearData
function clearLoginData() {
  userEmailLogIn.value = "";
  userPasswordLogIn.value = "";
}

//============= creat bubble==========
function creatBubble() {
  const section = document.querySelector("section");
  const createElement = document.createElement("span");
  let size = Math.random() * 60;

  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";
  createElement.style.left = (Math.random() * innerWidth - 100 )+ "px";
  section.appendChild(createElement);
  setTimeout(() => {
    createElement.remove();
  }, 5000);
}


//==========log Out

logOutGroup.addEventListener("click", function () {
  formBox.classList.replace("d-none", "d-block");
  welcomeUser.classList.replace("d-block", "d-none");

});

//===+++==== data signup
"Use strict";
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let signUpData = document.getElementById("signUp");
let ankorSignIn = document.querySelector("#ankorSignIn");
let formBox = document.querySelector(".form-box");
let paragraph = document.querySelector("p");
// =======variable logout
let logOutGroup = document.querySelector(".logOutGroup");
// =======variable login
let login = document.getElementById("Login");
let userEmailLogIn = document.querySelector("#userEmailLogIn");
let userPasswordLogIn = document.querySelector("#userPasswordLogIn");
let formBox2 = document.querySelector(".form-box2");
let welcome = document.querySelector(".welcome");
let welcomeUser = document.querySelector(".welcomeUser");
let ankorSignUp = document.querySelector("#ankorSignUp");

let userList = [];

// =======check data in locatstorage
if (localStorage.getItem("signup") != null) {
  userList = JSON.parse(localStorage.getItem("signup"));
} else {
  userList = [];
}

//===========signup ======signup===========
signUpData.addEventListener("click", signUp);
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
////////////////////////

//==============signUp
function signUp() {
  let val = validateName() && validateEmail() && validatePassword();
      if (val == true) {
        const userData = {
          name: userName.value,
          email: userEmail.value,
          password: userPassword.value,
        }; 
        const existingUser = userList.find(user => user.email === userData.email);

        if (existingUser) {
          Swal.fire("Email already exists", "Please use a different email.", "error");
        } else {
        userList.push(userData);
        localStorageData(userList);
        //    console.log(userList)
        clearData();
        formBox.classList.replace("d-block", "d-none");
        formBox2.classList.replace("d-none", "d-block");
      } }else {
        Swal.fire({
          icon: "error",
          title: " Please follow the rules below :",
          text: `  1-Site name must contain at least 3 characters 
                    2-Email for example ****@***.com
                    3-Password contain ( 8 - 10 ) `,
        })
      }
    
    clearData();
    clearAllBorder();
  }


//==============localstorage
function localStorageData(data) {
  localStorage.setItem("signup", JSON.stringify(data));
}

//===========clearData
function clearData() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
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
function clearAllBorder() {
  userName.style = "border-bottom:1px solid var(--color-white)";
  userEmail.style = "border-bottom:1px solid var(--color-white)";
  userPassword.style = "border-bottom:1px solid var(--color-white)";
}

//============= ankorSignIn
ankorSignIn.addEventListener("click", function () {
  formBox.classList.replace("d-block", "d-none");
  formBox2.classList.replace("d-none", "d-block");
});

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
  formBox.classList.replace("d-none", "d-block");
  formBox2.classList.replace("d-block", "d-none");
});

function funLogIn() {
    const existingEmail = userList.find( userEmailLogIn.value === userData.email);
    const existingPassword = userList.find(userPasswordLogIn.value == userData.password);
         
    if (      existingEmail == true &&      existingPassword ==true   ) {
      // console.log ("welcome")
      formBox2.classList.replace("d-block", "d-none");
      welcomeUser.classList.replace("d-none", "d-block");
      welcome.innerHTML = "welcome " + x[i].name;
      Swal.fire("Login successful!", "", "success");

    } else {
      Swal.fire({
        icon: "error",
        title: " Try again :",
        text: ` They aren't true data `,
      });
    }
  }



//===========clearData
function clearData() {
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
  createElement.style.left = Math.random() * innerWidth  + "px" ;
  section.appendChild(createElement);
  setTimeout(() => {
    createElement.remove();
  }, 5000);
}
setInterval(creatBubble, 50);

//==========log Out

logOutGroup.addEventListener("click", function () {
  formBox.classList.replace("d-none", "d-block");
  welcomeUser.classList.replace("d-block", "d-none");
});

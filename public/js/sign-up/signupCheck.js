// Func corresponding w/ sign-up button
const signUp = async (event) => {
  event.preventDefault();

  // Retrieve values from sign-up form
  const userName = document.querySelector(".userName-signup").value.trim();
  const userEmail = document.querySelector(".email-signup").value.trim();
  const userPassword = document.querySelector(".password-signup").value.trim();

  // We check if all fields are filled...
  if (userName === "") {
    console.log("This name: ", userName, " is correct.");
    alert("Empty User Name, fill it out...");
    return;
  } else if (userEmail === "") {
    console.log("This email: ", userEmail, " is correct.");
    alert("Fill out your Email...");
    return;
  } else if (userPassword === "") {
    console.log("This password: REDACTED is correct.");
    alert("Set your password...");
    return;
  }

  console.log("User Name:", userName);
  console.log("User Email:", userEmail);
  console.log("User Password:", userPassword);

  // Check if the name and email follow regex validation rules
  const isValidName = await checkName(userName);
  if (!isValidName) {
    return;
  }

  const isValidEmail = await checkEmail(userEmail);
  if (!isValidEmail) {
    return;
  }

  // Check the length of the password
  const isValidPassword = await checkPassword(userPassword);
  console.log("isValidPassword:", isValidPassword); // Debugging statement
  if (!isValidPassword) {
    return;
  }

  console.log("All validations passed. Registering user...");

  // Make a call to register the new user immediately
  registerUser(userName, userEmail, userPassword);
};

// Get the sign-up button element
const signUpBtn = document.getElementById("signupSubmit");

// Add an event listener to the sign-up button to trigger the signUp function
if (signUpBtn) {
  signUpBtn.addEventListener("click", signUp);
}

/*
  The below code adds logic for regex rules to check against user input
*/

// Check name against regex
async function regexCheck(input, regex) {
  const checker = regex.test(input);
  return checker;
}



async function validateInput(input, maxLength, errorMessage, inputType) {
  console.log(`${inputType}:`, input); // Debugging statement
  console.log(`${inputType} length:`, input.length);

  if (input.length > maxLength) {
    console.log(errorMessage);
    return false;
  }
  return true;
}




// Checks the validity of name
async function checkName(name) {
  const nameRegex = /^[\w'\-,.][^\d_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const isValidRegex = await regexCheck(name, nameRegex);
  const isValidLength = await validateInput(
    name,
    15,
    "Username is too long! Your username is over 15 characters. Please use a different name :)",
    "User Name"
  );
  return isValidRegex && isValidLength;
}


// Checks the validity of email
async function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidRegex = await regexCheck(email, emailRegex);
  return isValidRegex;
}

async function checkPassword(password) {
  console.log("Password:", password); // Debugging statement
  console.log("Password length:", password.length);
  const isValidLength = await validateInput(
    password,
    8,
    "Password must have a minimum of 8 characters",
    "Password"
  );
  return isValidLength;
}



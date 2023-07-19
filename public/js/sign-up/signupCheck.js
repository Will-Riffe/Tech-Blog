


// Func corresponding w/ sign-up button
const signUp = async (event) => {
    event.preventDefault();
  
    // Retrieve values from sign-up form
    const userName = document.querySelector(".userName-signup").value;
    const userEmail = document.querySelector(".email-signup").value;
    const userPassword = document.querySelector(".password-signup").value;
  
    // We check if all fields are filled...
    if (userName === "") {
        alert("Empty User Name, fill it out...");
        return;
      } else if (userEmail === "") {
        alert("Fill out your Email...");
        return;
      } else if (userPassword === "") {
        alert("Set your password...");
        return;
      }
      
  
    // Check if the name and email follow regex validation rules
    const regexValidName = await regexCheckName(userName);
    const regexValidEmail = await regexCheckEmail(userEmail);
  
    if (!regexValidName) {
        alert("Invalid User Name— Avoid special characters.");
        return;
      }
      
      if (!regexValidEmail) {
        alert("Invalid Email Format");
        return;
      }
      
    // Check the length of the name
    const isValidName = await checkName(userName);
    if (!isValidName) {
      return;
    }
  
    // Check the length of the password
    const isValidLength = await checkPassword(userPassword);
    if (!isValidLength) {
      return;
    }
  

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



  // Check name/email against regex
async function regexCheck(input, regex) {
    const checker = regex.test(input);
    return checker;
  }
  
  // Validation for name/email inputs
  async function validateInput(input, maxLength, errorMessage) {
    if (input.length > maxLength) {
      console.log(errorMessage);
      return false;
    }
    return true;
  }
  
  // Checks the validity of input lengths, format
  async function checkName(name) {
    const nameRegex = /^[\w'\-,.][^\d_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const isValidRegex = await regexCheck(name, nameRegex);
    const isValidLength = await validateInput(
      name,
      15,
      "Username is too long! Your username is over 15 characters. Please use a different name :)"
    );
    return isValidRegex && isValidLength;
  }
  
  async function checkPassword(password) {
    const isValidLength = await validateInput(
      password,
      8,
      "Password must have a minimum of 8 characters"
    );
    return isValidLength;
  }
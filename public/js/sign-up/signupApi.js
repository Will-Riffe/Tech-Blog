// Registers the user to the API endpoint
async function registerUser(name, email, password) {
  try {
    console.log("Registering user:", name, email, password);

    // Make the API call to register the user
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Convert user data to JSON
      body: JSON.stringify({ 
          name: name, 
          email: email, 
          password: password 
      }), 
    });

    // Parse the response as JSON
    const data = await response.json();

    console.log("API response:", data);

    // Check if the email is already in use
    if (data.message === "Issue with credentials") {
      // Display an error alert if the email is not unique
      showErrorAlert("Issue with credentials");
      return;
    }

    // Show success alert if registration is successful
    showSuccessAlert("User Registered!");

    // Redirect to a success page
    window.document.location.href = "/sign-up/success";
  } catch (err) {
    // Log any errors that occurred during the API call
    console.error("API error:", err);

    // Show an error message to the user
    showErrorAlert("Oops! Something went wrong. Please try again later.");
  }
}

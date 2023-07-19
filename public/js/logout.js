

// Logout Function
const logoutFunc = async () => {
    try {
      // POST request to log out user 
      await fetch("/api/user/logout", {
        method: "POST"
      });
  
      // Success = Redirect to homepage
      window.document.location.href = "/";
    } catch (err) {
      // Logout error Log
      console.error("Logout failed:", err);
    }
  };
  
  // Get the logout button element by its ID
  const logoutBtn = document.getElementById("logout-link");
  
  // Check if the logout button exists in the DOM
  if (logoutBtn) {
    // Add a click event listener to the logout button
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default behavior of the click event
      logoutFunc(); // Initiate logout
    });
  }
  
const userEmailEl = document.querySelector('#userEmail');

// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const email = user.email;
      userEmailEl.innerHTML = email;
      
     
  
    } 
    else {
      // No user is signed in.
      window.location = "./auth.html";
      }
  });
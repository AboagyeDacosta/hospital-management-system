
const userName = document.querySelector('#uname');
const user_Name = document.querySelector('#user-name');
const logoutBtn = document.querySelector('#logoutBtn');

const profile = document.querySelector('#Profile');


// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  

      userName.innerHTML = user.displayName;
      user_Name.innerHTML = user.displayName;
      logoutBtn.style.display = "block";
      profile.style.display = "block";
      
     
  
    } else {
      // No user is signed in.
     
  
      userName.style.display = "block";
      user_Name.style.display = "block";
      logoutBtn.style.display = "none";
      profile.style.display = "none";
      

      
    }
  });



  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = "./auth.html";
    }).catch(function(error) {
      // An error happened.
    });
  });
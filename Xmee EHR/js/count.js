firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        
  
          // Listen for changes to the current user's cart in the database
          let cartRef = firebase.database().ref(`users/${user.uid}/patients/`);
          cartRef.on("value", function(snapshot) {
              var patientCount = snapshot.numChildren();
            
              // Display the number of items in the cart
              document.getElementById("num-patient").textContent = patientCount;
              document.getElementById("count").textContent = patientCount;
            });

    
    }
  });
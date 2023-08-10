// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
            // Retrieve the id from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
 
      const userId = firebase.auth().currentUser.uid;
      const userRef = database.ref(`users/${userId}/patients/${id}`);
  
        // Get the current user's ID

      


      // Listen for changes to the patient's data
      userRef.on('value', (snapshot) => {
        const patientData = snapshot.val();
        if (patientData) {
          // Populate the details on the page
          document.getElementById('name').textContent = patientData.name;
          document.getElementById('email').textContent = patientData.email;
          document.getElementById('contact').textContent = patientData.number;
          document.getElementById('image').src = patientData.image;
          document.getElementById('address').textContent = patientData.address;
          document.getElementById('gender').textContent = patientData.gender;
          document.getElementById('age').textContent = patientData.age;
          document.getElementById('prescription').textContent = patientData.prescription;
          document.getElementById('result').textContent = patientData.result;
          document.getElementById('symptoms').textContent = patientData.symptoms;
          document.getElementById('diagnosis').src = patientData.diagnosis;
          document.getElementById('glucose').textContent = patientData.glucose;
          document.getElementById('h-rate').textContent = patientData.h_rate;
          document.getElementById('cholesterol').textContent = patientData.cholesterol;
      
        }
      });
  
     
    } else {
      // No user is signed in.
     
      window.location.replace("auth.html");
      
      
      
    }
  });

   
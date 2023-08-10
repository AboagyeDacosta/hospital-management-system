





// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
       // Reference to the current user's data node
       const userId = firebase.auth().currentUser.uid;
       const userRef = database.ref(`users/${userId}/patients`);
  
        // Reference to the form element
        const form = document.querySelector('#add-patients');
  
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = form.querySelector('#name').value;
          const number = form.querySelector('#number').value;
          const email = form.querySelector('#email').value;
          const address = form.querySelector('#address').value;
          const age = form.querySelector('#age').value;
          const gender = form.querySelector('#gender').value;
          const prescription = form.querySelector('#prescription').value;
          const result = form.querySelector('#result').value;
          const symptoms = form.querySelector('#symptoms').value;
          const glucose = form.querySelector('#glucose').value;
          const h_rate = form.querySelector('#h-rate').value;
          const cholesterol = form.querySelector('#cholesterol').value;
          const diagnosis = form.querySelector('#diagnosis').value;
          const image = form.querySelector('#image').files[0];
  
           // Create a new product object
           const user = {
              name: name,
              number: number,
              email: email,
              address: address,
              age: age,
              gender: gender,
              prescription: prescription,
              result: result,
              symptoms: symptoms,
              glucose: glucose,
              h_rate: h_rate,
              cholesterol: cholesterol,
              diagnosis:diagnosis,
              image :image
            };
  
     // Upload the image to firebase storage
     const storageRef = firebase.storage().ref();
     const imageRef = storageRef.child(`Name/${name}`);
     const uploadTask = imageRef.put(image);
     uploadTask.on(
       "state_changed",
       snapshot => {},
       error => {
         console.log(error);
       },
       async () => {
         // Get the image URL
         const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
  
         // Add the image URL to the product object
         user.image = imageURL;
  
         // Push the product to the sub-node
         userRef.push(user);

         Swal.fire('Patient Added')
  
         // Clear the form fields
         form.querySelector('#address').value = '';
         form.querySelector('#name').value = '';
         form.querySelector('#image').value = '';
         form.querySelector('#age').value = '';
         form.querySelector('#gender').value = '';
         form.querySelector('#email').value = '';
         form.querySelector('#prescription').value = '';
         form.querySelector('#result').value = '';
         form.querySelector('#symptoms').value = '';
         form.querySelector('#diagnosis').value = '';
         form.querySelector('#glucose').value = '';
         form.querySelector('#h-rate').value = '';
         form.querySelector('#cholesterol').value = '';
         form.querySelector('#number').value = '';
       }
     );
   }
   
   );
      
     
  
    
      
  
     
    } else {
      // No user is signed in.
     
      window.location.replace("auth.html");
      
      
    }
  });
  
  
  
// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    

    const userId = firebase.auth().currentUser.uid;
    const userRef = database.ref(`users/${userId}/patients`);

    // Listen for changes to the user's data node
userRef.on('value', (snapshot) => {
  // Clear the table body

  var patientCount = snapshot.numChildren();
  let male = 0;
  let female = 0;
  let adult = 0;
  let children = 0;




  // Loop through the data
  snapshot.forEach((childSnapshot) => {
    // Get the child data
    const childData = childSnapshot.val();

    if (childData.gender=='Male' ) {
      male++;
      } 
      else if(childData.gender=='Female' )  {
          female++;
      }

       if(childData.age < 18)  {
        children++;
       }
    else if(childData.age >= 18 )  {
      adult++;
      }
      
    let p =  document.getElementById('num--patient').value = patientCount;
    let m =  document.getElementById('num-male').value = male;
    let f =  document.getElementById('num-female').value = female;
    let a =  document.getElementById('num-adult').value = adult;
    let c =  document.getElementById('num-children').value = children;



      
    document.getElementById('patient').innerHTML = p
    document.getElementById('male').innerHTML = m
    document.getElementById('female').innerHTML = f
    document.getElementById('adult').innerHTML = a
    document.getElementById('children').innerHTML = c
      

      



     // Define a function that reads the updated values

  
  
  
      
     


       
});

function readUpdatedValues() {
 
      // Get the canvas element
      var ctx = document.getElementById('myChart').getContext('2d');



      // Check if there is an existing Chart instance
      if (typeof myChart !== 'undefined') {
        // Destroy the previous Chart instance
        myChart.destroy();
      }
      
      // Create a new Chart instance
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total Patients', 'Females', 'Males', 'Children', 'Adults'],
            datasets: [{
              label: 'Patient Count',
              data: [patientCount, female,male, children,adult],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(80, 192, 192, 0.2)',
                'rgba(255, 100, 13, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(80, 192, 192, 1)',
                'rgba(57, 180, 265, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });









   
}

// Call the function when the page is loaded
readUpdatedValues()





});

   
  } else {
    // No user is signed in.
   
    window.location.replace("login.html");
    
    
    
  }
});


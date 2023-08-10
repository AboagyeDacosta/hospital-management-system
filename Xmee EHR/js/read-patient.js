// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      const tableBody = document.querySelector('#product-table-body');
      const userId = firebase.auth().currentUser.uid;
      const userRef = database.ref(`users/${userId}/patients`);
  
      // Listen for changes to the user's data node
  userRef.on('value', (snapshot) => {
    // Clear the table body
    tableBody.innerHTML = '';
 
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
  
        document.getElementById('num-male').innerHTML = male;
        document.getElementById('num-female').innerHTML = female;
        document.getElementById('num-adult').innerHTML = adult;
        document.getElementById('num-children').innerHTML = children;
  
      // Create a new table row
      const row = document.createElement('tr');
  
      // Add the name cell
      const nameCell = document.createElement('td');
      
      nameCell.innerText = childData.name;
      row.appendChild(nameCell);

      
  
      // Add the email cell
      const emailCell = document.createElement('td');
      emailCell.innerText = childData.email;
      row.appendChild(emailCell);
  
      // Add the contact cell
      const contactCell = document.createElement('td');
      contactCell.innerText = childData.number;
      row.appendChild(contactCell);
  
      // Add the image cell
      const imageCell = document.createElement('td');
      imageCell.setAttribute("width", "10px", "height", "100px");
      imageCell.classList.add('w3-responsive', );
      const image = document.createElement('img');
      image.setAttribute("width", "50px", "height", "100px");
      image.classList.add('w3-responsive', );
      image.src = childData.image;
      imageCell.appendChild(image);
      row.appendChild(imageCell);
  
      // Add the address cell
      const addressCell = document.createElement('td');
      addressCell.innerText = childData.address;
      row.appendChild(addressCell);
  
      // Add the gender cell
      const genderCell = document.createElement('td');
      genderCell.innerText = childData.gender;
      row.appendChild(genderCell);

      // Add the age cell
      const ageCell = document.createElement('td');
      ageCell.innerText = childData.age;
      row.appendChild(ageCell);
  
      // Add the delete cell
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'w3-red');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Remove the item from the database
        userRef.child(childSnapshot.key).remove();
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

          
  
     
       // Add the view cell
       const viewCell = document.createElement('td');
       const viewButton = document.createElement('button');
       viewButton.classList.add('btn', 'w3-blue');
       viewButton.innerText = 'View';
       viewButton.addEventListener('click', () => {
         // Open a new page to show the details of the row's data
         window.open(`view-details.html?id=${childSnapshot.key}`);
       });
       viewCell.appendChild(viewButton);
       row.appendChild(viewCell);
  
  
      // Append the row to the table body
      tableBody.appendChild(row);
    });
  });
      
  // Search input element
const searchInput = document.querySelector('#search-input');

// Listen for input events on the search input
searchInput.addEventListener('input', (event) => {
  const searchText = event.target.value.toLowerCase();

  // Loop through each row in the table body
  tableBody.childNodes.forEach((row) => {
    // Get the product name cell
    const nameCell = row.childNodes[0];

    // Check if the product name contains the search text
    if (nameCell.innerText.toLowerCase().includes(searchText)) {
      // Show the row
      row.style.display = '';
    } else {
      // Hide the row
      row.style.display = 'none';
    }
  });
});
  
     
    } else {
      // No user is signed in.
     
      window.location.replace("login.html");
      
      
      
    }
  });
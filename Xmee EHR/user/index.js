const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  searchForUser(name, email);
});


function searchForUser(name, email) {
    const tableBody = document.querySelector('#product-table-body');
    const userId = firebase.auth().currentUser.uid;
    const userRef = database.ref(`users/${userId}/patients`);
  
    userRef
      .orderByChild('name')
      .equalTo(name)
      .once('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          alert('User not found');
          return;
        }
        const user = Object.values(data).find((user) => user.email === email);
        if (!user) {
          alert('User not found');
          return;
        }
        // Clear the table body
        tableBody.innerHTML = '';
        // Render the user's data
        // ...
      });
  }
  
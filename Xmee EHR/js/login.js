// Login an existing user
function Login() {
    var email = document.getElementById("email-h").value;
    var password = document.getElementById("password-h").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
        // Login successful.
       
            // Redirect to home page?

            // similar behavior as clicking on a link
            window.location.href = "dashboard.html";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
    });
}
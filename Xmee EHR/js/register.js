function Register() {
    var email = document.getElementById("h-email").value;
    var password = document.getElementById("h-password").value;
    var hname = document.getElementById("h-name").value;
   
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
        alert("User created: ", user);
        
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: hname,
           
            
        }).then(function() {
            // Update successful.
            var userId = user.uid;
            firebase.database().ref('users/' + userId ).set({
                hname: hname,
                email: email,
                
                
            });
           

            // similar behavior as clicking on a link
            window.location.href = "dashboard.html";



        }).catch(function(error) {
            // An error happened.
            alert(error.message);
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
    });
}
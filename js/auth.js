document.addEventListener("DOMContentLoaded", function(event) { 
    
    
});
function loadjs(){
    if(!document.getElementById("placesapiscript")){
            
        firebase.database().ref("/").child("APIKEY").once('value').then((snapshot) => {

            snapshot.forEach((child)=>{
                console.log(child.key);
                console.log(child.val());
                let placesapi = document.createElement("script");
                placesapi.setAttribute("id","placesapiscript");
                placesapi.setAttribute("src",child.val());
                document.head.appendChild(placesapi);
            });
            // ...
          }).catch((error)=>{
              console.log(error);
          }).finally(()=>{
              
          });
    }
}
function signout(){
    firebase.auth().signOut().then(() => {
        console.log('signed out');
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.log('error signing out');
      }).finally((e)=>{
        attemptwrite();
      });
      
}
function signin(){
    
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
     });
    firebase.auth().signInWithPopup(provider)
    .then(result => {

        var token = result.credential.accessToken

        var user = result.user

        attemptwrite();
    })
    .catch(error => {
        console.log("auth error")

        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;

        var credential = error.credential;
        console.log("error code: " + errorCode);
        console.log(errorMessage);

    })
}
function attemptwrite(){
    clearalltabs();
    firebase.database().ref("/").child("writeattempt").set({
        access:Date.now()
        /*
        <button id="signinbutton">Sign in</button>
        <button id="writedbbutton">write</button>
        <button id="signoutbutton">Sign out</button>
        */
       
    }).then((result)=>{
        

        let parent = document.getElementById("Login");
        let bsignout = document.createElement("button");
        bsignout.setAttribute("id","bsignout");
        bsignout.innerText = "Sign Out";
        parent.appendChild(bsignout);
        bsignout.addEventListener("click", signout);
    }).catch((error)=>{
        let parent = document.getElementById("Login");
        let bsignin = document.createElement("button");
        bsignin.setAttribute("id","bsignin");
        bsignin.innerText = "Sign In";
        parent.appendChild(bsignin);
        bsignin.addEventListener("click", signin);

    });
    
}
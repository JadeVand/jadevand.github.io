function restorefromremotedb(){
    firebase.database().ref("/").child("devices").child("ALAMTESTDEVICEID").once('value').then((snapshot) => {

        snapshot.forEach((child)=>{
            console.log(child.key);
            console.log(child.val());
            localStorage.setItem(child.key,JSON.stringify(child.val()));
        });
        // ...
      }).catch((error)=>{
          console.log(error);
      }).finally(()=>{
          console.log("finally");
          clearalltabs();
      });


}
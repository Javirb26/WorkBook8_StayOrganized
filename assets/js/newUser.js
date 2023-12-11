window.onload = ()=>{
    
    let userForm = document.getElementById("user-form");

    userForm.onsubmit = (event) => {
        event.preventDefault();

        let nameInputEl = document.getElementById("name").value;
        let userNameInputEl = document.getElementById("user-name").value;
        let password = document.getElementById("password").value;
    let currentFormData = {
        name: nameInputEl,
        username: userNameInputEl,
        password: password
    };
    console.log(currentFormData);
    fetch("http://localhost:8083/api/users", {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(currentFormData),
    })
    .then((res)=> {
        if (res.ok) {
            res.json()
        } 
    })
      .then((data)=>{
        console.log(data);
        location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here, e.g., display an error message to the user
    });

    };

}

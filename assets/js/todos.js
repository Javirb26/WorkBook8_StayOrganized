// Tasks:- FETCH (GET) Display users todo tasks
/* 
div container
select element / dropdown
    - contains all Users Names
        - text of option is user's NAME
        - value of option is user's ID(we need ID to get the todo tasks)

    - onchange / selecting specific user get their todo tasks


*/

window.onload = () => {
   populateAllUsers();
}

 // grab div container and select el
 const divContainer = document.getElementById('todo-container');
 const selectEl = document.getElementById('user-select');
 const apiLink = 'http://localhost:8083/api/users';

//  Populate Select Element options and add Todos of users on click
let populateAllUsers = () => {
    
    selectEl.onchange = () => {

    }

    // Fetch(GET) all Users
    fetch(apiLink)
        .then((res) => res.json())
        .then((allUserDetails) => {
            // store all users during session and stringify JSON to be usable
            sessionStorage.userDetailList = JSON.stringify(allUserDetails)
            // call loadUserSelect to populate Select Element
            loadUserSelect(allUserDetails);
        }) .catch((err) => console.error(err))
}


// populate Select element with name of each user and value of ID
let loadUserSelect = (arrayOfUsers) => {
    arrayOfUsers.forEach((userDetail)=> {
        let option = document.createElement('option');
        option.value = userDetail.id;
        option.textContent = userDetail.name;
        selectEl.appendChild(option);
    })
}
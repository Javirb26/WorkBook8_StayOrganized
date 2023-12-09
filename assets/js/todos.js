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
 const apiUserLink = 'http://localhost:8083/api/users';
 const apiTodoIdLink = 'http://localhost:8083/api/todos/byuser'

//  Populate Select Element options and add Todos of users on click
let populateAllUsers = () => {

        // When you select an option display the selected users todo tasks
        selectEl.onchange = () => {
            let selectedUser = selectEl.value;
            console.log(selectedUser)
            fetch(`${apiTodoIdLink}/${selectedUser}`)
            .then((res)=>res.json())
            .then((allTaskDetails)=>{
                console.log(allTaskDetails);
                
                allTaskDetails.forEach((taskDetail)=> {
                    let task = document.createElement('div');
                    
                    console.log(taskDetail.description);
                    task.innerHTML = `
                        <div>
                            <h3>Task: ${taskDetail.description}</h3>
                            <h3>Category: ${taskDetail.category}</h3>
                            <h3>Priority: ${taskDetail.priority}</h3>
                            <h3>Deadline by: ${taskDetail.deadline}</h3>
                            <h3>Completed Status: ${taskDetail.completed}</h3>
                        </div>
                    `;
                    divContainer.appendChild(task);
                    
                })
                
            })
    
    }

    // Fetch(GET) all Users
    fetch(apiUserLink)
        .then((res) => res.json())
        .then((allUserDetails) => {
            // store all users during session and stringify JSON to be usable
            sessionStorage.userNameList = JSON.stringify(allUserDetails)
            // call loadUserSelect to populate Select Element
            loadUserSelect(allUserDetails);
        }) .catch((err) => console.error(err))
}


// populate Select element with name of each user and value of ID
let loadUserSelect = (arrayOfUsers) => {
    // appending default option to select element
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select User';
    defaultOption.selected = true;
    selectEl.appendChild(defaultOption);

    
    
    // loop through array of users and append user names to select element
    arrayOfUsers.forEach((userDetail)=> {
        let option = document.createElement('option');
        option.value = userDetail.id;
        option.textContent = userDetail.name;
        selectEl.appendChild(option);
        
    })

    
    
}


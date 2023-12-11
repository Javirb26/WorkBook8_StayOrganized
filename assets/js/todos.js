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
   populateSelectedUsers();

   // View all users again after selecting specific user   
   const viewAllBtn = document.getElementById('view-all-btn');
   viewAllBtn.onclick = populateAllUsers;

}

 // grab div container and select el
 const divContainer = document.getElementById('todo-container');
 const selectEl = document.getElementById('user-select');
 const apiUserLink = 'http://localhost:8083/api/users';
 const apiTodoIdLink = 'http://localhost:8083/api/todos/byuser'
 const apiLoadTodosLink = 'http://localhost:8083/api/todos'

 const userImages = {
    1: 'assets/images/study_todo.png',
    2: 'assets/images/temu_shrek.png',
    3: 'assets/images/v_bucks.png',
    4: 'assets/images/dog_bath.png',
    5: 'assets/images/office_supplies.png',
    6: 'assets/images/war_peace.png',
    7: 'assets/images/folded_laundry.png',
    8: 'assets/images/v_bucks.png',
    9: 'assets/images/goat_haul.png',
    10: 'assets/images/broken_swing.png',
    11: 'assets/images/painting_fence.png',
    12: 'assets/images/re_landscape.png',
    13: 'assets/images/temu_tiktok_shrek.png',
    14: 'assets/images/airport.png',
};


//  Populate Select Element options and add Todos of users on click
let populateSelectedUsers = () => {

        // When you select an option display the selected users todo tasks
        selectEl.onchange = () => {
            divContainer.innerHTML='';
            let selectedUser = selectEl.value;
            
            fetch(`${apiTodoIdLink}/${selectedUser}`)
            .then((res)=>res.json())
            .then((allTaskDetails)=>{
                // if there is no task then display error message
                if(allTaskDetails.length === 0){
                    divContainer.innerHTML = '<p class="fs-2 fw-bold text-center text-robinEggBlue">No Task(s) Here</p>'
                }
                
                allTaskDetails.forEach((taskDetail)=> {
                    console.log(taskDetail)
                    console.log(taskDetail.id)
                    let task = document.createElement('div');
                    task.classList.add('col-md-4', 'col-lg-3')
                    
                        task.innerHTML = `
                    <div class='card h-100'>
                        <img src='${userImages[taskDetail.id]}' class="card-img-top" alt='image #${taskDetail.id}'>
                        <div class="card-body" >
                            <h3 class="card-title text-outerSpace">Task: ${taskDetail.description}</h3>
                            <p class="card-text text-outerSpace">Category: <span class="fw-bold text-outerSpace">${taskDetail.category}</span></p>
                            <p class="card-text text-outerSpace">Priority: ${taskDetail.priority}</p>
                            <p class="card-text text-robinEggBlue">Deadline by: <span class="fw-bold">${taskDetail.deadline}</span></p>
                            <p class="card-text text-outerSpace">Completed Status: ${taskDetail.completed}</p>
                        </div>
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

let populateAllUsers = () => {
    divContainer.innerHTML='';
    fetch(apiLoadTodosLink)
        .then((res)=>res.json())
        .then((allTodoDetails)=>{
            console.log(allTodoDetails);
            allTodoDetails.forEach((todoDetail)=>{
                console.log(todoDetail);
                let todo = document.createElement('div');
                todo.classList.add('col-md-4', 'col-lg-3');
                todo.innerHTML = `
                    <div class='card h-100'>
                        <img src='${userImages[todoDetail.id]}' alt=''>
                        <div class='card-body'>
                            <h3 class="card-title">Task: ${todoDetail.description}</h3>
                            <p class="card-text">Category: <span class="fw-bold text-outerSpace">${todoDetail.category}</span></p>
                            <p class="card-text">Priority: ${todoDetail.priority}</p>
                            <p class="card-text text-robinEggBlue">Deadline by: ${todoDetail.deadline}</p>
                            <p class="card-text">Completed Status: ${todoDetail.completed}</p>
                        </div>
                    </div>
                `;
                divContainer.appendChild(todo)
            })
        })
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


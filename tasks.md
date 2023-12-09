### API LINKS: 
api links:

all catergories of Todos:

http://localhost:8083/api/categories

get all ToDos:

http://localhost:8083/api/todos

Get Specific Todo by ID

http://localhost:8083/api/todos/${id}

Get all users (excluding passwords)

http://localhost:8083/api/users

Get Todos for SPECFIC USER (ID is id of user)

http://localhost:8083/api/todos/byuser/${id}

### Tasks:

# Create ${index.html}: Home page that highlights “Stay Organized” website

- create simple html page

# Create ${todos.html} a page that allows user to view all ToDos

- display all todo tasks

# Create a ${new_todo.html}

- add new todo task for user selected
    - 3 dropdowns:
        - userName w/ id in value
        - categoryName fetched from api/categories
        - urgency of Task: hard-code: “low”, “medium”, or “High”
    - text area to enter description of ToDo
    - Deadline (input type=”text”) use YYYY-MM-DD but do not require it via code
- when user clicks ADD button, send POST to api/todos. POST request must send form-data and key name musy exactly match:
    - userID
    - category
    - description
    - deadline
    - priority
    
    NO ID or Completed values bc they’ll be auto generated

# Create a ${new_user.html}

- collect 3 pieces of information from user
    - name
    - username
    - password
- EX of backend data:
    
     {
    
    “id” :1,
    
    “name”: “Ian Auston”,
    
    “username”: “gamer04”,
    
    “password”: “gamer04!”
    
    }

    To add a user, send POST request to "api/users". 
    The field names for the user data must match what is shown above EXCEPT you will not send an id. It will be auto-generated.



BONUS: 

- PUT - not easy bc NOT RESTFUL
- getOneTodo.html and JS
- check box / mark todo task
- Provide the ADD a new user feature
- UserDropDown filter by user id
window.onload = () => {
  let formContainerEl = document.getElementById("formContainer");
  let userDropdownEl = document.getElementById("userDropdown");
  let userIDEl = document.getElementById("userID");
  let categoryDropdownEl = document.getElementById("categoryDropdown");
  let descContainerEl = document.getElementById("descContainer");
  let deadlineEl = document.getElementById("deadlineObj");
  let taskDropdownEl = document.getElementById("taskDropdown");
  fetch("http://localhost:8083/api/users")
    .then((res) => res.json())
    .then((users) => {
      users.forEach((user) => {
        // Select User
        let userOption = document.createElement("option");
        userOption.value = `${user.id}`;
        userOption.text = `${user.name}`;
        userDropdownEl.appendChild(userOption);
        // User ID
        userDropdownEl.addEventListener("change", () => {
          let selectedIndex = userDropdownEl.selectedIndex;
          userIDEl.textContent = `User ID: ${selectedIndex}`;
          console.log("Selected User ID:", selectedIndex);
        });
      });
      fetch("http://localhost:8083/api/categories")
        .then((res) => res.json())
        .then((categories) => {
          categories.forEach((category) => {
            // Select Category
            let categoryOption = document.createElement("option");
            categoryOption.value = `${category.id}`;
            categoryOption.text = `${category.name}`;
            categoryDropdownEl.appendChild(categoryOption);
          });
        });
    });
  formContainerEl.onsubmit = (e) => {
    e.preventDefault();
    let formData = {
        userid: 1,
      category: categoryDropdownEl.value,
      description: descContainerEl.value,
      deadline: deadlineEl.value,
      priority: taskDropdownEl.value,
    };
    fetch("http://localhost:8083/api/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify( formData ),
    })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
      })
      .then((data) => {
        console.log("Data:", data)
        location.href = "todos.html";
      })
      .catch((error) => {
        console.error("Fetch Error", error);
      });
  };
};













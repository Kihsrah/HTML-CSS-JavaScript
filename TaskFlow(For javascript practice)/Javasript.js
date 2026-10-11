let tasks = [];
document.querySelector("#taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let temp = document.querySelector("#taskInput").value; 
    if(temp.trim() == "") {
        alert("Enter a char");
        return;
    }
    document.querySelector("#taskInput").value = "";

    let newTask = {
        text: temp,
        completed: false
    };

    tasks.push(newTask);
    console.log(tasks);
    renderTasks();
})


function renderTasks () {
    document.querySelector("#taskList").innerHTML = "";

    for (let i = 0; i < tasks.length ; i++) {
        
        let listElement = document.createElement("li");
        let addButton = document.createElement("button");
        let addDeleteButton = document.createElement("button");
        let newSpan = document.createElement("span");
        newSpan.classList.add("task-text");
        addDeleteButton.textContent = "Delete";
        listElement.classList.add("task-item");

        if (tasks[i].completed == true) {
            addButton.textContent = "Undo";
            listElement.classList.add("completed");
        }
        else {
            addButton.textContent = "Complete";
        }

        listElement.append(newSpan);
        newSpan.textContent = tasks[i].text;
        listElement.append(addButton);
        listElement.append(addDeleteButton);
        document.querySelector("#taskList").append(listElement);
        listElement.classList.add("task-item")
        
        addButton.addEventListener("click", function () {

            completeTask(i);
            
        })

        addDeleteButton.addEventListener("click", function () {
            deleteTask(i);
        })

    }
}

function completeTask (index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask (index) {
    tasks.splice(index , 1);
    renderTasks();
}


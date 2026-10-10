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

        if (tasks[i].completed == true) {
            addButton.textContent = "Undo";
        }
        else {
            addButton.textContent = "Complete";
        }

        
        listElement.textContent = tasks[i].text;
        listElement.append(addButton);
        document.querySelector("#taskList").append(listElement);
        
        addButton.addEventListener("click", function () {
            if(tasks[i].completed == true) {
                this.textContent = "Undo";
            }
            else {
                this.textContent = "Complete";
            }


            completeTask(i);
        })

    }
}

function completeTask (index) {
    tasks[index].completed = !tasks[index].completed;
}

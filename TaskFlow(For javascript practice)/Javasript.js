let tasks = [];
let currentFilter = "all";
let chars = "";
let Total = 0;
let TotalPending = 0;
let TotalCompleted = 0;
document.querySelector("#taskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let temp = document.querySelector("#taskInput").value;
    if (temp.trim() == "") {
        alert("Enter a char");
        return;
    }
    document.querySelector("#taskInput").value = "";

    let newTask = {
        text: temp,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
})


function renderTasks(array = tasks) {
    document.querySelector("#taskList").innerHTML = "";
    Total = tasks.length;
        TotalCompleted = tasks.filter(item => {
            return item.completed == true;
        }).length;
        TotalPending = tasks.filter(item => {
            return item.completed == false;
        }).length;
        document.querySelector("#totalCount").textContent = Total;
        document.querySelector("#pendingCount").textContent = TotalPending;
        document.querySelector("#completedCount").textContent = TotalCompleted;
        if(array.length != 0) {
            document.querySelector("#emptyMessage").textContent = "";
        }
        else {
            document.querySelector("#emptyMessage").textContent = "No task task to display !";
        }

    for (let i = 0; i < array.length; i++) {

        let listElement = document.createElement("li");
        let addButton = document.createElement("button");
        let addDeleteButton = document.createElement("button");
        let newSpan = document.createElement("span");

        addDeleteButton.classList.add("delete-btn");

        let currentTaskText;
        let currentTaskCompleted;
        if (array == tasks) {
            currentTaskText = array[i].text;
            currentTaskCompleted = array[i].completed;
        }
        else {
            currentTaskText = array[i].sentence.text;
            currentTaskCompleted = array[i].sentence.completed;
        }


        newSpan.classList.add("task-text");
        addDeleteButton.textContent = "Delete";
        listElement.classList.add("task-item");

        if (currentTaskCompleted == true) {
            addButton.textContent = "Undo";
            listElement.classList.add("completed");
            addButton.classList.add("undo-btn");
        }
        else {
            addButton.textContent = "Complete";
            addButton.classList.add("complete-btn");
        }



        listElement.append(newSpan);
        newSpan.textContent = currentTaskText;
        console.log(currentTaskText);
        listElement.append(addButton);
        listElement.append(addDeleteButton);
        document.querySelector("#taskList").append(listElement);
        listElement.classList.add("task-item");


        addButton.addEventListener("click", function () {

            if (array == tasks) {
                completeTask(i);
            }
            else {
                completeTask(array[i].originalIndex);
            }

        })

        addDeleteButton.addEventListener("click", function () {
            if (array == tasks) {
                deleteTask(i);
            }
            else {
                deleteTask(array[i].originalIndex);
            }
        })
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

document.querySelector("#searchInput").addEventListener("input", function () {
    chars = this.value.toLowerCase();

    renderFilteredTasks();
})


function filterButtons(word) {

    if (word == "all") {
        renderTasks();
    }
    else if (word == "pending") {
        let filteredTasks = tasks.map((task, index) => {
            return {
                sentence: task,
                originalIndex: index
            };
        })

        let final = filteredTasks.filter(item => {
            return item.sentence.completed == false;
        })

        renderTasks(final);
    }
    else {
        let filteredTasks = tasks.map((task, index) => {
            return {
                sentence: task,
                originalIndex: index
            }
        })

        let final = filteredTasks.filter(item => {
            return item.sentence.completed == true;
        })
        
        renderTasks(final);
    }
}


document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;
        renderFilteredTasks();
    })
})

function renderFilteredTasks() {
    let final;
    let filteredTasks = tasks.map((task, index) => {
        return {
            sentence: task,
            originalIndex: index
        };
    })

    if (currentFilter == "pending") {
        final = filteredTasks.filter(item => {
            return item.sentence.text.toLowerCase().includes(chars) &&
                item.sentence.completed == false;
        });
    }
    if(currentFilter == "completed") {
        final = filteredTasks.filter(item => {
            return item.sentence.text.toLowerCase().includes(chars) &&
            item.sentence.completed == true;
        });
    }
    if(currentFilter == "all") {
        final = filteredTasks.filter(item => {
            return item.sentence.text.toLowerCase().includes(chars);
        })
    }
    
    renderTasks(final);
}


document.querySelector("#clearCompletedBtn").addEventListener("click", function() {
    for(let i = tasks.length - 1; i >= 0; i--) {
        if(tasks[i].completed == true) {
            tasks.splice(i,1);
        }
    }
    renderTasks();
})
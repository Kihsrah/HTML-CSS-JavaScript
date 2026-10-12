let tasks = [];
let currentFilter = "all";
let chars = "";
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

    for (let i = 0; i < array.length; i++) {

        let listElement = document.createElement("li");
        let addButton = document.createElement("button");
        let addDeleteButton = document.createElement("button");
        let newSpan = document.createElement("span");

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
        }
        else {
            addButton.textContent = "Complete";
        }



        listElement.append(newSpan);
        newSpan.textContent = currentTaskText;
        console.log(currentTaskText);
        listElement.append(addButton);
        listElement.append(addDeleteButton);
        document.querySelector("#taskList").append(listElement);
        listElement.classList.add("task-item")

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
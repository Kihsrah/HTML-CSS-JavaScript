let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chars = "";
let totalSpent = 0;
let percentage;

renderExpenses();

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

document.querySelector("#addExpenseBtn").addEventListener("click", function (event) {
    event.preventDefault();

    //Variable declaration:
    let descText = document.querySelector("#description").value;
    let amount = Number(document.querySelector("#amount").value);
    let category = document.querySelector("#category").value;
    let date = document.querySelector("#date").value;

    //Invalid input chekers:
    if (descText.trim() == "") {
        alert("Enter a valid input");
        return;
    }

    if (amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    //Input reset:
    document.querySelector("#description").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#date").value = "";

    //object creation:
    let expense = {
        DESCTEXT: descText,
        AMOUNT: amount,
        CATEGORY: category,
        DATE: date
    }

    expenses.push(expense);
    saveExpenses();
    renderExpenses(expenses);
})


//rendering function:
function renderExpenses(array = expenses) {

    //Changing html for the RECENT TRANSACTION section:
    document.querySelector("#transactionList").innerHTML = "";

    //variable declaration:

    let transactionCount = expenses.length;

    for (let i = 0; i < expenses.length; i++) {
        totalSpent += expenses[i].AMOUNT;
    }

    document.querySelector("#totalSpent").textContent = "₹" + totalSpent.toFixed(2);
    document.querySelector("#transactionCount").textContent = transactionCount;

    if (array.length == 0) {
        let listCreation = document.createElement("li");
        listCreation.textContent = "No Results!";
        document.querySelector("#transactionList").append(listCreation);
        document.querySelector("#transactionList").classList = "empty-message";
    }
    else {
        document.querySelector("#transactionList").classList.remove("empty-message");
    }

    for (let i = 0; i < array.length; i++) {

        let listCreation = document.createElement("li");
        let spanCreation1 = document.createElement("span");
        let spanCreation2 = document.createElement("span");

        listCreation.append(spanCreation1);
        spanCreation1.textContent = array[i].DESCTEXT + " | " + array[i].CATEGORY + " | " + array[i].DATE;
        listCreation.append(spanCreation2);
        spanCreation2.textContent = "-₹" + array[i].AMOUNT.toFixed(2);
        document.querySelector("#transactionList").append(listCreation);
    }

    let categorySpending = {
        Food: 0,
        Travel: 0,
        Shopping: 0,
        Education: 0,
        Bills: 0,
        Others: 0
    };

    //Spending by category section:
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].CATEGORY == "Food") {
            categorySpending.Food += expenses[i].AMOUNT;
        }
        else if (expenses[i].CATEGORY == "Travel") {
            categorySpending.Travel += expenses[i].AMOUNT;
        }
        else if (expenses[i].CATEGORY == "Shopping") {
            categorySpending.Shopping += expenses[i].AMOUNT;
        }
        else if (expenses[i].CATEGORY == "Education") {
            categorySpending.Education += expenses[i].AMOUNT;
        }
        else if (expenses[i].CATEGORY == "Bills") {
            categorySpending.Bills += expenses[i].AMOUNT;
        }
        else {
            categorySpending.Others += expenses[i].AMOUNT;
        }
    }


    document.querySelector("#categoryBreakdown").innerHTML = "";
    for (let i in categorySpending) {

        if (categorySpending[i] == 0) {
            continue;
        }

        if (totalSpent != 0) {

            percentage = Math.round((categorySpending[i] / totalSpent) * 100);

        }

        let listCreation = document.createElement("li");
        let spanCreation1 = document.createElement("span");
        let spanCreation2 = document.createElement("span");
        let barCreation = document.createElement("div");

        listCreation.append(spanCreation1);
        spanCreation1.textContent = i;
        listCreation.append(spanCreation2);
        spanCreation2.textContent = " - ₹" + categorySpending[i];
        listCreation.append(barCreation);
        document.querySelector("#categoryBreakdown").append(listCreation);

        
    }
}


document.querySelector("#searchExpense").addEventListener("input", function () {
    chars = this.value.toLowerCase();
    filterExpenses(chars);
})


function filterExpenses(char) {
    let filteredArray = expenses.filter(item => {
        return item.DESCTEXT.toLowerCase().includes(char);
    });
    renderExpenses(filteredArray);
}

document.querySelector("#filterCategory").addEventListener("change", function () {

    let categorySelected = this.value.toLowerCase();
    filterByCategory(categorySelected);
})

function filterByCategory(categorySelected) {
    if (categorySelected == "all") {
        renderExpenses(expenses);
        return;
    }
    let categoryFilteredArray = expenses.filter(item => {
        return item.CATEGORY.toLowerCase().includes(categorySelected);
    });

    renderExpenses(categoryFilteredArray);
}
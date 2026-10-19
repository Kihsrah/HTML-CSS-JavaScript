let expenses = [];

document.querySelector("#addExpenseBtn").addEventListener("click", function (event) {
    event.preventDefault();
    
    //Variable declaration:
    let descText = document.querySelector("#description").value;
    let amount = Number(document.querySelector("#amount").value);
    let category = document.querySelector("#category").value;
    let date = document.querySelector("#date").value;

    //Invalid input chekers:
    if(descText.trim() == "") {
        alert("Enter a valid input");
        return;
    }
    
    if(amount <= 0) {
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
    console.log(expenses);
    renderExpenses(expenses);
})


//rendering function:
function renderExpenses (array) {

    //Changing html for the RECENT TRANSACTION section:
    document.querySelector("#transactionList").innerHTML = "";

    //variable declaration:
    let totalSpent = 0;
    let transactionCount = array.length;

    for (let i = 0; i < array.length; i++) {
        totalSpent += array[i].AMOUNT;

        let listCreation = document.createElement("li");
        let spanCreation1 = document.createElement("span");
        let spanCreation2 = document.createElement("span");
        
        listCreation.append(spanCreation1);
        spanCreation1.textContent = array[i].DESCTEXT + " | " + array[i].CATEGORY + " | " + array[i].DATE;
        listCreation.append(spanCreation2);
        spanCreation2.textContent = "-₹" + array[i].AMOUNT.toFixed(2);
        document.querySelector("#transactionList").append(listCreation);
    }

    document.querySelector("#totalSpent").textContent = "₹" + totalSpent.toFixed(2);
    document.querySelector("#transactionCount").textContent = transactionCount;

    let categorySpending = {
        food: 0,
        travel: 0,
        shopping: 0,
        education: 0,
        bills: 0,
        others: 0
    };

    //Spending by category section:
    for (let i = 0; i < array.length; i++) {
        if (array[i].CATEGORY == "Food") {
            categorySpending.food += array[i].AMOUNT;
        }
        else if (array[i].CATEGORY == "Travel") {
            categorySpending.travel += array[i].AMOUNT;
        }
        else if (array[i].CATEGORY == "Shopping") {
            categorySpending.shopping += array[i].AMOUNT;
        }
        else if (array[i].CATEGORY == "Education") {
            categorySpending.education += array[i].AMOUNT;
        }
        else if (array[i].CATEGORY == "Bills") {
            categorySpending.bills += array[i].AMOUNT;
        }
        else {
            categorySpending.others += array[i].AMOUNT;
        }
    }

    document.querySelector("#categoryBreakdown").innerHTML = "";
    for (let i in categorySpending) {
        let listCreation = document.createElement("li");
        let spanCreation1 = document.createElement("span");
        let spanCreation2 = document.createElement("span");

        listCreation.append(spanCreation1);
        spanCreation1.textContent = i;
        listCreation.append(spanCreation2);
        spanCreation2.textContent = "₹" + categorySpending[i];
    }
}
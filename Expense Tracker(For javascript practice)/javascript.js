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
    let listCreation = document.createElement("li");
    listCreation.inner

    for (let i = 0; i < array.length; i++) {
        totalSpent += array[i].AMOUNT;

        document.querySelector("#transactionList").append(listCreation);
        listCreation.textContent = (i+1) +"." + " " + array[i].DESCTEXT + array[i].AMOUNT + array[i].CATEGORY + array[i].DATE;
        
    }

    document.querySelector("#totalSpent").textContent = "₹" + totalSpent;
    document.querySelector("#transactionCount").textContent = transactionCount;

}
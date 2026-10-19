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
    
    //object creation:
    let expense = {
        DESCTEXT: descText,
        AMOUNT: amount,
        CATEGORY: category,
        DATE: date
    }

    expenses.push(expense);
    console.log(expenses);
})
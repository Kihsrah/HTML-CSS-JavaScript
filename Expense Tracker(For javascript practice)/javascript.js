let expense = [];

document.querySelector("#addExpenseBtn").addEventListener("click", function () {
    
    //Variable declaration:
    let descText = document.querySelector("#description").value;
    let amount = Number(document.querySelector("#amount").value);
    let category = document.querySelector("#category").value;


    if(descText.trim() == "") {
        alert("Enter a valid input");
    }

    
})
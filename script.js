function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a,b){
    if(a === 0 || b === 0){
        return 0;
    }
    return a*b;
}
function divide(a,b){
    return a/b;
}

const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll("button");
const operators = ["+","-","x","/"]

function setCalculatorScreen(text){
    calculatorScreen.textContent = "";
    calculatorScreen.textContent = text;
}

function updateCalculatorScreen(updatedText){
    if(operators.includes(updatedText)){
        calculatorScreen.textContent = calculatorScreen.textContent + " " + updatedText + " ";
    }else{
        calculatorScreen.textContent = calculatorScreen.textContent + updatedText;
    }
}

function deletePrevCalculatorScreen(currentCalculatorScreenText){
    console.log(currentCalculatorScreenText);
    console.log(currentCalculatorScreenText.substring([0, currentCalculatorScreenText.length-2]))
    if(currentCalculatorScreenText.length === 1){
        calculatorScreen.textContent = "";
        return;
    }
    if(currentCalculatorScreenText[currentCalculatorScreenText.length-2] === " "){
        calculatorScreen.textContent = currentCalculatorScreenText.substring(0,currentCalculatorScreenText.length - 2);
        return;
    }
    calculatorScreen.textContent = currentCalculatorScreenText.substring(0,currentCalculatorScreenText.length - 1);
}

function evaluate(operations){
    const equation = operations.split(" ");
    const a = Number(equation[0]);
    const operation = equation[1];
    const b = Number(equation[2]);
    console.log(a,b, operation);
    switch (operation){
        case "+":
            return add(a,b)
        case "-":
            return subtract(a,b)
        case "x":
            return multiply(a,b)
        case "/":
            return divide(a,b)
    }
}

function autoEvaluateFirstOperation(operations){
    console.log(operations)
    const equation = operations.split(" ");
    const equationLength = equation.length;
    if(equationLength >= 3 && equation[4] !== undefined){
        const firstEquation = equation.splice(0,3);
        const resultFirstEquation = evaluate(firstEquation.join(" "));
        const displayResultAndLastOperation = resultFirstEquation + " " + operations.at(-2) + " ";
        setCalculatorScreen(displayResultAndLastOperation);
    }
}

function getCurrentCalculatorScreen(){
    return calculatorScreen.textContent;
}

calculatorScreen.addEventListener("change", e =>{
    console.log(e.textContent, "Event Listener for Calcualtor Screen");
})


function init(){
    buttons.forEach((button,index) => {
    button.addEventListener("click", event =>{
        const eventTextContent = event.target.textContent.trim();
        if (eventTextContent === "delete"){
            const resultScreen = deletePrevCalculatorScreen(getCurrentCalculatorScreen());
        }else if(eventTextContent === "clear"){
            calculatorScreen.textContent = "";
        }else if(eventTextContent === "="){
            const result = evaluate(getCurrentCalculatorScreen());
            console.log("result of evaluation: ", result)
            setCalculatorScreen(result);
        }else{
            updateCalculatorScreen(eventTextContent);
        }

        autoEvaluateFirstOperation(getCurrentCalculatorScreen());
    })
    })
}
init();

// console.log(calculatorScreen.textContent);

//todo implementation first of add,delete,multiply,divide with error handling and such.
//add event listeners to button to manipulate calculator screen content.
//make clear button clear everything from the calculator screen content
//make delete button only delete/undo the last input of user
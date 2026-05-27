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
let currentOperand = null;
const decimalPointButton = document.querySelector("#decimal")

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
    toggleDecimalButton(true);
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

function toggleDecimalButton(toggle){
    if(toggle === true){
        decimalPointButton.disabled = false;
    }else{
        decimalPointButton.disabled = true;
    }
}

calculatorScreen.addEventListener("change", e =>{
    console.log(e.textContent, "Event Listener for Calcualtor Screen");
})


function init(){
    buttons.forEach((button,index) => {
    button.addEventListener("click", event =>{
        const eventTextContent = event.target.textContent.trim();

        if(operators.includes(eventTextContent)){
            currentOperand = eventTextContent
            toggleDecimalButton(false);
        }

        if(eventTextContent === "."){
            toggleDecimalButton(true);
        }

        if (eventTextContent === "delete"){
            deletePrevCalculatorScreen(getCurrentCalculatorScreen());
        }else if(eventTextContent === "clear"){
            calculatorScreen.textContent = "";
        }else if(eventTextContent === "="){
            toggleDecimalButton(false);
            const result = evaluate(getCurrentCalculatorScreen());
            if(getCurrentCalculatorScreen() && result === undefined){
                setCalculatorScreen(getCurrentCalculatorScreen());
            }else{
                setCalculatorScreen(result);
            }
        }else{
            updateCalculatorScreen(eventTextContent);
        }

        autoEvaluateFirstOperation(getCurrentCalculatorScreen());
    })
    })
    document.addEventListener("keydown", (event) => {
        console.log(event.key);
        if(event.key === "Backspace"){
            deletePrevCalculatorScreen(getCurrentCalculatorScreen());
        }
    })
}

init();
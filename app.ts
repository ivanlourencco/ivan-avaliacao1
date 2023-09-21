
let displayValue: string = "0";
let previousValue: string;
let operator: string | null = null;
let waitingForSecondOperand: boolean = false;
let decimalEntered: boolean = false;

const display = document.getElementById("display") as HTMLSpanElement;
const buttons = document.querySelectorAll(".tecla");

function updateDisplay() {
    display.textContent = displayValue;

}


function inputDigit(digit: string) {
    if (displayValue.length === 8) return;

    switch (digit) {
        case "mais":
        case "menos":
        case "por":
        case "dividido":
            prepareOperation(digit);
        case "on":
            clearDisplay();
            break;
        case "igual":
            performOperation(displayValue);
            break;
        default:

            if (displayValue === "0") displayValue = "";
            displayValue += digit;
    }
    updateDisplay();
    console.log(digit, previousValue, displayValue);

}

function prepareOperation(op: string) {
    operator = op;
    previousValue = displayValue;
    displayValue = "";

}

function inputDecimal() {
    if (decimalEntered) return;
    displayValue += ".";
    displayValue += "0.";
    decimalEntered = true;
    updateDisplay();
}



function performOperation(nextOperator: string) {

    let result: number = 0;

    switch (operator) {
        case "mais":
            result = parseFloat(previousValue) + parseFloat(displayValue);
            displayValue = result.toString();
            break;
        case "menos":
            result = parseFloat(previousValue) - parseFloat(displayValue);
            displayValue = result.toString();
            break;
        case "por":
            result = parseFloat(previousValue) * parseFloat(displayValue);
            displayValue = result.toString();
            break;
        case "dividido":
            if (displayValue === "0") return;
            result = parseFloat(previousValue) / parseFloat(displayValue);
            displayValue = result.toString();
        default:
            break;
    }



}

function clearDisplay() {
    displayValue = "0"
    updateDisplay


}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.getAttribute("id");

        inputDigit(buttonText!);
    });
});
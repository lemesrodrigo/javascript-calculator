/*
 * Design inspired by - https://files.muzli.space/6a13e617e0b79a55cf4906b6fbeca35e.webp
 *
 * I learned how to code a basic calculator watching a video on youtube 
 * by Web Dev Simplified.
 * https://youtu.be/j59qQ7YWLxw.
 * 
 * TODO:
 *  - Dark Mode
 */

class Calculator {
    constructor(accumulatorTextElement, totalTextElement, operatorTextElement) {
        this.accumulatorTextElement = accumulatorTextElement;
        this.totalTextElement = totalTextElement;
        this.operatorTextElement = operatorTextElement;
        this.accumulator = 0;
        this.clearAll();
        this.MAX_LENGTH = 8;
    }

    clearAll() {
        this.accumulator = 0;
        this.operation = undefined;
        this.operatorTextElement.innerText = '';
        this.total = 0;
    }

    clearEntry() {
        this.total = 0;
    }

    posToNeg() {
        if (this.total == 0) { return }
        if (this.total < 0) {
            this.total = Math.abs(this.total);
            return;
        }
        this.total = -Math.abs(this.total);
    }

    appendValue(value) {
        if (this.totalTextElement.innerText.length < this.MAX_LENGTH) {
            if (value == '.' && this.total.includes('.')) { return }
            if (this.total == '0') { this.total = value; return }
            this.total += value.toString();
        }
    }

    chooseOperation(operator) {
        if (this.total == 0 && operator != '√') { return }
        if (this.accumulator != 0) this.calc();
        if (operator == '√' && this.total == 0) this.total = 1;
        this.operation = operator;
        this.accumulator = this.total;
        this.total = 0;
    }

    calc() {
        let calcResult;
        let prev = parseFloat(this.accumulator);
        const curr = parseFloat(this.total);
        switch (this.operation) {
            case '+':
                calcResult = prev + curr;
                break;
            case '-':
                calcResult = prev - curr;
                break;
            case 'x':
                calcResult = prev * curr;
                break;
            case '÷':
                calcResult = prev / curr;
                break;
            case '√':
                calcResult = (prev * Math.sqrt(curr)).toFixed(this.MAX_LENGTH);
                break;
            case '(^)':
                calcResult = Math.pow(prev, curr);
                break;
            default:
                return;
        }
        this.operatorTextElement.innerText = '';
        this.total = calcResult;
        this.operation = undefined;
        this.accumulator = 0;
    }

    calcPercentage() {
        this.calc();
        this.total /= 100;
    }

    changeDisplay() {
        this.totalTextElement.innerText = this.total;
        this.accumulatorTextElement.innerText = this.accumulator;
        if (this.operation == undefined) return;
        this.operatorTextElement.innerText = this.operation;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const clearAllButton = document.querySelector('[data-clear-all]');
const decimalButton = document.querySelector('[data-decimal]');
const accumulatorTextElement = document.querySelector('[data-accumulator]');
const totalTextElement = document.querySelector('[data-total]');
const piButton = document.querySelector('[data-pi]');
let operatorTextElement = document.querySelector('[data-op]');
const percentageButton = document.querySelector('[data-percentage]');
const posToNegButton = document.querySelector('[data-pos-to-neg]');

const calculator = new Calculator(accumulatorTextElement, totalTextElement, operatorTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendValue(button.innerText);
        calculator.changeDisplay();
    });
});

decimalButton.addEventListener('click', () => {
    calculator.appendValue(decimalButton.innerText);
    calculator.changeDisplay();
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.changeDisplay();
    });
});

clearAllButton.addEventListener('click', () => {
    calculator.clearAll();
    calculator.changeDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clearEntry();
    calculator.changeDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.calc();
    calculator.changeDisplay();
});

piButton.addEventListener('click', () => {
    calculator.appendValue((Math.PI).toFixed(calculator.MAX_LENGTH));
    calculator.changeDisplay();
});

percentageButton.addEventListener('click', () => {
    calculator.calcPercentage();
    calculator.changeDisplay();
});

posToNegButton.addEventListener('click', () => {
    calculator.posToNeg();
    calculator.changeDisplay();
});

const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0'
let firstValue = null
let operator = null
let waitingForSecond = false

updateDisplay()


keys.addEventListener('click', function(e){
    const key = e.target
    if (!key.matches('button')) {
        return
    }
    if(key.classList.contains('operator')){
        handleOperator(key.value)
        updateDisplay()
    }
    else if(key.classList.contains('decimal')){
        inputDecimal()
        updateDisplay()
        return
    }
    else if(key.classList.contains('clear')){
       clear()
       updateDisplay()
    }
    
    else {
        inputNumber(key.value)
        updateDisplay()
    }
})


function updateDisplay() {
    display.value = displayValue
}

function inputNumber(value){
    if(waitingForSecond){
        displayValue = value
        waitingForSecond = false
    }
    else {
    displayValue = displayValue === '0' ? value : displayValue + value 
    }
}


function clear() {
    displayValue = '0'
}


function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.'
    }
}


function handleOperator(nextOperator){
    const value = parseFloat(displayValue)
    if (firstValue === false) {
        firstValue = value
    }else if (operator){
        const result = calculate(firstValue , value , operator)
        displayValue = String(result)
        firstValue = result
    }

    waitingForSecond = true
    operator = nextOperator

}


function calculate(first , second , operator){
    if(operator == '+'){
        return first + second
    }
    else if(operator == '-'){
        return first - second
    }
    else if(operator == '*'){
        return first * second
    }
    else if(operator == '/'){
        return first / second
    }
    return second
}
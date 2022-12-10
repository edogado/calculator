let history = ['', '', '', '', '', '', '', '', '' , '', ''];
let previousOperations = document.getElementsByClassName('number');
let userInput = document.getElementById('number-selected');//numbers clicked by user
const buttons = document.querySelectorAll('#buttons div');
let operation;// needed to keep track of what operation we have to perform
let n1;//placeholder for the first integer
let n2;//placeholder for the second integer

//---------- Function updates the input screen every time a button is pressed ------------------------------------------
const appendCharacter = (character) => userInput.innerText = userInput.innerText + character;

//---------- Function updates the arithmetic and screen every time an operator is selected ------------------------
const updateArithmetic = (integer, operator, character) =>{
    n1=integer;
    operation = operator;
    appendCharacter(character);//update the screen
}

//---------- Dictionary returns result of an operation depending on the operator ---------------------------------------
const doOperation = {
    '+': (x , y) => {return parseFloat(x)+y},
    '-': (x , y) => {return x-y},
    'x': (x , y) => {return x*y},
    '/': (x , y) => {return y===0? 'Cannot divide by 0': x/y;}
}

//---------- Function updates the current operation section when an operator is pressed --------------------------------
const updateCurrentOperation = (currentOperation) =>{
    for (let i = 0; i <= 9; i++){
        previousOperations[i].innerHTML = `${history[i+1]}<br>`;//moving every performed operation one level up
    }
    previousOperations[10].innerHTML = `${currentOperation}<br>`;//setting the input and operator at the end of history
}

//---------- Function updates the last element of the history with the finalized operation performed by user -----------
const updateOperationsHistory = (x, op, y, result) =>{
    let lastOperation = `${x} ${op} ${y} = ${result}`;//formatting the operation
    history.push(lastOperation);//added to the history array to be copied by operations array
    history.shift()//no longer need the element at the top
    previousOperations[10].innerHTML = `${lastOperation}<br>`//update the last element
}

//---------- Function updates the screen -------------------------------------------------------------------------------
const updateScreen =() => {

};

document.addEventListener('DOMContentLoaded', ()=> {

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case("AC")://reset the calculator
                    userInput.innerText = '0';
                    operation = '';
                    n1 = '';
                    n2 = '';
                    break;

                case("+/-"):
                    //convert positive numbers to negative
                    if (userInput.innerText !== '0' && parseFloat(userInput.innerText) > 0){
                        userInput.innerText = `-${userInput.innerText}`;
                        break;
                    }
                    //convert negative numbers to positive
                    if (userInput.innerText !== '0' && parseFloat(userInput.innerText) < 0){
                        userInput.innerText = `${userInput.innerText.slice(1)}`;
                        break;
                    }
                    break;

                case("%"):
                    userInput.innerText = `${parseFloat(userInput.innerText)/100}`;
                    break;

                case("/"):
                    updateArithmetic(userInput.innerText, '/', button.textContent);
                    updateCurrentOperation(userInput.innerText);
                    userInput.innerText = '';
                    break;

                case ("x"):
                    updateArithmetic(userInput.innerText, 'x', button.textContent)
                    updateCurrentOperation(userInput.innerText);
                    userInput.innerText = '';
                    break;

                case "-":
                    //if user wants to start with a negative number
                    //we check if we only have our initial 0 whose length is 1
                    if (userInput.innerText.length === 1 && userInput.innerText.includes('0')){
                        userInput.innerText = '';//we remove the initial 0
                        appendCharacter(button.textContent);//and replace it by the '-' followed by the numbers
                        break;
                    }

                    updateArithmetic(userInput.innerText, '-', button.textContent)
                    updateCurrentOperation(userInput.innerText);
                    userInput.innerText = '';
                    break;

                case "+":
                    updateArithmetic(userInput.innerText, '+', button.textContent)
                    updateCurrentOperation(userInput.innerText);
                    userInput.innerText = '';
                    break;

                case '=':
                    n2 = parseFloat(userInput.innerText);
                    userInput.innerText = doOperation[operation](n1, n2);
                    updateOperationsHistory(n1, operation, n2, userInput.innerText);
                    break;

                case '.':
                    if (userInput.innerText.includes('.')){
                        break;
                    }
                    appendCharacter('.');
                    break;

                default:
                    if (userInput.innerText.includes('0') && userInput.innerText.length===1){
                        userInput.innerText = '';
                    }
                    if (userInput.innerText.length <= 33){
                        appendCharacter(button.textContent);
                    }
            }
        })
    })
});

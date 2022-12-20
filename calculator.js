let history = ['', '', '', '', '', '', '', '', '' , '', ''];
let listOfPreviousOperations = document.getElementsByClassName('number');
let userInput = document.getElementById('number-selected');//numbers clicked by user
const buttons = document.querySelectorAll('#buttons div');
let deleteButton = document.getElementById('delete');
let operation;// needed to keep track of what operation we have to perform
let n1;//placeholder for the first integer
let n2;//placeholder for the second integer

//---------- Function updates the input screen every time a button is pressed ------------------------------------------
const appendCharacter = (character) => userInput.innerText += character;

//---------- Function updates the arithmetic and screen every time an operator is selected -----------------------------
const updateArithmetic = (integer, operator) =>{
    n1=integer;
    operation = operator;
}

//---------- Function will return true if we already have received an operator. If so, it disables the operation buttons
const isOperationInProgress = (operation) =>{
    return operation === '/' || operation === 'x' || operation === '-' || operation === '+';
}

//---------- Dictionary returns result of an operation depending on the operator ---------------------------------------
const doOperation = {
    '+': (x , y) => {return isNaN(x) || isNaN(y) ? 'Enter an integer': parseFloat(x)+y},
    '-': (x , y) => {return isNaN(x) || isNaN(y) ? 'Enter an integer': x-y},
    'x': (x , y) => {return isNaN(x) || isNaN(y) ? 'Enter an integer': x*y},
    '/': (x , y) => {return isNaN(x) || isNaN(y) ? 'Enter an integer': y===0? 'Cannot divide by 0': x/y;}
}

//---------- Function updates the input section and history section when an operator is pressed ------------------------
const updateInputSection = (currentOperation) =>{
    for (let i = 0; i <= 9; i++){
        listOfPreviousOperations[i].innerHTML = `${history[i+1]}<br>`;//moving every performed operation one level up
    }
    listOfPreviousOperations[10].innerHTML = `${currentOperation}<br>`;//setting the final result at the end of history
}

//---------- Function updates the last element of the history with the finalized operation performed by user -----------
const updateListOfPreviousOperations = (x, op, y, result) =>{
    let lastOperation = `${x} ${op} ${y} = ${result}`;//formatting the operation
    if (isNaN(x)){
        lastOperation = `_ ${op} ${y} = _`;
    }
    if (isNaN(y)){
        lastOperation = `${x} ${op} _ = _`;
    }

    history.push(lastOperation);//added to the history array to be copied by operations array
    history.shift()//no longer need the element at the top
    listOfPreviousOperations[10].innerHTML = `${lastOperation}<br>`//update the last element
}

//---------- Function updates the screen -------------------------------------------------------------------------------
const updateScreen =(operator) => {
    updateArithmetic(userInput.innerText, operator);
    appendCharacter(" " + operator);//update the screen
    updateInputSection(userInput.innerText);
    userInput.innerText = '';
};

document.addEventListener('DOMContentLoaded', ()=> {

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case("AC")://reset the calculator
                    for (let i = 0; i < history.length; i++){
                        history[i] = '';
                    }
                    userInput.innerText = '0';
                    operation = '';
                    n1 = '';
                    n2 = '';
                    updateInputSection('')//this triggers the update of the history screen
                    break;

                case ("C"):
                    userInput.innerText = '0';
                    operation = '';
                    n1 = '';
                    n2 = '';
                    deleteButton.innerText = 'AC'
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
                    if (isOperationInProgress(operation)) break;//we check if we already have a pending operation
                    updateScreen( '/');//we proceed if there's nothing pending.
                    break

                case ("x"):
                    if (isOperationInProgress(operation)) break;//we check if we already have a pending operation
                    updateScreen( 'x');//we proceed if there's nothing pending.
                    break

                case "-":
                    //if user wants to start with a negative number
                    //we check if we only have our initial 0 whose length is 1
                    if (userInput.innerText.length === 1 && userInput.innerText.includes('0')){
                        userInput.innerText = '';//we remove the initial 0
                        appendCharacter(button.textContent);//and replace it by the '-' followed by the numbers
                        break;
                    }

                    //regular subtraction
                    if (isOperationInProgress(operation)) break;//we check if we already have a pending operation
                    updateScreen( '-');//we proceed if there's nothing pending.
                    break

                case "+":
                    if (isOperationInProgress(operation)) break;//we check if we already have a pending operation
                    updateScreen( '+');//we proceed if there's nothing pending.
                    break

                case '=':
                    n2 = parseFloat(userInput.innerText);
                    userInput.innerText = doOperation[operation](n1, n2);
                    updateListOfPreviousOperations(n1, operation, n2, userInput.innerText);
                    operation = '';
                    n2 = '';
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
                    deleteButton.innerText = 'C';
            }
        })
    })
});

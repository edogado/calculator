let history = ['', '', '', '', '', '', '', '', '' , '', ''];
let previousOperations = document.getElementsByClassName('number');
let numberSelected = document.getElementById('number-selected');
const buttons = document.querySelectorAll('#buttons div');

const doOperation = {
    '+': (x , y) => {return parseFloat(x)+y},
    '-': (x , y) => {return x-y},
    'x': (x , y) => {return x*y},
    '/': (x , y) => {return y===0? 'Cannot divide by 0': x/y;}
}

const updateOperationsHistory = (x, op, y, result) =>{
    let lastOperation = `${x} ${op} ${y} = ${result}`;
    history.push(lastOperation);
    history.shift()
    for (let i = 0; i <= 10; i++){
        previousOperations[i].innerHTML = `${history[i]}<br>`;
    }
}


const appendCharacter = (character) =>{
    numberSelected.innerText = numberSelected.innerText + character;
}

document.addEventListener('DOMContentLoaded', ()=> {

    let operation;
    let n1;
    let n2;

    //every time an operation is selected
    const updateCalculator = (integer, op, character) =>{
        n1=integer;//we save the first integer
        operation = op;//record the operation to perform
        appendCharacter(character);//update the screen
    }

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case("AC"):
                    numberSelected.innerText = '0';
                    operation = '';
                    n1 = '';
                    n2 = '';
                    break;

                case("+/-"):
                    //convert positive numbers to negative
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) > 0){
                        numberSelected.innerText = `-${numberSelected.innerText}`;
                        break;
                    }
                    //convert negative numbers to positive
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) < 0){
                        numberSelected.innerText = `${numberSelected.innerText.slice(1)}`;
                        break;
                    }
                    break;

                case("%"):
                    numberSelected.innerText = `${parseFloat(numberSelected.innerText)/100}`;
                    break;

                case("/"):
                    updateCalculator(numberSelected.innerText, '/', button.textContent);
                    break;

                case ("x"):
                    updateCalculator(numberSelected.innerText, 'x', button.textContent)
                    break;

                case "-":
                    //in case user wants to start with a negative number
                    if (numberSelected.innerText.length === 1 && numberSelected.innerText.includes('0')){
                        numberSelected.innerText = '';//we remove the initial 0
                        appendCharacter(button.textContent);//and replace it by the '-' followed by the numbers
                        break;
                    }

                    updateCalculator(numberSelected.innerText, '-', button.textContent)
                    break;

                case "+":
                    updateCalculator(numberSelected.innerText, '+', button.textContent)
                    break;

                case '=':
                    n2 = parseFloat(numberSelected.innerText);
                    numberSelected.innerText = doOperation[operation](n1, n2);
                    updateOperationsHistory(n1, operation, n2, numberSelected.innerText);
                    break;

                case '.':
                    if (numberSelected.innerText.includes('.')){
                        break;
                    }
                    appendCharacter('.');
                    break;

                default:
                    if (numberSelected.innerText.includes('0') && numberSelected.innerText.length===1){
                        numberSelected.innerText = '';
                    }
                    if (numberSelected.innerText.length <= 33){
                        appendCharacter(button.textContent);
                    }
            }
        })
    })
});

let numberSelected = document.getElementById('number-selected');
const buttons = document.querySelectorAll('#buttons div');

const doOperation = {
    '+': (x , y) => {return parseFloat(x)+y},
    '-': (x , y) => {return x-y},
    'x': (x , y) => {return x*y},
    '/': (x , y) => {return y==='0'? 'Cannot divide by 0': x/y;}
}

const appendCharacter = (character) =>{
    numberSelected.innerText = numberSelected.innerText + character;
}

document.addEventListener('DOMContentLoaded', ()=> {

    let operation;
    let n1;
    let n2;

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
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) > 0){
                        numberSelected.innerText = `-${numberSelected.innerText}`;
                        break;
                    }
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) < 0){
                        numberSelected.innerText = `${numberSelected.innerText.slice(1)}`;
                        break;
                    }
                    break;

                case("%"):
                    numberSelected.innerText = `${parseFloat(numberSelected.innerText)/100}`;
                    break;

                case("/"):
                    n1=numberSelected.innerText;
                    operation = '/'
                    appendCharacter(button.textContent);
                    break;

                case ("x"):
                    n1=numberSelected.innerText;
                    operation = 'x'
                    appendCharacter(button.textContent);
                    break;

                case "-":
                    n1=numberSelected.innerText;
                    operation = '-'
                    appendCharacter(button.textContent);
                    break;

                case "+":
                    n1=numberSelected.innerText;
                    operation = '+'
                    appendCharacter(button.textContent);
                    break;

                case '=':
                    n2 = parseFloat(numberSelected.innerText.substring(n1.length+1));
                    numberSelected.innerText = doOperation[operation](n1, n2);
                    console.log(n1, operation, n2);
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
                    appendCharacter(button.textContent);
            }
            console.log(numberSelected);
        })
    })
});

const operations = document.getElementById('list-of-operations');
let numberSelected = document.getElementById('number-selected');
const buttons = document.querySelectorAll('#buttons div');

const doOperation = {
    '+': (x , y) => {return x+ parseInt(y)},
    '-': (x , y) => {return x-y},
    'x': (x , y) => {return x*y},
    '/': (x , y) => {return y==='0'? 'Cannot divide by 0': x/y;}
}


document.addEventListener('DOMContentLoaded', ()=> {

    let operation;
    let n1;

    console.log(operations.children);

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case("AC"):
                    numberSelected.innerText = '0';
                    break;

                case("+/-"):
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) > 0){
                        numberSelected.innerText = `-${numberSelected.innerText}`
                        break;
                    }
                    if (numberSelected.innerText !== '0' && parseFloat(numberSelected.innerText) < 0){
                        numberSelected.innerText = `${numberSelected.innerText.slice(1)}`
                        break;
                    }
                    break;

                case("%"):
                    numberSelected.innerText = `${parseFloat(numberSelected.innerText)/100}`;
                    break;

                case("/"):
                    n1=numberSelected.innerText;
                    operation = '/'
                    numberSelected.innerText = '';
                    break;

                case ("x"):
                    n1=numberSelected.innerText;
                    operation = 'x'
                    numberSelected.innerText = '';
                    break;

                case "-":
                    n1=numberSelected.innerText;
                    operation = '-'
                    numberSelected.innerText = '';
                    break;

                case "+":
                    n1=parseInt(numberSelected.innerText);
                    operation = '+'
                    numberSelected.innerText = '';
                    break;

                case '=':
                    numberSelected.innerText = doOperation[operation](n1, numberSelected.innerText);
                    n1 = numberSelected.innerText;
                    break;

                case '.':
                    if (numberSelected.innerText.includes('.')){
                        break;
                    }
                    numberSelected.innerText = numberSelected.innerText+".";
                    break;

                default:
                    if (numberSelected.innerText==='0' && numberSelected.innerText.length === 1){
                        numberSelected.innerText = button.textContent;
                    }

                    else {
                        numberSelected.innerText = `${numberSelected.innerText}${button.textContent}`;
                    }
            }
        })
    })
});

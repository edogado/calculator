const operations = document.getElementById('list-of-operations');
let numberSelected = document.getElementById('number-selected');
const buttons = document.querySelectorAll('#buttons div');

document.addEventListener('DOMContentLoaded', ()=> {

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
                    console.log("division");
                    break;

                case ("x"):
                    console.log('times');
                    break;

                case "-":
                    console.log('minus');
                    break;

                case "+":
                    console.log('plus');
                    break;

                case '=':
                    console.log('equals');
                    break;

                case '.':
                    console.log('.');
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

const operations = document.getElementById('list-of-operations');
let userInput = document.getElementById('number-selected');
const buttons = document.querySelectorAll('#buttons div');

document.addEventListener('DOMContentLoaded', ()=> {

    console.log(operations.children);

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            switch (button.textContent){
                case("AC"):
                    userInput.innerText = '0';
                    break;

                case("+/-"):
                    if (userInput.innerText !== '0' && parseInt(userInput.innerText) > 0){
                        userInput.innerText = `-${userInput.innerText}`
                        break;
                    }
                    if (userInput.innerText !== '0' && parseInt(userInput.innerText) < 0){
                        userInput.innerText = `${userInput.innerText.slice(1)}`
                        break;
                    }
                    break;

                case("%"):
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

                default:
                    if (userInput.innerText==='0' && userInput.innerText.length === 1){
                        userInput.innerText = button.textContent;
                    }

                    else {
                        userInput.innerText = `${userInput.innerText}${button.textContent}`;
                    }
            }
        })
    })
});

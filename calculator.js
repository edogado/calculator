const buttons = document.querySelectorAll('#buttons div');


document.addEventListener('DOMContentLoaded', ()=> {
    buttons.forEach(button => {
        console.log(button.innerHTML);
    })
});

let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML, e.target);
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    let key = e.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        string += key;
        input.value = string;
        highlightButton(key);
    }
    else if (key === "Enter") {
        calculate();
        highlightButton('=');
    }
    else if (key === "Backspace") {
        string = string.substring(0, string.length - 1);
        input.value = string;
        highlightButton('DEL');
    }
    else if (key === "Escape") {
        string = "";
        input.value = "";
        highlightButton('AC');
    }
    else if (key === ".") {
        string += ".";
        input.value = string;
        highlightButton('.');
    }
});

function handleInput(btnValue, btnElement) {
    // Click animation
    btnElement?.classList.add('active-btn');
    setTimeout(() => btnElement?.classList.remove('active-btn'), 150);

    if (btnValue == '=') {
        calculate();
    } 
    else if (btnValue == 'AC') {
        string = "";
        input.value = string;
    } 
    else if (btnValue == 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } 
    else {
        string += btnValue;
        input.value = string;
    }
}

function calculate() {
    try {
        string = eval(string);
        input.value = string;
    } catch {
        input.value = "Error";
        string = "";
    }
}

// Button highlight for keyboard press
function highlightButton(value) {
    let btn = Array.from(buttons).find(b => b.innerHTML === value);
    if (btn) {
        btn.classList.add('active-btn');
        setTimeout(() => btn.classList.remove('active-btn'), 150);
    }
}

function addElement(button) {
    const input = document.getElementById('outputField');
    input.value = input.value + this.textContent;
}

const docs = document.querySelectorAll('.item');
docs.forEach(button => {
    button.addEventListener('click', addElement);
})

function removeEventListeners(element) {
    element.removeEventListener('click', addElement);
}


const calculator = document.querySelector('.container');
const equal = document.querySelector('.equal');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');

removeEventListeners(calculator);
removeEventListeners(equal);
removeEventListeners(result);
removeEventListeners(clear);

clear.addEventListener('click', () => {
    const input = document.getElementById('outputField');
    input.value = '';
});

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function equalExpression() {
    try {
        const input = document.getElementById('outputField');
        const expressionWithAsterisk = input.value.replace(/x/g, '*');
        let apiUrl = `http://api.mathjs.org/v4/?expr=${encodeURIComponent(expressionWithAsterisk)}`;
        if (isValidURL(apiUrl)) {
            // Отправка запроса, если URL корректен
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch result');
                    }
                    return response.json();
                })
                .then(data => {
                    input.value = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                    input.value = 'Error';
                })
        } else {
            console.error('Invalid URL:', apiUrl);
        }
    } catch (error) {
        const input = document.getElementById('outputField');
        input.value = "Error";
        console.error(error);

    }
}

equal.addEventListener('click', equalExpression);


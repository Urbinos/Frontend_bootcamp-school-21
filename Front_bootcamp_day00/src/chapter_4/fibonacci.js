// Напишите функицю, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение.
// Предположим, что ряд Фибоначчи начинается с 0 индекса.


function fibo(index) {
    if (index <= 0) {
        return 'Invalid index';
    }

    if (index === 0) {
        return 0;
    } else if (index === 1) {
        return 1;
    } else {
        let a = 0;
        let b = 1;
        let result;

        for (let i = 2; i <= index; i++) {
            result = a + b;
            a = b;
            b = result;
        }

        return result;
    }
// return n <= 1 ? n : fibo(n - 1) + fibo(n - 2);
}

console.log(fibo(77)); 



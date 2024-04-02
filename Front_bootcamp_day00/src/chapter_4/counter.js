//Напишите функцию counter, которая при каждом вызове будет возвращать числа на 3 больше, чем в прошлый. Нельзя использовать переменные, объявленные через var!

function counter() { }

counter(); // Функция вернет 0
counter(); // Функция вернет 3
counter(); // Функция вернет 6
counter(); // Функция вернет 9

function counter() {
  let count = 0;

  return () => {
    const currentCount = count;
    count += 3;
    return currentCount;
  };
}

const myCounter = counter();

console.log(myCounter());
console.log(myCounter());
console.log(myCounter());
console.log(myCounter()); 

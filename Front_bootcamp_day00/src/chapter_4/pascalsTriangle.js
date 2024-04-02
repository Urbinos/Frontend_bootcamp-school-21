// Напишите функцию, которая будет принимать координаты числа в треугольника Паскаля и будет возвращать значение по координатам.
// Если вы не знаете, что такое треугольник Паскаля, советую прочитать перед выполнение задания.
// https://cdn.fishki.net/upload/post/201502/04/1414683/947eb978f710426fd0702fd119da506b.gif тут можно посмотреть наглядно принцип работы.
// Предположим, что начальные координаты 0,0.
// Тут, возможно, поможет рекурсия.

function pascalTriangle(x, y) {
    if (y === 0 || y === x) {
        return 1;
    } else {
        return pascalTriangle(x - 1, y - 1) + pascalTriangle(x - 1, y);
    }
}

console.log(pascalTriangle(3, 2)); 
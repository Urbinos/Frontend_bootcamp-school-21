// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения.

const removeString = (str, symb) => str.replaceAll(symb, '');

console.log(removeString("А роза азора", "А"));

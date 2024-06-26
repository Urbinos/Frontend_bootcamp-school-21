#  Day 01 - Frontend boot camp


## Contents

1. [Chapter I](#chapter-i) 
2. [Задание 1.](#задание-1)
3. [Задание 2.](#задание-2)
4. [Задание 3.](#задание-3)
5. [Задание 4.](#задание-4) \
   5.1 [File system](#file-system) 


## Chapter I

До недавнего времени промышленные разработчики использовали функции конструктора для имитации объектно-ориентированного шаблона в JavaScript. Языковая спецификация ECMAScript 2015 (часто называемая ES6) ввела в язык JavaScript понятие классов. Классы в JavaScript не добавляют дополнительные функции, и представляют собой способ упростить синтаксис при использовании прототипов и наследования и сделать его более элегантным. Поскольку в других языках программирования также используются классы, синтаксис классов в JavaScript упрощает работу для разработчиков, владеющих другими языками. 

**Задание 1.**  
Нужно описать класс Employee \
![image](https://user-images.githubusercontent.com/48245816/170902240-ab540276-e2b6-450f-ac32-d11ced7580ea.png)

[Заготовки для задания](./src/chapter_1/classes.js).
<br>

## Задание 2. 
В продолжение прошлого задания нужно создать [5 новых классов](./src/chapter_1/Hard_classes.md).

[Заготовки для задания](./src/chapter_1/hard_classes.js).
<br>

### File system

В Node.JS, для работы с файлами существует модуль «FS» и в нем есть множество функций для самых различных операций с файлами и директориями. [Вот документация](https://nodejs.org/api/fs.html). Если мы приглядимся внимательно, то увидим первую особенность этого модуля, почти все функции имеют два варианта. Первое просто имя, второе со словом Sync. Слово Sync означает синхронно.Если, например, вызовать **fs.readFile(file[, options], callback)**, то он сначала прочитает файл полностью, а потом вызовет callback. А **fs.readFileSync(file[, options])** затормозит выполнение процесса пока файл не будет прочитан. В заданиях необходимо использовать асинхронный вариант!

## Задание 3. 

Нужно прочитать данные из файла file1.txt, после прочтения полученные данные надо записать в файл file2.txt. Реализовать это надо 3 разными способами, для каждого способа своя функция: \
`-` readAndWriteCallbackHell() - в данной функции ты должен использовать только передачу коллбека в ассинхронную функцию. \
`-` readAndWritePromises() - в данной функции будут использоватся промисы и then. \
`-` readAndWriteAsyncAwait() - в данной функции можно использовать async await.


## Задание 4. 

Когда пользователь загружает страницу - данные с сервера поступают на клиент асинхронно и неравномерно. Нужно написать progressbar, применимый не к статически заданному времени, а к размеру «загружаемых» файлов. На основании полученых размеров файлов реализовать свой progressbar. 
Прогрессбар будет заполняться до общего размера всех имеющихся файлов в [папке](./src/chapter_2/files/fsHard). Если у тебя есть файл размером 5Кб, при общем размере всех файлов - 10 Кб, то твоя полоса загрузки после обработки такого файла должна заполниться на 50% (100% * (5Кб / 10Кб)). 
Сделать полосу загрузки(progressbar) в **Консоли Терминала**. Не в браузере! Она должна увеличиваться с каждым новым загруженным файлом.



<br>

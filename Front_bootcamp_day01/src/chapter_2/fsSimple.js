const fs = require('fs');
const path = require('path');

const fileToRead = path.resolve(__dirname, 'files/fsSimple/file1.txt');
const fileToWrite = path.resolve(__dirname, 'files/fsSimple/file2.txt');


const readAndWriteCallbackHell = () => {
  fs.readFile(fileToRead, 'utf8', (err, data) => {
    if (err) {
      throw new Error('Ошибка чтения файла:', err);
    }

    fs.writeFile(fileToWrite, data, 'utf8', (err) => {
      if (err) {
        throw new Error('Ошибка чтения файла:', err);
      }

      console.log('Данные усешноо загружены.');
    });
  });
};

const readAndWritePromises = () => {
  const readFilePromise = new Promise((resolve, reject) => {
    fs.readFile(fileToRead, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  readFilePromise
    .then((data) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(fileToWrite, data, 'utf8', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('Данные усешноо загружены.');
          }
        });
      });
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.error('Error', err);
    });
};

const readAndWriteAsyncAwait = async () => {
  try {
    const data = await fs.promises.readFile(fileToRead, 'utf8');
    await fs.promises.writeFile(fileToWrite, data, 'utf8');
    console.log('Данные усешноо загружены.');
  } catch (err) {
    console.error('Error:', err);
  }
};

readAndWriteCallbackHell();
readAndWritePromises();
readAndWriteAsyncAwait();
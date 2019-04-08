const path = require('path');
const extractFilePath = function (url) {
   let fileName = 'index.html';
   if (url.length > 1) {
      fileName = url.substring(1);
   }
   console.log(fileName);
   return fileName;
};

module.exports = extractFilePath;
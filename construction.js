
// Pour accéder aux modules je doit les require également dans fichier qui en on besoin
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)
require('dayjs/locale/fr')
dayjs.locale('fr')
// Séléction de livres incontournables avec un boucle for of
function creatTable(data, list) { 

  for(const book of data){          
  list += `<tr><td> ${book.title}</td> - <td>${book.language}</td>- <td>${book.country}</td>- <td>${book.author}</td>- <td>${dayjs(book.date).format('dddd, MMMM Do YYYY.')}</td> - <td>${dayjs().to(dayjs(book.date))}</td></tr>`;
     
  }
return list 
}

module.exports=creatTable
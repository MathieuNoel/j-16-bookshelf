// Pour une présentation de notre séléction littéraire 
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)
const http = require('http');
const data = require('./list')
const construction = require('./construction')
// console.log('ici',construction)
// console.log(dayjs)

// Séléction de livres incontournables
for(const obj of data) {
    console.log(typeof dayjs().to(dayjs(obj.date)))
    obj.age= dayjs().to(dayjs(obj.date));
    obj.age= parseInt(obj.age.split(' ')[3])   
}

data.sort(function(a, b) {
    return a.age - b.age;
  });

// Création de notre serveur


// Notre serveur sera sur le port 3000
const server = http.createServer((req, res) => {
    let list = `<table><tbody> `;
        // On écrit l'entête de notre page html
        res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge">    <title>Document</title></head><body>');
  
    // On court-circuite l'appel automatique du navigateur au favicon.ico
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    } else if(req.url === '/') {        
        // on va parcourir le tableau hitParade
        list+= construction(data, list)
        list+=`</tbody></table>`
        res.write(`${list}`);
        
      // On écrit le pied de page de notre page html
      res.write('</body></html>');
    }
  
    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  
  
  
    // Corps de la page
  
  
    // On à fini d'envoyer nos informations au client
    // res.end();
  })
  server.listen(3000)

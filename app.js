// Pour une présentation de notre séléction littéraire 
// nous utilisons une page web, il nous faut donc la librairie http
// afin de créer notre serveur
const http = require('http');
// Pour modifier et utiliser les données de temps, on utilise le module dayjs (donc "require")
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime)
// J'importe un module interne que j'ai créé(donc "require")
const data = require('./list')
const construction = require('./construction')


//  solution pour afficher lez livres dans l'ordre croissant de parution
// for(const obj of data) {
//     
// obj.age= parseInt(dayjs().to(dayjs(obj.date).split(' ')[3]));
//        
// }
// autre solution pour afficher les livres dans l'ordre croissant de parution
for(const obj of data) {
   obj.age = parseInt(dayjs(obj.date).format(`YYYY`));   
}
data.sort(function(a, b) {
    return b.age - a.age  ;
  });

// Création de notre serveur



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
  
  
  
   
  
  
    // On à fini d'envoyer nos informations au client
    //  res.end();
  })
  // Notre serveur sera sur le port 3000
  server.listen(3000)

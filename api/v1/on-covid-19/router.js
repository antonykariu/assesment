const http = require('http');
import endpoint from './endpoint';

http.createServer((req,res) =>{
  let url = req.url;
  res.writeHead(200);
  if(url === '/api/v1/on-covid-19/'){
    res.writeHead(200);
    let mydata = JSON.parse(req.body);
    let newdata = endpoint(mydata);
    res.send(JSON.stringify(newdata));
    res.end();
  }
  if(url === '/api/v1/on-covid-19/json'){
    res.writeHead(200);
    let mydata = JSON.parse(req.body);
    let newdata = endpoint(mydata);
    res.send(JSON.stringify(newdata));
    res.end();
  }
  else if(url === '/api/v1/on-covid-19/xml'){
    res.writeHead(200);
    res.send();
    res.end();
  }
  else if(url === '/api/v1/on-covid-19/logs'){
    res.writeHead(200);
    res.send();
    res.end();
  }
  else{
    res.writeHead(404);
    res.end();
  }
}).listen(8000);
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const BookController = require('../controllers/BookController');

class ServerHttp {
  // Expression pour les routes commençant par /api/
  apiRegExp = /^\/api(\/.*|$)/;
  // Expression pour les routes renvoyant le favicon ou dans le dossier public du front
  staticRegExp = /^\/(public|favicon\.png|favicon\.ico)(\/.*|$)/;
  // emplacement du dossier front
  publicFrontFolder = '../front';
  // valeur non renseignée du port
  serverPort = 0;
  
  /**
   * Fonction servant à lancer le serveur express
   */
  launchServer(port) {
    this.serverPort = port;
    this.daemon = express();
    this.daemon.use(bodyParser.json({ limit: '500mb' })); // support json encoded bodies
    this.daemon.use(bodyParser.urlencoded({ extended: true, limit: '500mb' })); // support encoded bodies
    this.daemon.use(this.defineAccess);
    // les routes api
    this.daemon.all(this.apiRegExp, this.onApi.bind(this));
    // les fichiers static
    this.daemon.all(this.staticRegExp, this.onStatic.bind(this));
    this.daemon.all(/.*/, this.onRoot.bind(this));
    // écoute les connexions
    this.daemon.listen(port, this.onServerStarted.bind(this));
  }

  /**
   * Le server est lancé
   */
  onServerStarted() {
    console.log('SERVER STARTED ON PORT ' + this.serverPort);
  }

  /**
   * Definitions des CORS
   * Permet d'éviter que le navigateur refuse la connexion
   */
  defineAccess(req, res, next) {
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // test du navigateur
    if (req.method === 'OPTIONS') {
      res.status(200);
      return res.send();
    }
    next();
  }

  onStatic(req, res) {
    const url = path.resolve(this.publicFrontFolder + req.originalUrl);
    fs.access(url, fs.F_OK, err => {
      if (!err) {
        res.sendFile(url);
      } else {
        res.status(404).end();
      }
    });
  }

  onRoot(req, res) {
    res.sendFile(path.resolve(this.publicFrontFolder + '/index.html'));
  }

  async onApi(req, res) {
    // const url = req._parsedUrl.pathname.replace(/\/$|^\//g, '');
    const url = req._parsedUrl.pathname;
    const method = req.method;
    let json = {};
    if (req.body && req.body.json) {
      try {
        json = JSON.parse(req.body.json); 
      }
      catch (e) { 
        console.error(e); 
      }
      delete req.body.json;
    }
    const body = req.body || {};
    const query = req.query ? { ...req.query } : {};

    // test pour un controleur
    if(url === '/api/book/' && method === 'GET') {
      try {
        const response = BookController.getBook(query, json, body);
        return this.json(res, { data: response || false});
      } catch (err) {
        return this.json(res, { error: '500' }, 500);
      }
    }
    //pour ajouter un livre
    if(url === '/api/book/' && method === 'POST') {
      try{
      const element = await BookController.postBook(query, json, body);
      return this.json(res, { data: element || false});
    }
    catch (err) {
        return this.json(res, { error: '500' }, 500);
      }

    }
    //Modifier totalement les autheurs et titres
    if(url === '/api/book/' && method === 'PUT'){
      try{
        const edit = await BookController.putBook(query, json, body);
        return this.json(res, { data: edit || false});
      }
          catch (err) {
        return this.json(res, { error: '500' }, 500);
      }
    }
    //Modifier partiellement les autheurs et titres
    if(url === '/api/book/' && method === 'PATCH'){
      try{
        const editP = await BookController.patchBook(query, json, body);
        return this.json(res, { data: editP || false});
      }
          catch (err) {
        return this.json(res, { error: '500' }, 500);
      }
    }
    //suppression d'un enregistrement dans la BD
    if(url === '/api/book/' && method === 'DELETE'){
      try{
        const del = await BookController.DeleteBook(query, json, body);
        return this.json(res, { data: del || false});
      }
          catch (err) {
        return this.json(res, { error: '500' }, 500);
      }
    }

    this.json(res, { url, method, json, body, query }, 404);
  }

  json(res, obj, code = 200) {
    res.status(code);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
  }
}

module.exports = new ServerHttp();
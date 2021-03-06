const nunjucks     = require('nunjucks');
const router       = require('./router/router');
const express      = require('express');
const bodyParser   = require('body-parser');

module.exports = function (app) {

    nunjucks.configure('views', {
        autoescape: true,
        express: app
    });

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(router);
};
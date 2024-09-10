const homePageController = require('@controllers/homePage.controller');

module.exports = function(app) {
    app.use('/', homePageController);
};
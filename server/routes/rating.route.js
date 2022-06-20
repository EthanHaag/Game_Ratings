const RatingController = require('../controllers/rating.controller'); 
module.exports = (app) => {
    app.get('/api/rating', RatingController.getRatings);
    app.get('/api/rating/:gameName', RatingController.getByGame);
    app.get('/api/rating/id/:id', RatingController.getById)
    app.post('/api/rating', RatingController.createRating);
    app.put('/api/rating/:id', RatingController.updateRating);
    app.delete('/api/rating/:id', RatingController.deleteRating); 
}
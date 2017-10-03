//var wallposts = require('../wallPostHandler');
var dbQuery = require('../dbQuery');

const wallPostRoutes = (app) => {
    //create wallPost
    app.post('/api/wallpost/:id', (req,res) => {
        let info = [req.session.user.id, req.params.id, req.body.text, req.body.image, req.body.link, req.body.link_text];
        return dbQuery.addPost(info).then(() => {
            return res.json({
                success: true
            });
        }).catch(e => {
            return res.json({
                error: e
            });
        });
    });

    app.get('/api/wallpost/:id', (req, res) => {
        let info = [req.params.id];
        return dbQuery.getWallpostsByUserId(info).then((results) => {
            return res.json({
                success: true,
                posts: results.rows
            });
        }).catch(e => {
            return res.json({
                error: e
            });
        });
    });
};

module.exports = wallPostRoutes;

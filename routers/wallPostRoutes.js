var wallposts = require('../wallPostHandler');
var dbQuery = require('../dbQuery');

const wallPostRoutes = (app) => {
    //create wallPost
    app.post('/api/wallPost/:id', (req,res) => {
        let info = [req.session.user.id, req.params.id, req.body.text, req.body.image, req.body.link, req.body.link_text];
        return dbQuery.addPost(info).then(() => {
            return res.json({
                status: 200,
                success: true
            });
        }).catch(e => {
            return res.json({
                error: e
            });
        });
    });
};

module.exports.wallPostRoutes = wallPostRoutes;

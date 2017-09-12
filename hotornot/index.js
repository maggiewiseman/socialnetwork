const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

const users = [
    {
        id: 1,
        name: 'Leonardo DiCaprio',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg'
    },
    {
        id: 2,
        name: 'Jennifer Lawrence',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Jennifer_Lawrence_SDCC_2015_X-Men.jpg/1024px-Jennifer_Lawrence_SDCC_2015_X-Men.jpg'
    },
    {
        id: 3,
        name: 'Meryl Streep',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Meryl_Streep_at_the_Tokyo_International_Film_Festival_2016_%2832801846044%29_%28cropped%29.jpg/954px-Meryl_Streep_at_the_Tokyo_International_Film_Festival_2016_%2832801846044%29_%28cropped%29.jpg'
    },
    {
        id: 4,
        name: 'Samuel L. Jackson',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Samuel_L._Jackson_SDCC_2014_%28cropped%29.jpg/1024px-Samuel_L._Jackson_SDCC_2014_%28cropped%29.jpg'

    },
    {
        id: 5,
        name: 'John Cho',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/John_Cho%2C_2008.jpg/933px-John_Cho%2C_2008.jpg'
    },
    {
        id: 6,
        name: 'Penélope Cruz',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Pen%C3%A9lope_Cruz_TIFF_2012.jpg'
    }
];

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => res.json({ users }));

app.post('/hot/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    if (user) {
        user.hot = true;
    }
    res.json({
        success: !!user
    });
});

app.post('/not/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    if (user) {
        user.hot = false;
    }
    res.json({
        success: !!user
    });
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function() {
    console.log("I'm listening.")
});

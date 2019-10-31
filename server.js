let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

const expressHbs = require('express-handlebars');

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts',
        extname: 'hbs'
    })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views', 'game.html'))
});

app.post('/summary', (req,res) => {
    let p_score = req.body.scoreField;
    res.render('summary', {layout: false, score: p_score});
});

app.post('/submit', (req,res) => {
    let name = req.body.p_name;
    let score = req.body.p_score;

    res.render('leaderboard', {layout: false, p_name: name, p_score: score})
});

app.listen(7777);


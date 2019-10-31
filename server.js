let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://NateLemke:Passwordlogin3@memorygameleaderboard-ue4hp.azure.mongodb.net/test?retryWrites=true&w=majority";

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
    let score = parseInt(req.body.p_score);

    MongoClient.connect(uri, function(err, client) {
        if(err) {
            console.log("Error connecting to MongoDB");
        }
        console.log("Connected to MongoDB");

        var db = client.db("leaderboardDB");
        var obj = {name: name, score: score};
        db.collection("players").insertOne(obj, function(err,res) {
            if(err) throw err;
            console.log("entry sent");
            
        });

        db.collection("players").find().sort({score:-1}).limit(5).toArray(function(err,result) {
            if(err) throw err;
            console.log(result);
            res.render('leaderboard', {layout: false, players: result});
            client.close;
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {});


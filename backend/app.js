const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const questions = require('./data/questions.json');
const answers = require('./data/answers.json');

app.get('/', (req, res) => {
    res.send(questions);
});

app.get('/answers/:id/:guess', (req, res) => {
    const id = req.params.id;
    const guess = req.params.guess;
    guess == answers.answers[id] ? res.send(true) : res.send(false);
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
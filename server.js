import express from 'express';

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  res.send('Follow the Great Dragon...');
});

app.listen(app.get('port'), () => {
  console.log(`Dragon listening on port ${app.get('port')}`);
});

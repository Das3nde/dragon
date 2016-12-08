import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Follow the Great Dragon...');
});

app.listen(3000, () => {
  console.log('Dragon listening on port 3000...');
});

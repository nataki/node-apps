const express = require('express');
const app = express();
const port = 5001;
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
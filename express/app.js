const express = require('express');
const authRouter = require('./routes/auth');

const app = express();
const port = 5001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/login', authRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
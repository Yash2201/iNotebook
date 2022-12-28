const connectToMongoDb = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongoDb();

const app = express()
const port = 5000

app.use(cors());

app.get('/',(req, res) => {
  res.send('Hello Yash From Express!')
});

// To Get the Request body we need to use the middleware 
app.use(express.json());

// Available Routes !!!
app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));


app.listen(port, () => {
  console.log(`iNotebook is listening on port ${port}`)
})
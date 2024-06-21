import express from 'express';
import bodyParser from 'body-parser';
import routes from '../api/routes';
import { connectDB } from '../db/mongodb';

require('../db/mongodb');

const app = express();

const PORT = process.env.PORT || 3000;

// const server = http.createServer(app);

// For parsing JSON data - For POST Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


app.get('/', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Hello! :)',
  });
});


app.use('/api/v1', routes);


const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`Listening on port ${PORT}`);
  });
  } catch (error) {
    console.log('Something happened while initialising the server: ', error);
  }
};

start();




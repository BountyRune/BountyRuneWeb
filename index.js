import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
const app = express();
app.use(express.static('public'))
app
  .use(bodyParser.urlencoded({
    extended: false,
  }))
  .use(bodyParser.json())
  .use(cors())
  .use(compression())
  ;
app.listen(process.env.PORT || 5000, () => {console.log("Listening to 5000")})
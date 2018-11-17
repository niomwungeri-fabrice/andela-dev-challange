const express = require('express');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

const port = process.env.PORT || 3000;

// permissions
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.get('/', (req, res) => res.send('API root for SendIT application'));


require('./app/routes/routes.js')(app);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`SendIT app listening on port ${port}!`));

const express = require('express');
const coockieParser = require('cookie-parser');
const listEndpoints = require('express-list-endpoints')
const cors = require('cors');

const usersRoutes = require('./routes/users.js');
const workingTimesRoutes = require('./routes/workingTimes.js');
const clocksRoutes = require('./routes/clocks.js');
const teamsRoutes = require('./routes/teams.js');
const unavailabilitiesRoutes = require('./routes/unavailabilities.js');
const globalRoutes = require('./routes/globals.js');

const router = express();
const PORT = 4000;
// const PORT = 5432;

router.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
   "credentials": true
}))
router.use(coockieParser())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/api/users', usersRoutes);
router.use('/api/workingtimes', workingTimesRoutes);
router.use('/api/clocks', clocksRoutes);
router.use('/api/teams', teamsRoutes);
router.use('/api/unavailabilities', unavailabilitiesRoutes);
router.use('/api/', globalRoutes);

router.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});

router.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'text/json');
  // home page works?
  // return routes on home
  res.send(listEndpoints(router));
});

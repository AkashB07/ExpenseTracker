const dotnev = require('dotenv');
dotnev.config();

const  cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
app.use(cors());

const userRoutes = require('./routes/user');
const forogotPasswordRoutes = require('./routes/forgotPassword');
const expenseRoutes = require('./routes/expense');
const reportRoutes = require('./routes/report');
const leaderboardRoutes = require('./routes/leaderboard');

app.use(express.json());

app.use('/user', userRoutes);
app.use('/password', forogotPasswordRoutes);
app.use('/expense', expenseRoutes);
app.use('/report', reportRoutes);
app.use('/leaderboard', leaderboardRoutes);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`))
// });


mongoose
.connect(
  process.env.DB_DETAILS
)
.then(() => {
  app.listen(process.env.DB_PORT);
})
.catch(error => {
  console.log(error)
})


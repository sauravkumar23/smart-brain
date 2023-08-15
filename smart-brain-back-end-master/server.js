const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');


const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
	ssl: {
	    rejectUnauthorized: false
	 }
  }
});


/* below codes were active till it was run on localhost, now to run on heroku, we need to use above code*/
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 5432,
//     user : 'postgres',
//     password : 'Aditya@123',
//     database : 'smart-brain'
//   }
// });

// console.log(db.select('*').from('users'));

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());   // used to clear the error Allow access control origin

app.get('/', (req,res) => {
	res.send('it is working');
})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.listen(process.env.PORT || 3000,() => {
	console.log(`app is running on port ${process.env.PORT}`);
})

console.log(process.env);



/* 
res -- working
signin -- POST -- success/fail
register -- POST -- user
image -- PUT -- user	
/profile/:user ID --- GET -- user
*/
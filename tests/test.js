const requesta = require('requesta');

// let token;

// // login
// requesta('http://localhost:3000/api/auth', 'POST')
//   .body({"email": 'test1@test.com', "password": '12345'}, 'json')
//   .send()
//   .then(function(res) {
//     return res.text();
//   })
//   .then(function(text) {
//     // token = text;
//     console.log(token);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// get all artists
requesta('http://localhost:3000/api/artists', 'GET').send().then(function(res) {
  return res.text();
}).then(function(artists) {
  console.log(artists);
})

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM4NDUyMTFlNjVjYTJiNTYyYzdlYjgiLCJpYXQiOjE1NjM5NzI5ODN9.2zAFMY85AulNKeK4PCAH6y0wQYd3Qwqys-nIWZvidgQ';

// get me
requesta('http://localhost:3000/api/users/me', 'GET')
  .header('x-auth-token', token)
  .send().then(function(res) {
    return res.text();
  }).then(function(user) {
    console.log(user);
  });

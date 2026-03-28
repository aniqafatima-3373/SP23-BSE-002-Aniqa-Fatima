// const express = require('express');
// const app = express();

// // VULNERABLE ROUTE
// app.get('/comment', (req, res) => {
//     const userComment = req.query.content; 
//     // If a user visits: /comment?content=<script>alert('Hacked!')</script>
//     // The browser will execute that script!
//     res.send(`<h1>User Comment:</h1> <p>${userComment}</p>`);
// });

// app.listen(5000, () => console.log("Vulnerable server on port 5000"));

const express = require('express');
const helmet = require('helmet'); // Import Helmet [cite: 69]
const app = express();

// Apply Helmet middleware to set security headers [cite: 70]
app.use(helmet()); 

app.get('/comment', (req, res) => {
    const userComment = req.query.content;
    
    
    res.send(`<h1>User Comment:</h1> <p>${userComment}</p>`);
});

app.listen(5000, () => console.log("Secure server with Helmet on port 5000"));
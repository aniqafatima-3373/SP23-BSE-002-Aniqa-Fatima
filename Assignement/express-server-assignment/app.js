const express = require('express');
const fs = require('fs'); 
const path = require('path');
const app = express();
const PORT = 4000; 


app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    
  
    console.log(`Method: ${req.method}, Route: ${req.url}`);
    
   
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) console.error("Failed to write to log file");
    });
    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to the Express Server!");
});

app.get('/about', (req, res) => {
    res.send("This is the About page.");
});


app.get('/contact', (req, res) => {
    res.send("Contact us at contact@domain.com");
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        res.send(`Hello, ${name}!`); 
    } else {
        res.send("Hello, Stranger!"); 
    }
});


app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.send(`Form submitted! Name: ${name}, Email: ${email}`); 
});


app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong on the server!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
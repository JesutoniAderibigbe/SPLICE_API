const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const PORT = 8000
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');




//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commerce-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//set up middleware 
app.use(bodyParser.json())


//set up routes

app.use('/users', userRoutes);
app.use('/products', productRoutes);


// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));


//set up server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})



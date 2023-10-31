const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/db_passport_jwt')
.then(()=>console.log("MonogoDB Connect successful"))
.catch(()=>console.log("Connection to MongoDB failed"))

mongoose.connection.on('connected', () => {
   console.log('Database Connection successful');
})

mongoose.connection.on('error', (err) => console.log(err.message));

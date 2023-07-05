const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/practice_3",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected")
}).catch((error)=>{
    console.log(`Not Connected`, error);
})
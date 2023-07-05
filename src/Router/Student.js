const express = require('express')
const router = express.Router()
const Student = require('../Model/Student')
const {sendmail, upload} = require('../Controller/Student')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.get('/student', async (req,res)=>{
    const student = await Student.find();
    res.send(student);
})

router.get('/student/:id', async(req,res)=>{
    const student = await Student.findById(req.params.id);
    res.send(student);
})

router.post('/student', async(req,res)=>{
    try {
        console.log(req.body);
        const password = await bcrypt.hash(req.body.password, 10);
        const student = await Student.create({
            name:req.body.name,
            email:req.body.email,
            password:password,
            address:req.body.address
        });
        res.send(student);
    } catch (error) {
        res.send(error, 'duplicate key or email');
    }

})

router.put('/student/:id', async(req,res)=>{
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(student);
})

router.patch('/student/:id', async(req,res)=>{
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.send(req.body)
})

router.delete('/student/:id', async(req,res)=>{
    const student = await Student.findByIdAndDelete(req.params.id);
    res.send(student);
})

router.post('/uploads',upload.single('photo'),(req,res)=>{
    console.log(req.body) 
    console.log(req.file)
    res.json({status:"Image Uploaded Successfully"})
})

router.post('/uploads/multiple', upload.array('photo',5),(req,res)=>{
    res.json({status:"Image Uploaded Successfully"})
})

router.get('/uploads/:name', (req,res)=>{
    res.sendFile(path.join(__dirname +'../../../uploads/'+req.params.name));
})

router.post('/sendmail', sendmail)

module.exports = router

const nodemailer = require('nodemailer')
const multer = require('multer')

const sendmail = (req,res) => {
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'',
            pass:''
        }
    })

    const mailOption = {
        from :'',
        to:'',
        subject:'Testing Mail',
        text:'Welcome to the world of email',
        html:`<b>Hello Dear, <br/><br/> Test again!!`
    }

    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log(`Email has been sent`, info.response)
        }
    })
}

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            console.log(file)
            cb(null, Date.now()+"-"+file.originalname);
        }
    }),
    // fileFilter:function(req,file,callback){
    //     var ext = path.extname(file.originalname);
    //     if(ext!=='.png' && ext !=='.jpg' && ext !=='.jpeg'){
    //         return callback(new Error('Only images are allowed !!'))
    //     }
    //     callback(null, true);
    // },
    // limits:{
    //     fileSize: 1024 * 1024
    // }
})

module.exports = {sendmail, upload};
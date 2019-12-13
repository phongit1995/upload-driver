require('dotenv').config();
import * as express from 'express' ;
import * as bodyParser from 'body-parser';
import * as multer  from 'multer';
import * as GoogleDriveStorage from 'multer-google-drive';
import * as drive from './google/index';
let stogare = GoogleDriveStorage({
    drive:drive,
    parents:'1XSnU_Ux61wZZfep49smFR7WjN2E2UF-e',
    fileName: function (req, file, cb) {
        console.log(file);
        let filename = `test-${file.originalname}`;
        cb(null, filename);
      }
})
let upload = multer({storage:stogare});
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/upload',upload.single('anh'),(req,res)=>{
    console.log(req.file);
    console.log('phong');
    res.render('image',{image:req.file.fileId});
})
app.listen(process.env.PORT,()=>{
    console.log('server listen port:' + process.env.PORT);
});
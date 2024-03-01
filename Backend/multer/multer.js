import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import  path  from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let storage

try {
     storage = multer.diskStorage({
        destination:function(req, file, cb){
            cb(null, path.join(__dirname, "..", "uploads"));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
          },
    })
   
} catch (error) {
    console.error(error.message);
}

export const upload = multer({ storage: storage })
import fs from "fs"
import multer from "multer"
import path from "path"

//no need for the specific function here since the multer itself is the middleware 
//create the config for backend disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const updatedPath = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(updatedPath))
        fs.mkdirSync(updatedPath, { recursive: true });
        cb(null, updatedPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split('.').pop(); // get file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
    })

const upload = multer({ storage: storage })

export const handleFileUpload = upload.single("image"); //

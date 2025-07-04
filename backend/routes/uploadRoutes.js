import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/') // null is for error
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) // null is for error, file.fieldname is the name of the field in the form
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/; // allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // check extension
    const mimetype = filetypes.test(file.mimetype); // check mime type

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!'); // error message
    }
}

const upload = multer({
    storage,
})

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}` // return the path of the uploaded file
    })
 })

export default router;
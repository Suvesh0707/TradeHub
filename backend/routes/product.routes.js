import express from 'express';
import multer from 'multer';
import { uploadProduct, deleteProduct, getProduct, getAllProducts } from '../controllers/product.controller.js';
import protectRoute from '../middlewares/protect.route.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/uploadproducts', protectRoute, upload.single('image'), uploadProduct);  
router.get('/getproducts', protectRoute, getProduct);                  
router.get('/getallproducts', protectRoute, getAllProducts);                  
router.delete('/deleteproducts/:productId', protectRoute, deleteProduct);        

export default router;

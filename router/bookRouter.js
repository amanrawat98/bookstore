import express from 'express';
import { createBook, deleteBook, getBook, updateBook } from '../controller/bookControler.js';
const router = express.Router();
import { userAuthorization } from '../auth/userauth.js';

router.post('/createbook',userAuthorization,createBook);
router.get('/allbooks',getBook);
router.delete('/deleteBook',deleteBook);
router.put('/updatebook/:bookid',updateBook);




export default router;
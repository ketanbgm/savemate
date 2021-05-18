import express from 'express';
import controller from '../controllers/merchant';

const router = express.Router();

router.post('/merchants', controller.createMerchant);
router.get('/merchants', controller.getAllMerchant);
router.get('/merchants/:id', controller.getAllMerchant);


export = router;

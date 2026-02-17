const express = require('express');
const  trajeCtrl = require('../controllers/traje.controller');
const router = express.Router();


router.get('/', trajeCtrl.getTrajes);
router.get('/traje/:id', trajeCtrl.getTraje);
router.post('/añadir', trajeCtrl.addTraje);
router.put('/:id', trajeCtrl.updateTraje);
router.delete('/:id', trajeCtrl.deleteTraje);

module.exports = router;
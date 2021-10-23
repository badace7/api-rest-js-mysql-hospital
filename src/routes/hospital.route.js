const express = require('express');
const awaitHandlerFactory = require('../middleware/awaitHandleFactory.middleware');
const router = express.Router();
const MedecinController = require('../controllers/MedecinController');

router.get(
    '/medecins',
    awaitHandlerFactory(MedecinController.getAllMedecins)
);

router.get(
    '/medecins/:id',
    awaitHandlerFactory(MedecinController.getOneMedecin)
);


router.post(
    '/medecins',
    awaitHandlerFactory(MedecinController.addMedecin)
);

router.delete(
    '/medecins/:id',
    awaitHandlerFactory(MedecinController.removeMedecin)
);


router.put(
    '/medecins/:id',
    awaitHandlerFactory(MedecinController.modifiateMedecin)
);

module.exports = router;
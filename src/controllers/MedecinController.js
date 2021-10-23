const MedecinModel = require('../models/MedecinModel');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();




class MedecinController {


    getAllMedecins = async (req,res,next) => {

        const medecinList = await MedecinModel.medecinsList();


        if (!medecinList.length) {
            throw new HttpException(404, 'Medecins not found');
        }
        

        res.send(medecinList);

    }

    getOneMedecin = async (req, res, next) => {

        const id = parseInt(req.params.id);

        
        const medecin = await MedecinModel.medecin(id);
        console.log(medecin);
        
        if (!medecin.length) {
            throw new HttpException(404, 'Medecin not found');
        }

        res.send(medecin);
    }

    addMedecin = async (req, res, next) => {


        const body = req.body;

        const medecin = await MedecinModel.createMedecin(body);

        res.send(medecin);

    }

    removeMedecin = async (req, res, next) => {

        const id = parseInt(req.params.id);

        console.log(id);

        const medecin = await MedecinModel.deleteMedecin(id);

        res.send(medecin);

    }


    modifiateMedecin = async (req, res, next) => {

        const id = parseInt(req.params.id);

        const body = req.body;

        const medecin = await MedecinModel.updateMedecin(id,body);

        res.send(medecin);

    }

}

module.exports = new MedecinController;
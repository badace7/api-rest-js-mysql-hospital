const database = require('../db/db-connection');


class MedecinModel {

    #tableName = 'MEDECINS';

    medecinsList = async () => {
        const sql = `SELECT * FROM ${this.#tableName};`; 
        return await database(sql);
    }

    medecin = async (id) => {

        const sql = `SELECT * FROM ${this.#tableName} WHERE id_medecin=${id};`; 
        return await database(sql);

    }
  
    createMedecin = async (body) => {


        const {nom_medecin, prenom_medecin, id_service} = body;

        const sql = `INSERT INTO ${this.#tableName} (nom_medecin, prenom_medecin, id_service) VALUES ('${nom_medecin}', '${prenom_medecin}', ${id_service});`;
        return await database(sql);

    }


    deleteMedecin = async (id) => {

        const sql = `DELETE FROM ${this.#tableName} WHERE id_medecin=${id};`;

        return await database(sql);

    }


    updateMedecin = async (id, body) => {

        const {nom_medecin, prenom_medecin ,id_service} = body;

        const sql = `UPDATE ${this.#tableName} SET nom_medecin='${nom_medecin}', prenom_medecin='${prenom_medecin}', id_service=${id_service} WHERE id_medecin=${id};`; 

        return await database(sql);

    }

    

}

module.exports = new MedecinModel;
const dotenv = require('dotenv');
dotenv.config();
const mysql2 = require('mysql2');


class DBConnection {

    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.checkConnection();
    }
    
    checkConnection() {
        this.db.getConnection((err, connection) => {
            if(err) {
            
                switch (err.code) {
                   case 'PROTOCOL_CONNECTION_LOST':
                       console.error('Database connection was closed.'); 
                   break;
                   
                   case 'ER_CON_COUNT_ERROR':
                       console.error('Database has too many connections.');
                   break;

                   case 'ECONNREFUSED':
                       console.error('Database connection was refused.');
                   break;
                }
            
            } else if(connection) {

                connection.release();

            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                (error) ? reject(error) : resolve(result);
            }
            
            // Execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });;
    }

}

const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;
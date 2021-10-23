const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const routes = require('./routes/hospital.route');


// Init express
const app = express();
// Init environment
dotenv.config();

// Parse requests of content-type: application/json
// Parses incoming requests with JSON payloads
app.use(express.json());
// Enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());


const port = Number(process.env.PORT || 3331);


app.use(routes);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, "Endpoint Not Found");
    next(err);
})

// Error middleware
app.use(errorMiddleware); 


// starting the server
try {

    app.listen(port, () => console.log(`Server running on port ${port}`));

} catch (err) {

    console.log(err);

}
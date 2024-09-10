const express = require('express');
const cors = require('cors');
const { PassThrough } = require('stream');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.middlewares();
        this.routes();
    }
    routes(){
        // this.app.use("/carroussel", require('../routes/carroussel.controller.js'));
        this.app.use('/forms', require('../routes/form.routes'));
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    listen(){
        this.server.listen(this.port, () =>{
            console.log("Server running on port", this.port);
        })
    }
}
module.exports = Server;
const express = require('express');
const cors = require('cors');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.middlewares();
        this.routes();
    }
    routes(){
        this.app.use('/prueba', require('../routes/pruebas.routes'));
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    listen(){
        this.server.listen(this.port, () =>{
            console.log("The fucking service is running :v in", this.port);
        })
    }
}
module.exports = Server;
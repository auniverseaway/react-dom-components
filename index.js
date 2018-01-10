const express = require('express');
const app = express();

export default class WebServer {
    constructor() {
        app.use(express.static('.'));
        this.server = app.listen(3000, () => console.log('Listening on port 3000!'));
    }

    close() {
        this.server.close(() => console.log('Closing port 3000!'));
    }
}
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({
    limit: '50mb',
    urlencoded: {
        extended: false,
    },
    type: 'application/json',
    /**
     * Verify function for bodyParser.json, to save the raw body of the request
     * in req.rawBody. This is needed for the signature validation.
     * @param  {Object} req  The request object
     * @param  {Object} res  The response object
     * @param  {Buffer} buf  The raw body of the request
     */
    verify: (req, res, buf) => {
        if (buf && buf.length) {
            req.rawBody = buf.toString();
        }
    }
}));

let api = require('./Application/routes/api');
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.use('/api/vehicle', require('./Application/routes/vehicle'));
app.use('/api/rent', require('./Application/routes/rent'));

app.use(express.static('./Application'));

const config = require('./Application/config/config');
const db = require('./Application/config/db');

db(config.development);
// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
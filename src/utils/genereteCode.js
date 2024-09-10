const crypto = require('crypto');
const genereteCode = () => {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
}
module.exports = genereteCode;
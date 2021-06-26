'use strict';

let validator = {
    isValidAddress: (address) => {
        var reg = /^\d{2,3}\.\d{2,3}\.\d{1,3}/;
        if(address.match(reg))
            return true;
        else 
            return false;    
    }
}

module.exports = validator;
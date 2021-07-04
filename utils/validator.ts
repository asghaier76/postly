'use strict';

export const validator = {
    isValidAddress: (address: string) => {
        const reg = /^\d{2,3}\.\d{2,3}\.\d{1,3}/;
        if(address.match(reg))
            return true;
        else 
            return false;    
    }
}
const assert = require('assert')
const chai = require('chai');  
const expect = chai.expect; 
const { postly } = require('../src/main');
const errors = require('../constants/errorcodes')

var validTestCases = [
    {address: "10.08.737", response : {long: 32.89437638800007,lat: 13.20280813100004, address: "10.08.737"}, plusCode: "8F4MV6V3+Q4", message: "8F4MV6V3+Q4" },
    {address: "10.44.66", response : {long: 32.885625367000046,lat: 13.20509224600005, address: "10.44.66"}, plusCode: "8F4MV6P4+72", message: "8F4MV6P4+72" },
    {address: "10.10.1", response : {long: 32.881046592000075,lat: 13.166637913000045, address: "10.10.1"}, plusCode: "8F4MV5J8+CM", message: "8F4MV5J8+CM" },

]

var invalidTestCases = ["10.0822.737","A10.44.66","10.44","10-44-66","10,44,66"]

describe('Valid Test Cases', function(){

    it("should resolve to the valid GPS Coordinates", function() {
        validTestCases.forEach( async (testVector) => {
            const res = JSON.stringify(await postly.addressToCoordinates(testVector.address));
            const val = JSON.stringify(testVector.response);
            assert.strictEqual(res, val);
        });
    });

    it("should resolve to valid Plus Code", function() {
        validTestCases.forEach( async (testVector) => {
            const res = await postly.addressToPlusCode(testVector.address);
            const val = testVector.plusCode;
            assert.strictEqual(res.gpluscode, val,testVector.message);
        });
    });

    it("should retrun address is valid", function() {
        validTestCases.forEach( async (testVector) => {
            assert.strictEqual(postly.isAddressValid(testVector.address), true);
        });
    });

    it("should retrun address is invalid", function() {
        invalidTestCases.forEach( async (testAddress) => {
            assert.strictEqual(postly.isAddressValid(testAddress), false);
        });
    });

});
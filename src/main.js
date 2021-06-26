'use strict';
const configs = require('../constants/endpoints')
const errors = require('../constants/errorcodes')
const validator = require('../utils/validator')
const axios = require('axios');

/**
 * @typedef {Object} LOC
 * @property {number} lat - Latitude 
 * @property {number} long - Longitude
 * @property {string} address - Libyan Post Address
 */

/**
 * Resolves the Libyan Post Address into GPS Coordinates
 * @param {string} lyPostAddress - Libyan Post Address
 * @return {LOC} coords - The lat/long JSON object.
 */
async function addressToCoordinates(lyPostAddress) {    
    let response = {};

    // check if lyPostAddress is specified or not
    if(!lyPostAddress)
        throw errors.ERROR_LY_POST_ADDRESS_NOT_SPECIFIED;

    // check if lyPostAddress is of valid format or not    
    if(!validator.isValidAddress(lyPostAddress))
        throw errors.ERROR_INVALID_LY_POST_ADDRESS;

    // query the API for the address using Libya Post API 
    try {
        const endpoint = configs.postlyAPI.mainURL+configs.postlyAPI.searchEndpoint;
        response = await axios.get(endpoint+lyPostAddress);
    } catch (error) {
        throw errors.ERROR_LY_POST_ADDRESS_NOT_FOUND;
    }

    // Return the Object containg the lat, long and address
    return response.data;
}

/**
 * @typedef {Object} PlusCode
 * @property {string} address - Postal Code Address 
 * @property {string} gpluscode - Goole Plus Code
 */

/**
 * Resolves the Libyan Post Address into Google Plus Code
 * @param {string} lyPostAddress - Libyan Post Address
 * @return {PlusCode} pluscode - Google Plus Code.
 */

async function addressToPlusCode(lyPostAddress) {    
    let response = {}

    // check if lyPostAddress is specified or not
    if(!lyPostAddress)
        throw errors.ERROR_LY_POST_ADDRESS_NOT_SPECIFIED;

    // check if lyPostAddress is of valid format or not    
    if(!validator.isValidAddress(lyPostAddress))
        throw errors.ERROR_INVALID_LY_POST_ADDRESS;

    // query the API for the address using Libya Post API 
    try {
        const lypost_endpoint = configs.postlyAPI.mainURL+configs.postlyAPI.searchEndpoint;
        const gplus_endpoint = configs.googleCodeAPI.mainURL+configs.googleCodeAPI.addressEndpoint;
        const lypostResponse = await axios.get(lypost_endpoint+lyPostAddress);
        response = await axios.get(gplus_endpoint+lypostResponse.data.long+','+lypostResponse.data.lat)
    } catch (error) {
        throw errors.ERROR_LY_POST_ADDRESS_NOT_FOUND;
    }

    // Return an Object containing the supplied libyan post address and its corresponsing Pluse Code
    return {address: lyPostAddress, gpluscode: response.data.plus_code.global_code};
}

/**
 * Check if the provides Address has valid format
 * @param {string} lyPostAddress - Libyan Post Address
 * @return {boolean} valid - Address valid, True/False .
 */
function isAddressValid(lyPostAddress){
    // check if lyPostAddress is of valid format or not    
    if(!validator.isValidAddress(lyPostAddress))
        return false
    return true
}

const postly = { 
    addressToCoordinates,
    addressToPlusCode,
    isAddressValid
}

module.exports = {postly} 
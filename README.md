# PostLy Lib

This package is a javascript library used to resolve Libya Post addresses into GPS coordinates and Google Plus Codes.

## Install dependencies

Supported envirnoment is 

    - node version > 8.9.4
    - npm version > 5.6.0

Two dependcies are required mocha and chai

1. Install Dev dependencies

```bash
npm install --save-dev mocha
```

2. Install other dependcies

```bash
npm install
```

## Running Unit Tests

The unit test includes general cases for testing resolving the address into GPS ccordinates and Google Plus codes and also to validate address format

To run the unit test

```bash
npm test

entry-point: index.js
# Delta Encoder

- [Delta Encoder](#delta-encoder)
  - [Introduction](#introduction)
  - [Demo](#demo)
    - [Development mode](#development-mode)
    - [Local production mode](#local-production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Usage](#usage)

[![Delta Encoder is MIT licensed](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](#)

## Introduction
Delta Encoder - is a Full stack application that handles the Delta string encoding/decoding.

This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend.

The input string can be given directly as text input / text file URL / file upload from computer.

The back-end exposes the following routes:
- `/compress`
  - Accept content-type: *multipart/form-data*
  - Body: { data: blob }
  - Response: Encoded string
- `/decompress`
  - Accept content-type: *multipart/form-data*
  - Body: { data: blob }
  - Response: Decoded string

## Demo
- Continuous integration via [Netlifly](https://delta-encoder.netlify.com/) [![Netlify Status](https://api.netlify.com/api/v1/badges/3413de6d-079a-410d-8863-a29eeea5600c/deploy-status)](https://app.netlify.com/sites/delta-encoder/deploys)
  - Front-end: https://delta-encoder.netlify.com [![Front-end endpoint status](https://img.shields.io/website-up-down-green-red/https/delta-encoder.netlify.com.svg)](https://delta-encoder.netlify.com)
  - Back-end: https://delta-encoder.netlify.com/.netlify/functions/serverless [![Back endpoint status](https://img.shields.io/website-up-down-green-red/https/delta-encoder.netlify.com/.netlify/functions/serverless.svg)](https://delta-encoder.netlify.com/.netlify/functions/serverless)

    - The back-end is limited to a FREE plan, thus there is a limit of 10 seconds processing time per request, which might not be enough time to upload very big file (no compression before uploading was implemented)

There is existing data set hosted at the root path, which can be used as test data. Simply enter one of the following URLs: `/5000-words.txt` | `/10000-words.txt` | `/50000-words.txt`

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot module reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.
- Front-end: http://localhost:3000/
- Back-end: http://localhost:8080/

### Local production mode

In the local production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/tu-tran/delta-encoder

# Go inside the directory
cd delta-encoder (or ls delta-encoder)

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

- `src`: Source code
  - `client`: Front-end code (React) and assets
  - `server`: Back-end code (Node.js/Express). The `.env` file at the root folder will define the port of the back-end server and the base path of all the API
    - `functions`: The serverless back-end code for deployment as lambda functions to Netlify
- `dist`: Build output (production)
  - `functions`: Serverless functions for deployment to Netlify
- `public`: Static assets (e.g. sample test data...)

### Usage

- After starting the development server, the front-end application will be started at http://localhost:3000 and the back-end is hosted at http://locahost:8080.
- Navigate to the front-end application, select one of the three options to send the input to the back-end (via direct text input, URL to text file or local file upload)
- Click "Compress" to compress the string or "Decompress" to decompress the string
  - The output will be shown inside the right top-most text area. In case of invalid data/internal errors, the output box will be highlighted with red border and error message
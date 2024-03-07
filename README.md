
# Restful-booker
## Overview
This project implements an API test suite using Playwright, a Node.js library for API Automation. The test suite includes various test cases for CRUD operations on a booking system API. The name of API is **[restfull-booker](https://restful-booker.herokuapp.com/apidoc/index.html)**



# Required npm Packages
- faker-js
- luxon
- winston
- nyc
- allure-playwright

  
# Folder Structure
- **util** :- Contains `DataGenerator` and `logger` file.
- **allRequests** :- Includes modules for All HTTP Request(*GET* ,*POST*, *DELETE*,*PUT*, *PATCH*) and generating Authentication Token(*authToken*).
- **data** :- Contains `DataOne.json` file.
- **spec** :- Contains `api_test.spec.ts` file.

# Files Description
- **getRequest.ts, postRequest.ts, deleteRequest.ts, putRequest.ts, patchRequest.ts** In all these files implementing the functions for GET, POST, PUT, PATCH, DELETE respectively and validating response through assertions.
- **authToken.ts** implements the `token` function to obtain the authentication Token. 
- **dataOne.json** store all the data required for running different API requests and assertions.
- **api_test.spec.ts** contains test suite and all different test cases for CRUD operations.
- **dataGenerator.ts** generates random booking data using the `faker-js` library and `luxon`.
- **logger.ts** contains script for logging information and errors into `logs` file.

# Reports
- Allure Report
- HTML Report

# Other Implementation
- logger
- allure
- Environment variable

# Conclusion
  This project demonstrates how to implement an API test suite using Playwright in TypeScript. It covers various aspects such as generating mock data, making HTTP requests, handling authentication, and validating responses.





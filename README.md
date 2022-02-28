# Express

For this activity, you will fulfill the following requirements:

## FIRST STEP

Fork & clone this repository

## Project Specs
- Appropriate unit testing using the `SuperTest` framework should guide your development.
- Create a RESTful API that supplies data from the `dummy.csv` file and `data` directory.
  - All CRUD (Create, Read, Update, Delete) methods should be handled
  - Any errors should be gracefully resolved
    - Errors involving the dummy data should be handled via [Node.js error-first callback syntax](https://www.geeksforgeeks.org/error-first-callback-in-node-js/#:~:text=16%20Feb%2C%202022-,Error%2DFirst%20Callback%20in%20Node.,returned%20by%20the%20first%20argument.)
- Multiple endpoints should handle various routes
  - `/books` route
    - `GET` request should return an array of all books
    - `POST` request should add a new book object to the `dummy.csv` file and a new csv file that correlates to new `id` to the `data` directory.
  - Specific id routes (i.e. `http://localhost:8080/books/2`) 
    - `GET` request should return data for the specific book from the `data` directory
    - `PATCH` request should update the book data in the `dummy.csv` file and in the csv file in the `data` directory that matches the `id` passed. The updated object should be sent back with the response.
    - `DELETE` request should remove the book data in the `dummy.csv` file and delete the csv file in the `data` directory that matches the `id` passed. A confirmation message should be sent back with the response.
- Any unauthorized methods to specific endpoints should send back an appropriate error message with the response.

## Stretch Goals

- Create an endpoint that allows for filtering books by their genres. The filtering should be dictated by query parameters passed in the URL.
- Create a front-end to display the data coming from your API.

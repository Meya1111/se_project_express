# WTWR (What to Wear?): Back End
The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Description of the project and its functionality
This repository contains the Node.js/Express **back end** for the WTWR application.  
It exposes a REST API that lets you create and read users and clothing items, connects to a MongoDB database, and includes basic error handling. The server will later be extended with authentication and authorization.

## Technologies and techniques used
- Node.js, Express
- MongoDB, Mongoose (schemas, validation)
- ESLint (Airbnb base) and Prettier for code style
- Nodemon for hot reload in development
- Environment variables via `process.env`
- Custom error classes and centralized error handling

## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

 ## Project Pitch Video
 
 Check out [this video] https://drive.google.com/file/d/1yOnqQ_8j5UR4J0BnaYM1kII8DpiO9ErP/view?usp=sharing , where I describe my 
 project and some challenges I faced while building it.
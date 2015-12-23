# Sprite-Payment-OAuth-JWT
Its a Sprite Payment APIs sample using  node.js, jsonwebtoken and jquery

# Development Environment Setup

 Pre-requisites:
 -  Node.js
 - MongoDB

Install **MongoDB**  and  **NodeJS** x64 distributions from its websites.

# Runing Application.
 
Move to the Project Directry

```bash
$cd projectDirectry
```

- Installing all the Dependencies 
 
```bash
$npm install
```

- Adding MongoDb URL for DataBase Conntection
Move to project folder then
```bash
$cd config/
```
Then open the dbCollection.js file and put your data base URL 
```bash
  mongoose.connect('Data base URL');
```
- Running in Project
Move to project folder then
```bash
$ node bin/www
```
 - Server is Developed on localhost:3000 for API
 - localhost:3000/admin for Web protal
 
#Demo
https://sprite-sample.herokuapp.com/admin/

#License
MIT


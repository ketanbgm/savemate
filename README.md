# Savemate


Savemate's Backend code challenge 

# Installation!

  - Clone or download the repository
  - You need to setup/config the environment variables for database connection
 ### For linux 
#### run cmd  :  nano ~/.bashrc
OR
#### Create .env file in root directory

**Copy and paste bellow lines in bashrc/.env file file, and change the credentials as per your system**
```sh
    export MYSQL_USER="root"
    export MYSQL_PASS="root"
    export MYSQL_HOST="localhost"
    export MYSQL_DATABASE="savemate"
```

Then run 
```sh
  $ source ~/.bashrc
  $ npm install
  $ nodemon source/server.ts 
 ```
 
 **Import the database tables from .sql file which contains in repository**
 
# Test case

RUN below command to run the test cases
```sh
$ npm test
```

# API's

 ##### 1) GET /merchants : Return the list of all merchants, with ordering, sorting and pagination capabilities
 
 Refer below table
 ```sh
Request query 
1) npp = No of records per page to be displayed, default it take 10 records per page
2) page = page number, default it take 1st page
3) orderBy = if 1 then it will list in ascending order, else order by descending
```
 ##### 2) GET /merchants/{id} :  return the details of the merchant identified by the id
 Refer below table
  ```sh
Request params 
1) {id} = id of the nerchant
```
##### 3) POST /merchant : Add new merchant
Refer below table
 ```sh
Request body 
    {
        "name" : "dummy", 
        "description" :"dev",
        "cashback" : "4a",
        "slug" : "aaa", 
        "merchant_redirection_url" : "hhtps://localhost:15537",
        "country":"ENgland"
    }
```
 ### Important
 ##### Every api need authentication key which should be sent through headers
 ##### key : Authorization
 ##### value : Basic 5488cb9ef9244c42abc0650dec68fba1
 
 Api key is hardcoded in middleware file, we can also store the api key in database.

## How to deploy your application
##### Docker Container
1) Create MySQL Container, I am using MySQL image to  build this container.
2) Create docker-compose.yaml file. This file we will be specifying our docker app.
3) We will be create a Dockerfile, this will help us to create image for NodeJS App
4) Now we will define our NodeJS App on docker-compose.
5) we will execute this command to start our apps: docker-compose up


# Documentation

Postman Collection  : **https://www.getpostman.com/collections/676234fe54347ed6e10e**





# Welcome to ER MarketPlace

This is Group 5's CS351 Project 2 GitHub Repository.
# About:
* This is a dynamic web application built with NodeJS, Express, and MongoDB for a marketplace. It allows users to create accounts, browse products, add items to a shopping cart, and checkout.

## Members:
* Ellmaer Ranjber
* Austin Ly
* Quy Phan
* Arnold Portela

## Project Requirements:
* Create a MongoDB Database
* createAccount.html
* account.html
* product pages + shopping
* cart
* shopping cart check out

## Responsibilites: 
* Create a MongoDB Database -> (Ellmaer Ranjber)
* createAccount.html -> (Ellmaer Ranjber)
* account.html -> (Ellmaer Ranjber)
* product pages + shopping -> (Quy Phan + Arnold Portela)
* cart -> (Austin Ly)
* shopping cart check out -> (Quy Phan + Arnold Portela)

# About Each Section

### Create a MongoDB Database -> (Ellmaer Ranjber)
* I created the MongoDB Database and created a database called "mainDataBase" and two collections one by the name of "users" and the other "orders",
* ![image](https://github.com/mjollnir03/CS351-Project2/assets/98365394/fc150bcc-63da-4a9a-9808-b1b66d6dc64d)
* The MongoDB Database will allow anyone with any IP connect due to the special config on "0.0.0.0/0" in the network access settings
* The MongoDB Connection String is stored in the "./controllers/dataBaseConnection.js" and properly exports the string to be used in the other controllers such as "loginRoute.js"
* The file "dataBase.js" is a standard of how we will be attempting to accesss the MongoDB Database throughout the entire project, that follows the following image,
* ![image](https://github.com/mjollnir03/CS351-Project2/assets/98365394/f3a89e1c-71f0-4af5-986d-e6d67088901f)

### createAccount.html -> (Ellmaer Ranjber)
* I created an Express.js Router in "./routes/loginRoute.js" and is usedin the "./app.js", that will deal with the HTTP POST request in the server with the route titled "/attemptLogin"
* The ```var cartRouter = require('./routes/cartRoute');``` imports the router into the app; and the ```app.use('/attemptLogin', loginRouter);``` is what uses it and listens to any HTTP REQUESTS to that path/route
* The router will call this function everytime the user tries to attempt to login,
* ![image](https://github.com/mjollnir03/CS351-Project2/assets/98365394/7d124cb5-409d-476c-8051-c491ff829d5e)
* Then it will lookup the provided email and password in the "mainDataBase" "users" collection and see if it exists or not,
* ![image](https://github.com/mjollnir03/CS351-Project2/assets/98365394/e75c375f-ac59-4ef4-8600-d4487ba73676)
* Based on whether or not the user can or can't login one of two things will happen in the './views/loginResult.ejs" file that I created to dynamically display information to the client
* Option 1 will be chosen by the controller if a user is found, which then the account will be logged in ( and the email will be saved using Express-Sessions) and then redirecting them to the websites product catalog
* Option 2 will be chosen by the controller if a user is not found, then telling the user and redirecting them back to the login page, the following is an image of the "./views/loginResult.js",
* ![Screenshot 2024-04-25 133715](https://github.com/mjollnir03/CS351-Project2/assets/98365394/6f2ed508-a6a9-4081-b9ef-0ca6f39b6931)

### account.html -> (Ellmaer Ranjber)
* Talk about your part

### product pages + shopping -> (Quy Phan + Arnold Portela)
* Talk about your part

### cart -> (Austin Ly)
* I mainly worked on the backend for the cart system and the express-sessions. 
* I created the cartController.js file in the controller directory as well as the cartRoute.js in the routes directory.
* I've also editing a bit in the app.js file to set up the sessions variables and just the basic routing to be able to use the cartRoute. Then I've also edited the loginController.js a bit to be able to resume the shopping cart for the logged-in user.
* I've set up the MongoClient database so that whenever a user adds something to the cart, it'll reflect on the MongoClient database.
* In the cartController.js file, I've created a function to be able to add products the session's cart and the function to remove products and clear the cart.
* In the cartRoute.js file, I just set up the basic routing to call the above-mentioned functions.
* Everything cart related is all session based. The MongoClient Database is just there to be able to restore the cart and as back up for the cart. Each cart is designated to individual users. If a user isn't logged in, a session cart will still be there, but it won't be backed up in the MongoClient database.


### shopping cart check out -> (Quy Phan + Arnold Portela)
* Talk about your part


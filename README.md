# Car Inventory Management System

This Project was created to help start a inventory system for a Car Dealership. This project allows the adding, editing, and viewing of inventory. 

## Built With

### languages:
- html
- css
- javascript
- node.js

### packages:
- sqlite3
- express


## Installation: 

To Install the project navigate to a directory in your command line and type `git clone https://github.com/jase-k/car_inventory_management` 

After installation type the follow commands: 

```
cd car_inventory_management
node server.js

```
The app will load on localhost:3500 in your browser

## Using the App

On intial load, you will be brought to a blank blue screen with a header. The header contains 'Inventory' and 'Add Car' tabs to navigate the application. 

The 'Inventory' navigation will take you to the page that loads the whole car inventory. 

The 'Add Car' navigation will take you to the form to add a car to your inventory. 

### Add Car

In the 'Add Car' Form you will be required to fill out make, model, price, year, color, description. Image URL is optional 

**Image container is NOT meant  upload files. It will only render image URLS**
*Since this is used for internal use of the dealership, a stock car image is all that is neccessary. This image can be googled and the image address be copied and pasted into the Image container*

Clicking `submit` will add the car to the database

### Edit Car

To Edit a car, click the listing in the 'Inventory Page'. This will navigate you to a form identical to the 'Add Car' form. The values from the listing will automatically be the values of the form. 
You can edit these as needed and click `submit` to save changes. 

### Delete Car

Currently this option is unavailable. If a car needs to be deleted, you can click on the listing and change the information to a car that needs to be added. This will replace the car data with the new data

### Sort Inventory

Currenlty this option is unavailable. Inventory is listed in the order it is Added. 



# arcaNet-Shop

## Group and members
Group 7

* Gabriel Antunes Afonso de Araujo - 14571077
* Thales Sena de Queiroz - 14608873
* Thiago Zero Araujo - 11814183

## Introduction

This project is the final assignment for the discipline SCC0219-2025 (Introduction to Web Development) and aims to develop an Online Store as a full web application where customers can view, interact and buy products of a given theme. In order to make things more interesting, we chose to create an Tarot Card and supplies store.

## Requirements

As an online store, this system is required to be developed as an Web Application with intuitive and accessible user interfaces, as well as many functionalities to manage, buy and view products; login and register new users; complete purchases in a chard with valid Card Numbers. In the following is a detailed list of this requirements:

1. User specifications:
    - Two types of users: Administrators and clients.
    - Administrators are responsible for registering/managing administrators, customers, and products/services provided. The application already comes with an account admin with the password admin.
    - Customers are users who access the system to buy products.
    - Both admin and customer records include: Name, id, phone, address, email, role.
    - Administrators are the only ones to access a specific interface for  registering/managing the site’s records.

2. Functional requirements:
    - Product records include: name, id, photo, description, price, quantity (in stock), quantity sold, highlighted, category list.
    - The store will only sell products, which are Tarot cards and Mystic objects.
    - Products are selected, their quantity chosen, and are included in a cart. Products are purchased using a credit card number (the system accepts any number). The amount of product sold is subtracted from the quantity in stock and added to the amount sold. Carts are emptied only when payment is made or by customers. If a product’s quantity reach 0, it’ll be marked as sold out in the interface, and won’t be able to be bought.
    - **Product Management:** Administrators can create/update/read/delete (CRUD) new products and services. For example, they can change the stock quantity.
    - **Administrators Management:** Only administrators can create another User as an administrator.
    - **Authentication:** Users must be authenticated whenever they want to finish a purchase. Unauthenticated users can not access admin interfaces and complete purchases. Finally, The Wheel of Fortune game can only be used if the user is logged in.
    - **Filters:** In the page with a list of products, there must be a list with filters, where the user can select to see items of specific categories. 
    - **Highlighted list:** In the home page, there will be a carousel displaying a list of highlighted items defined by the administrators.
    - **Wheel of fortune (unique functionality):** There will be a page where customers can daily enter and play a lucky game and have the probability to receive a certain amount of discount on any purchase of that day. The game consists in receiving three cards to be flipped (when clicked!), if the three of them have the same number, the player will receive a discount of that number’s percentage. Otherwise, they can try again the following day!

3. Non-functional requirements:
    - System must be developed as an SPA (Single Page Application).
    - System must be secure, and do not permit unauthorized access to it’s critical areas or functionalities (wheel of fortune, admin interface and purchase finalization).
    - Interfaces must be accessible and user friendly.
    - System must be responsive.

## Project Description
The project will be structured following the MVC and SPA patterns, using Java Script as front-end and back-end languages. In this section we will present it's components, functionalities and Interfaces, also using diagrams and mock ups

1. Functionalities
   - **Login:** In the login page, a client will inform it’s account credentials (email and password). A POST request for the server will, then, be made with these informations, and the logic will hash the password and search if any user in the database matches this tuple. If so, it will instantiate a session token (JWT format), and return it for the client in a home page redirect. Otherwise, it will return an error message saying: “Invalid credentials” for the same login page, which will be displayed in the interface.
     
   - **Sign up:** In the sign up page, the client will inform all the data necessary to create an User in the database and send it in a POST request. Then, the server will validate each necessary field, and if right, instantiate it in a user object, save it in the database, instantiate a session token (JWT format) and return it for the client in a home page redirect. Otherwise, it will return error messages for each specific problem within the validation.
     
   - **Finish purchase:** After the customer informs it’s card data and click at the “Purchase button” in the purchase page, a POST request will be sent to the server with all the info. Firstly, it will verify if he / she is logged in an account (if not it will redirect the browser to the login page), then verify the card info and start to decrement every unit purchase in it’s respective products (accessing the database for that). Therefore, it will return a confirmation for the front-end and the Browser will make a pop-up with the message “Purchase successfully made!”
     
   - **CRUD for products/records:**
   - **Update customer account:**
   - **Filters:**
   - **Highlighted list:**
   - **Wheel of fortune (unique functionality):**

3. User interfaces

4. Data stored in the server
    
## Code Comments

  We intend to use Node as our back-end framework, React as our front-end framework, but the data base is yet to be defined

## Test Plan

  We intend to use tools like Postman for the back-end functionalities.
  
## Test Results

  No test have benn made yet...

## How To Build

## Problems

## Aditional comments

Project still under construction :)

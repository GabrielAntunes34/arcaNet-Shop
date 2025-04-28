# arcaNet-Shop

## Group and members
Group 7

* Gabriel Antunes Afonso de Araujo - 14571077
* Thales Sena de Queiroz - 14608873
* Thiago Zero Araujo - 11814183

## Introduction

This project is the final assignment for the discipline SCC0219-2025 (Introduction to Web Development) and aims to develop an Online Store as a full web application where customers can view, interact and buy products of a given theme. In order to make things more interesting, we chose to create a Tarot Card and supplies store.

## Requirements

As an online store, this system is required to be developed as a Web Application with intuitive and accessible user interfaces, as well as many functionalities to manage, buy and view products; login and register new users; complete purchases in a chard with valid Card Numbers. In the following is a detailed list of this requirements:

1. User specifications:
    - Two types of users: Administrators and customers.
    - Administrators are responsible for registering/managing administrators, customers, and products/services provided. The application already comes with an account admin with the password admin.
    - Customers are users who access the system to buy products.
    - Both admin and customer records include: Name, id, phone, address, email, role.
    - Administrators are the only ones to access a specific interface for  registering/managing the site’s records.

2. Functional requirements:
    - Product records include: name, id, photo, description, price, stock, quantity sold, highlighted, category.
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
   - **Login:** In the login page, a client will inform it’s account credentials (email and password). A POST request for the server will, then, be made with these information, and the logic will hash the password and search if any user in the database matches this tuple. If so, it will instantiate a session token (JWT format), and return it for the client in a home page redirect. Otherwise, it will return an error message saying: “Invalid credentials” for the same login page, which will be displayed in the interface.
     
   - **Sign up:** In the sign up page, the client will inform all the data necessary to create an User in the database and send it in a POST request. Then, the server will validate each necessary field, and if right, instantiate it in a user object, save it in the database, instantiate a session token (JWT format) and return it for the client in a home page redirect. Otherwise, it will return error messages for each specific problem within the validation.
     
   - **Finish purchase:** After the customer informs it’s card data and click at the “Purchase button” in the purchase page, a POST request will be sent to the server with all the info. Firstly, it will verify if he / she is logged in an account (if not it will redirect the browser to the login page), then verify the card info and start to decrement every unit purchase in it’s respective products (accessing the database for that). Therefore, it will return a confirmation for the front-end and the Browser will make a pop-up with the message “Purchase successfully made!”
     
   - **CRUD for products/records:** Any administrator may enter in the desired record page, where the server will display a list of every register in this record, for each one of there will be a button that sends a DELETE request for the register with that Id, besides, the administrator will be able to change the item in the database when clicking on it and add new registers clicking in the add button above the list. When adding a new register, a form will capture all the necessary information, send to the server in a POST, where it will be validated, saved in the database and return a message of success.
   - 
   - **Update user account:** When logged in, an icon representing the user will appear above the page, in the navbar, if the user click on it, a small menu with options will appear including the one that leads him to the change account page. Once there, he will be able to change some of this account information in a form and send to the server in a POST request (he won't be able to change email, password and id), reaching the server, there will be a logic to grab this data and update it in it's account's register at the database, searching it by it's id.
     
   - **Filters:** In the list of products page, there will be a side menu with a series of filters that the user can interact with. Every filter will activate a logic in the front-end to select specific items in the list of products. There will be options to filter by product category, price and highlighted products.
     
   - **Highlighted list:** Administrators in the manage product page will be able to update any register, setting it’s highlighted field to true. Therefore, when visiting the home page, the server will also create a dynamic list of highlighted products in a carousel. This also affects the highlighted filter in the list of products page.
     
   - **Wheel of fortune (unique functionality):** If not played yet, when entering the Wheel of fortune page, the customer will be presented with three cards, each one with secret numbers randomly generated by the server (following a specific distribution). So, the customer will be able to click in any of the cards, and when doing so, the chosen card will be flipped in the interface revealing it's number. If the three numbers flipped are the same, a message saying that the user won a discount will be displayed, and a POST request to the server will be made. Then, the server will create a token with the value of the discount and give it back to the customer's browser, that will maintain it as cookie with 24 hours to expirate. If the user don't retrieve three equal numbers in the flipping of the cards, he will only receive a message saying "It looks like luck wasn't on your side today, but you are always invited to try tomorrow!". Then he won't be able to play the game for 24 hours (probably blocked by a token). It's important to emphasize that the user will need to be logged in as a customer to be able to do this action.

3. User interfaces
    Here is the link for the Figma mock-ups (where is also the navigation diagram):
   - [Navigation Diagram](https://www.figma.com/design/F4yVIgxYHlghHsNsOMQDcE/ArcaNet?node-id=39-1246&t=cLRZ0zj6Dxyo2PNW-1)
     
5. Data stored in the server
   The server will store the majority of it's data as tables and records in a data base, but it'll also save the product's images as static archives.
   The following diagram represent how the data will be modeled:
   - [BD Diagram](https://github.com/GabrielAntunes34/arcaNet-Shop/blob/main/docs/dataBaseDiagram.pdf)
    
## Code Comments

  We intend to use Node as our back-end framework, React as our front-end framework, but the data base is yet to be defined

## Test Plan

  We intend to use tools like Postman for the back-end functionalities.
  
## Test Results

  No tests have been made yet...

## How To Build

## Problems

## Additional comments

Project still under construction :)

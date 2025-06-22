# arcaNet-Shop

## 👥 Group and members
Group 7

* Gabriel Antunes Afonso de Araujo - 14571077
* Thales Sena de Queiroz - 14608873
* Thiago Zero Araujo - 11814183

## 📍 Introduction

This project is the final assignment for the discipline SCC0219-2025 (Introduction to Web Development) and aims to develop an Online Store as a full web application where customers can view, interact and buy products of a given theme. In order to make things more interesting, we chose to create a Tarot Card and supplies store.

## 📥 Requirements

As an online store, this system is required to be developed as a Web Application with intuitive and accessible user interfaces, as well as many functionalities to manage, buy and view products; login and register new users; complete purchases in a chard with valid Card Numbers. In the following is a detailed list of this requirements:

1. User specifications:
    - Two types of users: Administrators and customers.
    - Administrators are responsible for registering/managing administrators, customers, and products/services provided. The application already comes with an account admin with the password admin.
    - Customers are users who access the system to buy products.
    - Both admin and customer records include: Name, id, phone, address, email, role.
    - Administrators are the only ones to access a specific interface for  registering/managing the site’s records.

2. Functional requirements:
    - Product records include: name, id, photo, description, price, stock, quantity sold, highlighted, category.
    - The store will only sell products, which are Tarot cards, fullfield with mistycism and mistery.
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

## 📖 Project Description
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
    
## 💻 Code Comments

### Front-end

#### Project structure

Since React has been chosen to make all the project’s interfaces, and it’s a component based library, we’ve decided to create a structure that modularizes each component into groups of the main features. Therefore, we might maintain all the features’ logic encapsulated into the same places. Besides, some global folders for shared components and functions were added to improve the communication and define more general interfaces of the page.

#### Project's folder structure

src/
├── assets/                   
├── components/             
├── features/               
│   ├── auth/               
│   ├── cart/               
│   ├── products/           
│   ├── admin/              
│   └── fortuneGame/                       
├── pages/                 
├── routes/               
├── services/                       
├── App.jsx
└── main.jsx

#### Folder's details

- **assets:** Static files such as images, icons and global .CSS
- **Components:** Most elementary and generic components used throughout the pages as well as the navbar and footer specifications, which are used over all the project's pages.
- **Features:** Main folder for the project. With all of it's subdirectories containing the modular components, pages, hooks and contexts (if necessary) for the givven feature
- **pages:** Global pages that combine different features (such as the home page).
- **routes:** Contains the React routers for eacht page, implementing the logic of an SPA.
- **services:** Pure JavaScript files that define functions to interact with tha Back-end API 

#### Inner interaction inside features

Every feature has it's own page, which may or not need to use specific states. If so, and the interaction is complex enough (mixing interactive with API calls), this logic is developed inside the personalized context of that feature, which is then encapsulated by a hook to be passed over all components and pages of that feature that need them.

#### Modules implementations' highlights:

* #### Authentication

    The authentication module has three main components: login page, signup page (each one containing forms to retrieve user data) and a profile page where the user may change some of it’s profile data. For all the forms a centralized validation function was developed applying rules to ensure that the fields are corresponding to the expected format (passwords for example must have at least 6 digits, one character capitalized, one number and one symbol). To handle user data and authentication, a context defining an user state and hook was developed and used to involve all applications components, and it’ll place the final functions to interact with the API authentication routes.

* #### Products
   We developed a grid for the products and the product card to reuse it in pages like home page and product list page, and a carousel to display, which gave some problems when going to a mobile display because it wasn't showing all the products that it should have.

* #### WheelOfFortune
 
    The wheel of fortune "animation" is disigned on the "Card" component, the flip logic is made on the css, where it changes from one perspective to the other. 

* #### Cart
  
    The cart uses a context over all the routes, so it can carry the products added so far. For now, the cart items do not get stored anywhere, so when the page is reloaded it resets the items on the cart. Future work involve storing the products on the local storage and/or on the database, so users doesnt lose their added products when the page is reloaded. 

* #### Routes

    The Routes folder encapsulates everything necessary to rotate the SPA’S components into displayable “pages”. It also define an special component to involve routes that should only be accessible for an admin (and it’ll use the user’s role information to authenticate him in the future).

* #### Admin interface
     It was really troublesome, because almost all pages needed to comunicate with this session, when adding a category or product a lot of problems happened, like no products in the product list page even though there were product in the manage products page, and when adding a new product only this product existed in the site, and he totally break the filters of price and categories, it was a lot of trouble, so with mockData we started every page with the same Data, and after that they all put into localStorage and then read it whenever changes happen using the hooks of useState and useEffect etc..

### Back-end

## 🔍 Test Plan/Results

### Front-end

* #### Authentication

    To test the authentication interface, some mock functions were developed to simulare login, register and logout placing and fetching users at localstorage. At first, many problems within the validation mechanism of the forms ocurred, because the asyncronical code for the User state weren't corrctly set, and some variables were compared before their atualization, even bypassing the validation check at the first time. This problems, however were overcommed and the authentication interface started to behave properly.

    - [Mock auth functions](/src/arcaNetFront/src/tests/mockAuth.js)

* #### Products
  
 See if it is being resposive, if it is being highlighted and redirecting to the respective product detail page, everything turned out ok.
    - [Mock auth functions](/src/arcaNetFront/src/tests/productCardMock.jsx)
 
* #### WheelOfFortune

    Wheel of fortunes uses the localstorage credentials of the user to generate the random numbers, for now, to see different numbers being generated you need to login with another user or clean the localstorage of your web browser, so it can be generated new numbers. Future work involves upgrading the logic of the numbers generated by linking it to the user on the database, not new credentials generated on the localstorage of the web browser.

* #### Cart

    By now, testing the cart functionality is based on adding and removing items from it. It can be done as usual, some functionalities may be developed by the integration of the backend, but for now the core is developed to work with the integration of front and back end.

* #### Routes

    To test the router, a series of components for the so called page were developed with a”Mock - component name” data inside. Therefore, we started to match the defined URL’s and verify if they responded with the components. Some errors in the linking of them occurred, but they were easily resolved. Besides, the protected routes were also tested with a Mock code that checked the URL query to instantiate an user with the specified role into the local storage, which was then fetched by the ProtectedRoutes component. This last test worked really well, and we didn’t face problems with the routing among “authenticated” users.

    - [Mock auth functions](/src/arcaNetFront/src/tests/mockAuth.js)

* #### Admin interface
     Verified if all button working correctly, CRUD operations on categories and products(a little bit with users because it needs a lot the backend), if the changes being made in the management section were really acting through the entire site.

  - [Mock data developed](/src/arcaNetFront/src/tests/mockData.jsx)

### Back-end

## 🛠️ How To Build
    
To run this project locally, follow the steps below: 

If you're on a Debian-based system (like Ubuntu), you can install Node.js with:
```bash
sudo apt update
sudo apt install nodejs npm
```

After that you can clone our github repository with
```bash
git clone https://github.com/GabrielAntunes34/arcaNet-Shop/
cd ./arcaNet-Shop
```

### Setting up MongoDB
The database of this project was delevoped using a local MongoDB database, called 'arcanet', running it with docker. The visual interface is run by Mongo Express. The configuration file of those services are present on mongo.yaml

To run those, you will need first to install the dependecies:
```bash
sudo apt install docker docker-compose
```

Then run:
```bash
docker compose -f mongo.yaml up --build -d
```

After ~1min, the services will be up and ready to go, to visualize the database via mongo express. In your web browser access [localhost:8081](http://localhost:8081). 
- user: admin
- password: pass

After you finalize the tests, if you want to remove the container, run:
```bash
docker compose -f mongo.yaml down -v
```

### Running the backend
After you run the MongoDB, go to the backend folder and initialize the app.js server with:
```bash
cd ./src/arcaNetBackAPI
node app.js
```

### Running the Frontend
After the backend is up, go to the root directory and then to the frontend folder, after that run:

```bash
cd ./src/arcaNetBackAPI
npm install
npm run dev
```
    
To see the project itself, then open the url [http://localhost:5173/](http://localhost:5173/). And thats it.


Project still under construction :)

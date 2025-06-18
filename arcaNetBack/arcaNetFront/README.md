# Front-end Web

## Project structure

Since React has been chosen to make all the project’s interfaces, and it’s a component based library, we’ve decided to create a structure that modularizes each component into groups of the main features. Therefore, we might maintain all the features’ logic encapsulated into the same places. Besides, some global folders for shared components and functions were added to improve the communication and define more general interfaces of the page.

## Project's folder structure

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

## Folder's details

- **assets:** Static files such as images, icons and global .CSS
- **Components:** Most elementary and generic components used throughout the pages as well as the navbar and footer specifications, which are used over all the project's pages.
- **Features:** Main folder for the project. With all of it's subdirectories containing the modular components, pages, hooks and contexts (if necessary) for the givven feature
- **pages:** Global pages that combine different features (such as the home page).
- **routes:** Contains the React routers for eacht page, implementing the logic of an SPA.
- **services:** Pure JavaScript files that define functions to interact with tha Back-end API 

## Inner interaction inside features

Every feature has it's own page, which may or not need to use specific states. If so, and the interaction is complex enough (mixing interactive with API calls), this logic is developed inside the personalized context of that feature, which is then encapsulated by a hook to be passed over all components and pages of that feature that need them.



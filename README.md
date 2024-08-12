# Zomato Clone

Welcome to the **Zomato Clone** project! This repository contains a full-stack web application that mimics the core features of the Zomato platform. The project is built using the MERN stack and integrates **Cloudinary** for seamless image storage and management. This application demonstrates robust CRUD operations and modern web development practices.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Authentication:** Secure user login and registration using JWT.
- **Dynamic Restaurant Listings:** Create, read, update, and delete restaurant data.
- **Image Management:** Upload and manage restaurant images using Cloudinary.
- **Responsive Design:** Fully responsive UI using ReactJS, optimized for various screen sizes.
- **Search & Filter:** Advanced search and filter functionality to find restaurants by name, location, or cuisine.
- **Ratings & Reviews:** Users can leave ratings and reviews for restaurants.

## Technologies Used

- **MongoDB:** NoSQL database for scalable data storage.
- **Express.js:** Web application framework for Node.js, providing robust routing and middleware.
- **React.js:** Front-end library for building interactive user interfaces.
- **Node.js:** JavaScript runtime environment for server-side development.
- **Cloudinary:** Cloud-based image and video management service.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens):** Secure authentication mechanism.
- **CSS Modules:** Scoped and modular CSS for styling components.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/zomato-clone.git
   cd zomato-clone
2. **Install dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. **Setup environmental variables:**
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
4. **Run the application:**
   ```bash
   npm run start
## Usage

- **User Registration/Login:** Sign up or log in to access features like adding and managing restaurants.
- **CRUD Operations:** Create, read, update, and delete restaurant listings.
- **Image Upload:** Upload restaurant images directly via the UI, stored in Cloudinary.
- **Search & Filter:** Use the search bar and filters to explore different restaurants.

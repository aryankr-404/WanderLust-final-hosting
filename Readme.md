# WanderLust - Homestay Booking Platform

## 🌟 Overview

WanderLust is a full-stack web application that provides a platform for users to book and list travel accommodations worldwide. Inspired by Airbnb, it offers a seamless experience for both travelers and property owners.

## ✨ Features

- **User Authentication & Authorization**
  - Secure signup and login functionality
  - User roles (regular users and property owners)

- **Listing Management**
  - Create, edit, and delete property listings
  - Upload property images with Cloudinary integration
  - Add detailed property descriptions and pricing

- **Booking System**
  - Easy booking process for users
  - View booking history
  - Manage bookings

- **Reviews & Ratings**
  - Users can leave reviews and ratings
  - Star-based rating system
  - Review management system

- **Search & Filters**
  - Search properties by location
  - Filter by various categories
  - Interactive category icons

- **Maps Integration**
  - View property locations on an interactive map
  - Location-based property search

## 🛠️ Technologies Used

- **Frontend:**
  - HTML5/CSS3
  - JavaScript
  - Bootstrap 5
  - EJS templating

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

- **Authentication:**
  - Passport.js
  - Session-based authentication

- **Cloud Services:**
  - Cloudinary (Image hosting)

- **Maps:**
  - Leaflet.js
  - OpenCage Geocoding API

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.13.0)
- MongoDB
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/aryankr-404/WanderLust-final-hosting.git
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLAS_DB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
```

4. Start the server
```bash
node app.js
```

5. Visit `http://localhost:8080` in your browser

## 📁 Project Structure

```
wander-lust/
├── controllers/     # Route controllers
├── models/         # Database models
├── public/         # Static files
├── routes/         # Route definitions
├── views/          # EJS templates
├── utils/          # Utility functions
├── app.js         # Main application file
└── README.md
```

## 🔑 Environment Variables

- `CLOUD_NAME`: Cloudinary cloud name
- `CLOUD_API_KEY`: Cloudinary API key
- `CLOUD_API_SECRET`: Cloudinary API secret
- `ATLAS_DB_URL`: MongoDB Atlas connection string
- `SECRET`: Session secret key

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.






# Streamly: Delivering High-Definition Entertainment, Anytime.

Welcome to Streamly, a complete, modern video-sharing and social platform designed to deliver high-definition entertainment and foster an engaging creator-viewer community.

This repository contains the full-stack code for the Streamly project, built with a robust Node.js backend and a dynamic React frontend.

## Key Features

Streamly provides a comprehensive set of features for both users and content creators, powered by a full suite of API endpoints:

### User & Authentication
* **Secure Authentication:** User registration, login, and logout using JWT and refresh token handling via secure cookies.
* **Profile Management:** Update account details, password, avatar, and cover image.
* **Watch History:** Automatically track and view recently watched videos.

### Content & Community
* **Video Platform:** Publish, update, and delete videos with file and thumbnail uploads handled by Cloudinary.
* **Video Engagement:** View count increment, like/unlike functionality for videos, comments, and tweets.
* **Channel Subscriptions:** Toggle subscription status and view subscriber counts for any channel.
* **Comments & Tweets:** Add, view, edit, and delete comments on videos and separate tweet posts.
* **Playlists:** Create, update, and manage custom video playlists.

### Creator Dashboard
* **Channel Stats:** View essential metrics like total videos, total subscribers, total views, and total likes.
* **Video Management:** Control video visibility with a toggle to publish/unpublish content.

## Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React | User Interface and Client-side logic. |
| | Redux Toolkit | State Management. |
| | Tailwind CSS & DaisyUI | Styling and Component Library. |
| **Backend** | Node.js & Express | Server Runtime and Web Framework. |
| | MongoDB & Mongoose | Database and Object Data Modeling (ODM). |
| | JWT & bcrypt | Authentication and Password Hashing. |
| | Cloudinary | External Cloud Storage for media files. |

## Getting Started

Follow these steps to get your local development environment set up.

### Prerequisites
You will need the following installed:
* Node.js (Version 18 or higher recommended)
* MongoDB Instance (Local or Cloud-hosted)
* Cloudinary Account for media file storage

### Backend Setup

1.  **Navigate to the Backend directory:**
    ```bash
    cd Backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a .env file in the Backend directory and add your credentials:**
    ```env
    PORT=5400
    CORS_ORIGIN=<Your Frontend URL, e.g., http://localhost:5173>
    DATABASE_URI=<Your MongoDB connection string>
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    ACCESS_TOKEN_SECRET=<A strong secret key>
    REFRESH_TOKEN_SECRET=<A strong secret key>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_EXPIRY=10d
    ```

4. **Start the backend development server:**
    ```bash
    npm run dev # Runs the server using nodemon for automatic restarts.
    ```
    The server will be listening at the specified PORT (e.g., http://localhost:5400).


### Frontend Setup

1.  **Navigate to the Frontend directory:**
    ```bash
    cd ../Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Ensure your .env file for the frontend is configured. It should point to the backend API:**
    ```Code snippet
    VITE_SERVER_URL=http://localhost:5400/api/v1
    ```
    Note: This path is used across the application for API calls (e.g., in Frontend/src/assets/GetAllVideos.js).

Start the frontend development server:
```bash
npm run dev # Starts the Vite development server.
```
npm run dev # Starts the Vite development server.

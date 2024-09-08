# MyFlix (React)

## Description
MyFlix is a single-page web application built with React, which provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

## Features
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister
- Allow existing users to login and get a JWT token

## Link to Project
https://cmr927-myflix.netlify.app

## Installation

1. Clone the repository:

   ```
   https://github.com/cmr927/myflix-client.git
   ```

2. Navigate to the project directory:

   ```
   cd myflix-client
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run the following command:

```
npm start
```

This will launch the application in your default web browser.

## Components
-  **MainView**: Parent component serving as the "main" component where child components will render.
-  **NavigationBar**: Provides dynamic navigation based on user authentication status.
-  **MovieView**: Displays detailed information about movies.
-  **MovieCard**: Represents a single movie in a card format, showing key details and allowing users to add or remove the movie as favorite.
-  **SignupView & LoginView**: Handle user registration and authentication.
-  **ProfileView**: Allows users to view and edit their profile, manage favorite movies, change passwords, and delete accounts.

## Dependencies
- bootstrap
- dayjs
- prop-types
- react
- parcel
- process

## Server-Side (backend) API
MyFlix interacts with [MyFlix API](https://github.com/cmr927/myflix), a custom API that contains all data relevant to the MyFlix app, including information about movies, titles, descriptions, genres, directors, images, features, users, and more. Please refer to the API Documentation above for information on API endpoints and data formats.

## Authentication
This API uses JWT for authentication. All endpoints require a valid JWT token in the Authorization header.

## License
This project is licensed under the terms of the [ISC License](https://opensource.org/licenses/ISC).

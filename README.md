
# Leetcode User Stats

This project allows you to fetch and display the Leetcode user submission statistics based on their username.
The statistics include data on the number of solved problems and the total submissions, categorized by difficulty (Easy, Medium, Hard). 
The data is visualized using progress circles and statistics cards.

 # Features

- Search for Leetcode User: Allows users to search by their Leetcode username.
- Visual Progress: Displays progress for the number of solved problems in three categories (Easy, Medium, and Hard).
- Submission Stats: Shows total submissions for each difficulty level (Easy, Medium, Hard) along with overall submissions.
- Responsive Design: A user-friendly interface that adjusts based on screen size.

## How It Works

1. Username Validation: The username input is validated using regex to ensure it is correctly formatted (1 to 15 characters, only alphanumeric characters, hyphens, or underscores).
2. Fetch Data: The application uses a GraphQL query to fetch data from the Leetcode API.
3. Display Progress: The data is displayed using progress circles and statistics cards.
4. CORS Handling: If the API request is blocked due to CORS issues, it uses a proxy server to bypass this restriction.

## Requirements

- Browser with JavaScript enabled
- Internet connection to fetch data from the Leetcode API
- Node.js (for development purposes if setting up a local proxy)

## Setup Instructions

1. Clone the Repository

2. Install Dependencies (For local proxy)

If you plan to set up a proxy or work on the backend, ensure you have Node.js installed and run:

3. Set Up a Proxy (Optional)

If you encounter CORS issues, you can set up a local proxy using **cors-anywhere**.

- Install **cors-anywhere**:
  
  npm install -g cors-anywhere
  

- Start the proxy:
  
  cors-anywhere --port 8080
  

- Update your JavaScript to use the local proxy:

const proxyUrl = "http://localhost:8080/";
const targetUrl = "https://leetcode.com/graphql/";


 4. Run the Application

Once everything is set up, open the `index.html` file in your browser. Enter a valid Leetcode username, and the application will display the user's stats.



## Contributions

Feel free to fork the repository and submit pull requests for improvements, bug fixes, or feature additions.


Enjoy tracking your Leetcode progress!

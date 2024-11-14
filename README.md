# DublinStats.ie

**DublinStats.ie** is a data visualization platform showcasing Dublin's infrastructure and urban development using real-time data from Dublin City Council and the Central Statistics Office (CSO). The platform provides interactive visualizations and insights into various aspects of the city's growth, including transportation, housing, and employment data.

## Features

- **Real-time Data Updates**: Fetch and display the latest datasets related to Dublin's urban planning.
- **Interactive Visualizations**: Use **D3.js** for creating interactive charts and graphs to represent datasets like population growth, housing trends, transportation, and more.
- **API Integration**: Fetch data from external APIs, process it in the backend, and serve it through a RESTful API.
- **Responsive Web Design**: Optimized for both desktop and mobile views to provide a seamless user experience.

## Tech Stack

- **Frontend**:
  - **Vanilla JavaScript** for handling the UI and dynamic content.
  - **D3.js** for creating visualizations.
  - **CSS** for styling (plain CSS with no preprocessor).
  
- **Backend**:
  - **Node.js** with **Express** to serve the API and handle business logic.
  
- **Deployment**:
  - Hosted on **Digital Ocean**.
  - **Nginx** used as a reverse proxy for handling both static files and the Express API.
  - **GitHub Actions** for automated deployments on code changes.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** installed. You can check by running:

```bash
node -v
npm -v
```

Clone the Repository

```bash
git clone https://github.com/rohitrmohanty/dublinstats.git
cd dublinstats
```

Install Dependencies

	•	For the backend:
 
```bash
cd server
npm install
```
	•	For the frontend:
 
```bash
cd client
npm install
```

Run Locally

	•	Start the server:
 
```bash
npm start
```

This will run the app at http://localhost:3000.

Deploy

The app is deployed on Digital Ocean. Changes pushed to the main branch will automatically trigger deployment via GitHub Actions.

License

This project is licensed under the MIT License - see the LICENSE file for details.

### Explanation of Sections:

- **Project Overview**: This section gives an overall description of the project.
- **Features**: Lists the main functionality of the project.
- **Tech Stack**: Details the tools and technologies used in the project.
- **Getting Started**: Instructions on how to set up and run the project locally.
- **License**: Information about the project license.

You can use and modify this as needed for your repository. Let me know if you need further adjustments!

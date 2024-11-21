# DublinStats.ie

[**DublinStats.ie**](https://dublinstats.ie) is a data visualization platform showcasing Dublin's infrastructure and urban development using real-time data from Dublin City Council and the Central Statistics Office (CSO). The platform provides interactive visualizations and insights into various aspects of the city's growth, including unemployment rates, employment trends, and economic indicators.

## Features

- **Real-time Data Updates**: Fetch and display the latest datasets from Dublin Economic Monitor
- **Interactive Visualizations**: Use **D3.js** for creating interactive charts and graphs to represent:
  - Unemployment rates
  - Employment trends
  - Economic indicators
- **Responsive Web Design**: Optimized for both desktop and mobile views

## Project Structure

```
.
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── backend/
│   ├── utils/
│   │   ├── dataClean.js   # Data processing utilities
│   │   └── utils.js       # General utility functions
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── css/              # Stylesheet directory
│   ├── js/               # JavaScript files
│   └── index.html        # Main HTML file
└── README.md
```

## Tech Stack

### Frontend

- **Vanilla JavaScript** for DOM manipulation and data handling
- **D3.js** for data visualizations
- **CSS** for styling (plain CSS, no preprocessor)

### Backend

- **Node.js** with **Express** framework
- **Tidy.js** for data cleaning and transformation
- CORS enabled for cross-origin requests

### Deployment

- Hosted on **Digital Ocean**
- **Nginx** as reverse proxy
- **GitHub Actions** for CI/CD

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed:

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rohitrmohanty/dublinstats.git
cd dublinstats
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

### Development

To serve frontend files locally, uncomment the static file serving middleware in server.js:

```javascript
import path from "path";
import { __dirname } from "./utils/utils.js";
app.use(express.static(path.join(__dirname, "../..", "frontend")));
```

### Environment Variables

- `PORT`: Server port number (default: 3000)

### Running Locally

1. Start the server:

```bash
npm start
```

The server will run on http://localhost:3000 (or your specified PORT environment variable)

## Deployment

Changes pushed to the main branch automatically trigger deployment via GitHub Actions to Digital Ocean.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

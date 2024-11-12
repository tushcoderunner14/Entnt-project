# Job Portal
## Overview
This project is a React application built using Create React App. It includes features such as a job application system, resume upload, candidate tracking, and assessments. The application saves job and candidate data to localStorage for persistence.

### Features
Job listing with descriptions
Candidate application with resume upload
Candidate tracking per job
Assessment questions for candidates
Data persistence via localStorage

### Getting Started
Follow these instructions to set up and run the project locally.

### Prerequisites
Ensure you have the following installed:

Node.js (version 14 or later): Download Node.js
npm (comes with Node.js) or yarn

### Installation
Clone the repository:

bash
git clone https://github.com/tushcoderunner14/Entnt-project
cd Entnt-project

### Install dependencies:

bash
Copy code
npm install
or, if you’re using yarn:

bash
Copy code
yarn install

### Running the Application
To start the application in development mode:

bash
Copy code
npm start

or

bash
Copy code
yarn start
This will open the app at http://localhost:3000 in your browser. 
The page will reload automatically as you edit the code, and any linting errors will appear in the console.

### Building the Application
To build the application for production:

bash
Copy code
npm run build
or

bash
Copy code
yarn build
This command bundles the application in the build directory, optimized for performance.

### Usage
Once the app is running, you can:

View available job listings.
Apply to jobs by entering your name, email, and uploading a resume.
View candidate lists for each job.
Sample Data
To populate the app with sample data for demonstration purposes, add the following function in index.js or your main entry file:


  const sampleJobs = [
    {  title: 'Software Engineer', description: 'Develop software solutions.' },
    {  title: 'Product Manager', description: 'Oversee product development.' }
  ];

  const sampleCandidates = [
    { name: 'Alice', email: 'alice@example.com', Resume: Pdf file,  status: 'Under Review' },
    { name: 'Bob', email: 'bob@example.com',  Resume: Pdf file, status: 'Interview Scheduled' }
  ];

  const sampleAssignment = [
  { selectJob: 'Front-end Developer', Question: 'What are you most proficiant in?', option1: 'React', option2: 'Next', option3: 'Angular', option4: 'React Native', status: 'Under Review' },
];

Built With
React: JavaScript library for building user interfaces.
Material-UI: UI components library.
react-toastify: Library for notifications and user feedback.
localStorage: Browser storage for persisting job and candidate data.
License

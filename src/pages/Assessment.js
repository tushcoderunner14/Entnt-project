import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const AssessmentPage = () => {
  const { jobId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [jobQuestions, setJobQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({ optionA: '', optionB: '', optionC: '', optionD: '' });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobsFromStorage = JSON.parse(localStorage.getItem('jobsData')) || [];
    setJobs(jobsFromStorage);
    const selectedJobQuestions = JSON.parse(localStorage.getItem(`job_${jobId}_questions`)) || [];
    setJobQuestions(selectedJobQuestions);
  }, [jobId]);

  const handleAddOrUpdateQuestion = () => {
    const duplicateQuestion = jobQuestions.some(
      (q, index) => q.question === question && index !== editIndex
    );

    if (duplicateQuestion) {
      alert('This question already exists for this job.');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer
    };

    let updatedQuestions;
    if (editIndex !== null) {
      updatedQuestions = [...jobQuestions];
      updatedQuestions[editIndex] = newQuestion;
      setEditIndex(null);
    } else {
      updatedQuestions = [...jobQuestions, newQuestion];
    }

    localStorage.setItem(`job_${jobId}_questions`, JSON.stringify(updatedQuestions));
    setJobQuestions(updatedQuestions);
    setQuestion('');
    setOptions({ optionA: '', optionB: '', optionC: '', optionD: '' });
    setCorrectAnswer('');
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = jobQuestions[index];
    setQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = jobQuestions.filter((_, i) => i !== index);
    localStorage.setItem(`job_${jobId}_questions`, JSON.stringify(updatedQuestions));
    setJobQuestions(updatedQuestions);
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value
    }));
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="assessment-page">
      <Button
        onClick={handleBackToDashboard}
        variant="contained"
        color="secondary"
        className="back-button"
      >
        Back to Dashboard
      </Button>

      <h1>Assessment Page</h1>
      <FormControl fullWidth className="select-job">
        <h3>Select Job</h3>
        {/* <InputLabel class="select-job">Select Job</InputLabel> */}
        <Select value={jobId} onChange={(e) => navigate(`/assessment/${e.target.value}`)}>
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="question-form">
        <h3>{editIndex !== null ? 'Edit Question' : 'Create Question'} for {jobs.find((job) => job.id === jobId)?.title}</h3>
        <TextField
          label="Question"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
          className="text-field"
        />
        {['A', 'B', 'C', 'D'].map((option) => (
          <TextField
            key={option}
            label={`Option ${option}`}
            name={`option${option}`}
            value={options[`option${option}`]}
            onChange={handleOptionChange}
            fullWidth
            margin="normal"
            className="text-field"
          />
        ))}
        <TextField
          label="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          fullWidth
          margin="normal"
          className="text-field"
        />

        <Button
          onClick={handleAddOrUpdateQuestion}
          variant="contained"
          color="primary"
          className="add-button"
        >
          {editIndex !== null ? 'Update Question' : 'Add Question'}
        </Button>
      </div>

      <div className="questions-list">
        <h3>Existing Questions</h3>
        {jobQuestions.length > 0 ? (
          jobQuestions.map((q, index) => (
            <div key={index} className="question-item">
              <p>{q.question}</p>
              <ul className="options-list">
                {Object.keys(q.options).map((key) => (
                  <li key={key}>{`${key.slice(-1)}: ${q.options[key]}`}</li>
                ))}
              </ul>
              <p className="correct-answer">Correct Answer: {q.correctAnswer}</p>
              <Button
                onClick={() => handleEditQuestion(index)}
                variant="outlined"
                color="primary"
                className="edit-button"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteQuestion(index)}
                variant="outlined"
                color="secondary"
                className="delete-button"
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="no-questions">No questions for this job yet.</p>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;

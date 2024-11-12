import React, { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const LOCAL_STORAGE_KEY_JOBS = 'jobsData';
const LOCAL_STORAGE_KEY_CANDIDATES = 'candidatesData';

const JobApplication = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    resume: null,
    applicationDate: new Date().toLocaleDateString(),
    status: 'Under Review'
  });

  // Load jobs from localStorage
  useEffect(() => {
    const jobsFromStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_JOBS)) || [];
    setJobs(jobsFromStorage);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCandidate({
      name: '',
      email: '',
      resume: null,
      applicationDate: new Date().toLocaleDateString(),
      status: 'Under Review'
    });
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCandidate({ ...candidate, resume: reader.result });
    };
    reader.readAsDataURL(file); // Convert file to base64
  };

  const handleApply = () => {
    const candidatesFromStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CANDIDATES)) || [];
    const newCandidate = {
      ...candidate,
      jobId: selectedJob.id,
      applicationDate: new Date().toLocaleDateString(),
      status: 'Under Review'
    };

    // Update candidates data in localStorage
    const updatedCandidates = [...candidatesFromStorage, newCandidate];
    localStorage.setItem(LOCAL_STORAGE_KEY_CANDIDATES, JSON.stringify(updatedCandidates));

    // Show success notification
    toast.success("Application submitted successfully!");

    handleClose();
  };

  return (
    <div className="job-application-container">
      <h1 className="job-application-title">Job Application</h1>
      <List className="job-list">
        {jobs.map((job) => (
          <ListItem key={job.id} className="job-list-item">
            <div className='job-app-main'>
              <div className="job-app">
                <h2>{job.title}</h2>
                <div>{job.description}</div>
              </div>
              <div>
              <Button variant="contained" onClick={() => handleApplyClick(job)} className="apply-button">
                Apply
              </Button>
              </div>
            </div>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title">Apply for {selectedJob && selectedJob.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={candidate.name}
            onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={candidate.email}
            onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            style={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default JobApplication;

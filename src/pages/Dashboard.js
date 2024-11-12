// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Zoom from '@mui/material/Zoom';
import '../App.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [openCandidateDialog, setOpenCandidateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedJobCandidates, setSelectedJobCandidates] = useState([]);
  const [jobToEdit, setJobToEdit] = useState({ id: '', title: '', description: '' });
  const [newJob, setNewJob] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem('jobsData')) || []);
    setCandidates(JSON.parse(localStorage.getItem('candidatesData')) || []);
  }, []);

  const handleViewCandidates = (jobId) => {
    const jobCandidates = candidates.filter((candidate) => candidate.jobId === jobId);
    setSelectedJobCandidates(jobCandidates);
    setOpenCandidateDialog(true);
  };

  const handleDeleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setOpenEditDialog(true);
  };

  const handleAddJob = () => {
    const newJobData = { ...newJob, id: new Date().getTime().toString() };
    const updatedJobs = [...jobs, newJobData];
    setJobs(updatedJobs);
    localStorage.setItem('jobsData', JSON.stringify(updatedJobs));
    setOpenAddDialog(false);
  };

  const handleJobSelect = (jobId) => {
    navigate(`/assessment/${jobId}`);
  };

  const handleSwitchToJobSection = () => {
    navigate('/jobapp'); // Navigate to Candidates section
  };

  const handleSave = () => {
    setJobs(jobs.map(job => job.id === jobToEdit.id ? jobToEdit : job))
    setOpenEditDialog(false)
  }
 
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="button-group">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
          className="add-job-button"
        >
          Add New Job
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSwitchToJobSection}
          className="switch-job-section-button"
        >
          Switch to Job Section
        </Button>
      </div>

      <List className="job-list">
        {jobs.map((job) => {
          const candidateCount = candidates.filter(candidate => candidate.jobId === job.id).length;
          return (
            <ListItem key={job.id} className="job-card">
              <Tooltip title={job.description} arrow TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }}>
                <ListItemText
                  primary={<span className="job-title">{job.title}</span>}
                  secondary={
                    <>
                      <p className="job-description">{job.description}</p>
                      <span className="candidate-count">Candidates Applied: {candidateCount}</span>
                    </>
                  }
                  className="job-info"
                />
              </Tooltip>
              <div className="icon-container">
                <Button
                  variant="outlined"
                  onClick={() => handleViewCandidates(job.id)}
                  className="icon-button"
                >
                  <GroupIcon className="icon" />
                  <span className="icon-label">Candidate Applied</span>
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditJob(job)}
                  className="icon-button"
                >
                  <ModeEditOutlineIcon className="icon" />
                  <span className="icon-label">Edit</span>
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteJob(job.id)}
                  className="icon-button"
                >
                  <DeleteIcon className="icon" />
                  <span className="icon-label">Delete</span>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleJobSelect(job.id)}
                  className="icon-button"
                >
                  <AssignmentIcon className="icon" />
                  <span className="icon-label">Assessment</span>
                </Button>
              </div>
            </ListItem>
          );
        })}
      </List>

      {/* Dialogs for Candidate, Edit Job, and Add Job */}
      <Dialog open={openCandidateDialog} onClose={() => setOpenCandidateDialog(false)}>
        <DialogTitle>Candidates Applied for Job</DialogTitle>
        <DialogContent>
          {selectedJobCandidates.length > 0 ? (
            <div className="candidate-list">
              {selectedJobCandidates.map((candidate, index) => (
                <div key={index} className="candidate-item">
                  <p>Name: {candidate.name}</p>
                  <p>Application Date: {candidate.applicationDate}</p>
                  <p>Status: {candidate.status}</p>
                  <a href={candidate.resume} download>Download Resume</a>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p>No candidates applied for this job.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCandidateDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            label="Job Title"
            fullWidth
            value={jobToEdit.title}
            onChange={(e) => setJobToEdit({ ...jobToEdit, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Job Description"
            fullWidth
            value={jobToEdit.description}
            onChange={(e) => setJobToEdit({ ...jobToEdit, description: e.target.value })}
            margin="dense"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <TextField
            label="Job Title"
            fullWidth
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Job Description"
            fullWidth
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            margin="dense"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddJob} color="primary">Add Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;

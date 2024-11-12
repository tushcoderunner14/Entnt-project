import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import '../App.css';


const Candidates = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([
    { name: 'John Doe', email: 'john@example.com', status: 'Interviewed' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
  ]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCandidate(null);
  };

  const handleSaveStatus = () => {
    setCandidates(candidates.map((c) => (c === selectedCandidate ? selectedCandidate : c)));
    handleClose();
  };

  return (
    <div className="candidates-container">
      <h2 className="candidates-title">Candidates for Job {jobId}</h2>
      <List className="candidate-list">
        {candidates.map((candidate, index) => (
          <ListItem key={index} divider className="candidate-item">
            <ListItemText
              primary={candidate.name}
              secondary={`Status: ${candidate.status}`}
            />
            <Button variant="outlined" onClick={() => handleOpen(candidate)} className="view-details-button">
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose} className="candidate-dialog">
        <DialogTitle>Candidate Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={selectedCandidate?.name || ''}
            disabled
            className="candidate-detail-input"
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={selectedCandidate?.email || ''}
            disabled
            className="candidate-detail-input"
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={selectedCandidate?.status || ''}
            onChange={(e) =>
              setSelectedCandidate({ ...selectedCandidate, status: e.target.value })
            }
            className="candidate-detail-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="dialog-actions-button">Cancel</Button>
          <Button onClick={handleSaveStatus} color="primary" className="dialog-actions-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Candidates;

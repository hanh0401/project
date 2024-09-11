import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { APIClient } from "../backend/api.ts"; // Import APIClient

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api_client = new APIClient();
    
    const fetchJobs = async () => {
      try {
        const response = await api_client.getJobs();
        if (response.success) {
          setJobs(response.data);  // Assuming the API response has a list of jobs in data
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      {jobs.map((job) => (
        <Card className="mb-3" key={job.id}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
            <Card.Text>{job.description}</Card.Text>
            <Card.Text><strong>Location:</strong> {job.location}</Card.Text>
            <Card.Text><strong>Salary:</strong> {job.salary}</Card.Text>
            <Button variant="primary" href={`/jobs/${job.id}`}>Xem chi tiết</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default JobCard;

import React, { useState } from 'react';
import CSearch from './CSearch';
import JobCard from './JobCard'; // Assuming you have a JobCard component

const JobSearchPage = () => {
  const [jobResults, setJobResults] = useState([]);

  return (
    <div>
      <CSearch onSearchResults={setJobResults} />
      
      {/* Display Job Results */}
      <div className="job-results mt-4">
        {jobResults.length > 0 ? (
          jobResults.map((job, index) => (
            <JobCard key={index} job={job} />
          ))
        ) : (
          <p>Không tìm thấy công việc nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;

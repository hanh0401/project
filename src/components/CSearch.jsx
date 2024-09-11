import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { APIClient } from '../backend/api.ts'; // Import APIClient
import './CSearch.css'; // Custom CSS for styling the search component

const CSearch = ({ onSearchResults }) => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const api_client = new APIClient(); // Initialize APIClient

  // Reset function to clear the form
  const handleReset = () => {
    setSearchTerm('');
    setLocation('');
    setJobType('');
    setAdvancedSearch(false);
  };

  // Function to handle the search and make the API call
  const handleSearch = async () => {
    try {
      const response = await api_client.searchJobs({
        keyword: searchTerm,
        location: location,
        jobType: jobType,
      });

      onSearchResults(response.data); // Pass search results to parent component
    } catch (error) {
      console.error('Error searching for jobs:', error);
      setErrorMessage('Lỗi tìm kiếm công việc, vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <div className="search-background" style={{ backgroundImage: 'url(/public/bg1.jpg)' }}>
        <div className="search-box p-4">
          <h5>Đón lấy cơ hội thành công</h5>
          <h3><strong>26,867 cơ hội nghề nghiệp</strong></h3>

          {/* Display Error Message */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          {/* Search Box */}
          <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Row className="align-items-center">
              <Col md={8}>
                <Form.Group controlId="formSearch">
                  <Form.Control
                    type="text"
                    placeholder="Từ khóa công việc (ví dụ: lập trình viên, marketing...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="light" onClick={handleReset}>
                  <i className="fas fa-sync"></i> Reset
                </Button>
              </Col>
            </Row>

            {/* Advanced Search Section */}
            {advancedSearch && (
              <div className="mt-3">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formLocation">
                      <Form.Label>Địa điểm</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập địa điểm"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formJobType">
                      <Form.Label>Loại công việc</Form.Label>
                      <Form.Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="">Chọn loại công việc</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {/* Advanced Search Toggle */}
            <div className="mt-3">
              <Button
                variant="link"
                onClick={() => setAdvancedSearch(!advancedSearch)}
              >
                {advancedSearch ? 'Thu gọn' : 'Tìm kiếm nâng cao'}
              </Button>
            </div>

            <Button variant="success" className="w-100 mt-2" onClick={handleSearch}>TÌM VIỆC NGAY</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CSearch;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIClient } from '../../backend/api.ts'; // Import APIClient

const JobDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [job, setJob] = useState(null); // State để lưu thông tin công việc
  const [showModal, setShowModal] = useState(false); // State để điều khiển cửa sổ CV
  const [error, setError] = useState(null); // State để lưu thông tin lỗi

  useEffect(() => {
    const api_client = new APIClient();

    // Hàm lấy thông tin công việc từ API dựa trên id
    const fetchJob = async () => {
      try {
        const response = await api_client.getJobDetail(id); // Giả sử API lấy thông tin công việc
        if (response.success) {
          setJob(response.data); // Assuming job details are in response.data
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        setError("Error fetching job details.");
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [id]);

  // Hàm mở cửa sổ ứng tuyển
  const handleApplyClick = () => {
    setShowModal(true);
  };

  // Hàm đóng cửa sổ ứng tuyển
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hàm gửi CV
  const handleSendCV = async (cvId) => {
    try {
      const response = await api_client.applyForJob(id, { cvId });
      if (response.success) {
        alert("Ứng tuyển thành công!");
        setShowModal(false);
      } else {
        alert("Ứng tuyển thất bại.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  // Hiển thị khi job chưa load xong
  if (!job && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{job.title}</h2>
      <h4>Công ty: {job.companyName}</h4>
      <p><strong>Mô tả công việc:</strong> {job.description}</p>
      <p><strong>Địa chỉ:</strong> {job.location}</p>
      <p><strong>Kiểu công việc:</strong> {job.jobType}</p>
      <p><strong>Mức lương:</strong> {job.salary}</p>
      <p><strong>Ngày đăng:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
      <p><strong>Ngày hết hạn:</strong> {new Date(job.expiryDate).toLocaleDateString()}</p>
      
      <button className="btn btn-primary" onClick={handleApplyClick}>
        Ứng tuyển
      </button>

      {/* Modal chọn CV */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chọn CV để gửi</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {/* Giả sử danh sách CV có sẵn */}
                <ul>
                  <li>
                    <button onClick={() => handleSendCV(1)}>CV 1</button>
                  </li>
                  <li>
                    <button onClick={() => handleSendCV(2)}>CV 2</button>
                  </li>
                  <li>
                    <button onClick={() => handleSendCV(3)}>CV 3</button>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;



import React, { useState } from "react";
import CHeader from "../../components/CHeader.jsx";
import Footer from "../../components/Footer.jsx";
import { Card, Button, Form, Alert, Modal, Breadcrumb } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const CV = () => {
    const [hasCreatedCV, setHasCreatedCV] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cvList, setCvList] = useState([]);
    const [cvData, setCvData] = useState({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: ''
    });
    const [showAlert, setShowAlert] = useState(false);  // Trạng thái để hiển thị thông báo

    const handleCreateNewCV = () => {
        setShowModal(true);
    };

    // Xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Thêm CV vào danh sách
        setCvList([...cvList, cvData]);

        // Xóa form và hiển thị CV đã tạo
        setHasCreatedCV(true); // Khi tạo xong, trạng thái chuyển thành đã có CV
        setShowModal(false); // Ẩn form sau khi tạo CV
        // Thực hiện thêm logic gửi dữ liệu nếu cần
        setCvData({
            fullName: '',
            email: '',
            phone: '',
            education: '',
            experience: ''
    });

    // Hiển thị thông báo lưu thành công
    setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);  // Ẩn thông báo sau 3 giây
    };

    // Xử lý thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCvData({ ...cvData, [name]: value });
    };

    return <>
      <CHeader />
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
            Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý CV</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Trang CV</h2>
        <div className="d-flex justify-content-center mt-4">
            <Card style={{ width: '30rem', textAlign: 'center' }}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Card.Title>CV đã tạo trên TLU-JOB</Card.Title>
                        <Button variant="success" className="px-4" onClick={handleCreateNewCV}>
                        + Tạo mới
                        </Button>
                    </div>

                    {/* Hiển thị thông báo thành công */}
                    {showAlert && <Alert variant="success">Lưu CV thành công!</Alert>}
                    
                    {/* Hiển thị danh sách CV nếu đã có */}
                    {hasCreatedCV && cvList.length > 0 ? (
                        <div>
                            {cvList.map((cv,index) => (
                                <div key={index} className="mb-3 text-left">
                                    <h5>{cv.fullName}</h5>
                                    <p>Email: {cv.email}</p>
                                    <p>Phone: {cv.phone}</p>
                                    <p>Học vấn: {cv.education}</p>
                                    <p>Kinh nghiệm: {cv.experience}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {/* <Card.Img
                                variant="top"
                                src="/path/to/your-image.png"
                                alt="CV image"
                                style={{ maxWidth: '100px', margin: 'auto' }}
                            /> */}
                            <Card.Text className="mt-3">Bạn chưa tạo CV nào</Card.Text>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Hiển thị form tạo CV nếu nhấn "Tạo mới" */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo CV mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullName" className="mt-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={cvData.fullName}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={cvData.email}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="phone" className="mt-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={cvData.phone}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="education" className="mt-3">
                        <Form.Label>Học vấn</Form.Label>
                        <Form.Control
                            type="text"
                            name="education"
                            value={cvData.education}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="experience" className="mt-3">
                        <Form.Label>Kinh nghiệm</Form.Label>
                        <Form.Control
                            type="text"
                            name="experience"
                            value={cvData.experience}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Button variant="primary" className="mt-4" type="submit">
                        Lưu CV
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
      <Footer />
    </>
  };
  
  export default CV;
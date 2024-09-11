import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APIClient } from '../backend/api.ts';
import { ssrDynamicImportKey } from 'vite/runtime';

const Register = () => {
  const [formData, setFormData] = useState({
    // username: '',
    password: '',
    email: '',
    username: '',
    address:'',
    phone_number: '',
    confirmPassword: '',
    // userRole: 'candidates',
  })

  const [userRole, setUserRole] = useState('candidate');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api_client = new APIClient();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    // Logic để xử lý đăng ký
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {

      const { confirmPassword, ...dataToSend } = formData;
      const response = await api_client.register(dataToSend);
      console.log(response);
      // Kiểm tra phản hồi từ server
      if (response.success) {
        // console.log('DL đến server:', dataToSend);
        // Lưu token vào localStorage hoặc state tùy ý
        // localStorage.setItem('authToken', response.data.token);

        // Điều hướng đến trang tương ứng dựa trên vai trò
        alert('Đăng ký thành công!');
        navigate('/login')
      } else {
          // Hiển thị lỗi nếu không nhận được token
          console.error('Lỗi khi đăng ký:', response);
          setError(`Đăng ký thất bại. Vui lòng kiểm tra lại thông tin. ${response.error.response.data.email[0] || response.error.response.data.email[0] }`);
      } 
    } catch (error) {
      // if (error.response && error.response.data) {
      //   // Hiển thị lỗi chi tiết từ backend
      //   setError(error.response.data.detail || 'Đăng ký thất bại. Hãy thử lại.');
      // } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      // }
    }
  };

  return (
    <div>
      <h2>Đăng ký tài khoản mới</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <label>
        <input 
          type="radio" 
          name="userRole" 
          value="candidates"
          checked={formData.role === 'candidates'} 
          onChange={handleRoleChange}
        /> Ứng viên
      </label>
      <label>
        <input 
          type="radio" 
          name="userRole" 
          value="employers" 
          checked={formData.role === 'employers'} 
          onChange={handleRoleChange}
        /> Nhà tuyển dụng
      </label>
        <input 
          type="text" 
          name='username'
          placeholder="Tên người dùng" 
          value={formData.username} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="email" 
          name='email'
          placeholder="Email" 
          value={formData.email} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name="address"
          placeholder="Address" 
          value={formData.address} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="text" 
          name='phone_number'
          placeholder="Số điện thoại" 
          value={formData.phone_number} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="password" 
          name='password'
          placeholder="Mật khẩu" 
          value={formData.password} 
          onChange={handleInputChange} 
          required 
        />
        <input 
          type="password" 
          name='confirmPassword'
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          required 
        />
        <button type="submit">Đăng ký</button>
      </form>

      <p>Đã có tài khoản?</p>
      <Link to="/login">Đăng nhập ngay</Link>
    </div>
  );
};

export default Register;

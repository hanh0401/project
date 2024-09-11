import React, { useState, useEffect } from 'react';
import CHeader from '../../components/CHeader.jsx';
import CSearch from '../../components/CSearch.jsx';
import Footer from '../../components/Footer.jsx';
// import { APICli} from '../../backend/axios.jsx'

const CandidateHome = () => {
  const [data,setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('your-endpoint/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Hàm để gọi API POST
  const postData = async () => {
    try {
      const response = await axios.post('your-endpoint/', { key: 'value' });
      console.log('Data posted:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <>
    <div>
      <CHeader />
      <CSearch />
      <h2>Candidate Dashboard</h2>
      <p>Welcome, find your dream job!</p>
      <pre>{JSON.stringify(data,null,2)}</pre>
      <button onClick={postData}>Post Data</button>
      <Footer />
    </div>
  </>
};

export default CandidateHome;
import Header from 'F:/reactjs/reactjs-training/reactjs-training/src/Header';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ReportList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/list");
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const jsonData = await result.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/delete/"+id,{
      method:'DELETE',
    });
    result = await result.json();
    console.warn(result);
    fetchData();
  }

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <h1>Report List</h1>
      <div className='col-sm-10 offset-sm-1'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Report Title</th>
            <th>Report Category</th>
            <th>Report Description</th>
            <th>Report</th>
            <th>Option 1</th>
            <th>Option 2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id || item.report_title}>
              <td>{item.report_title}</td>
              <td>{item.category}</td>
              <td>{item.report_descr}</td>
              <td>{item.report}</td>
              <td><span onClick={()=>deleteOperation(item.id)} className='delete'>Delete</span></td>
              <td>
                <Link to = {"updateReport/"+item.id}>
              <span className='update'>Update</span>
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}

export default ReportList;
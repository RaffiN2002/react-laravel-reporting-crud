import Header from 'F:/reactjs/reactjs-training/reactjs-training/src/Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

function UpdateReport() {
  const navigate=useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({ report_title: '', category: '', report_descr: '', report: '' });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [descr, setDescr] = useState("");
  const [report, setReport] = useState("");

  console.warn("Report ID:", id);

  async function updateReportOnServer(reportData, reportId) {
    try {
      const formData = new FormData();
      formData.append('report_title', reportData.title);
      formData.append('category', reportData.category);
      formData.append('report_descr', reportData.descr);
      formData.append('report', reportData.report);

      const response = await fetch(`http://localhost:8000/api/updateReport/${reportId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating report:', errorData);
        alert(errorData.error); 
        return;
      }

      const updatedReport = await response.json();
      console.log('Report updated successfully:', updatedReport);
      alert("Report updated successfully");
      navigate("/");
      return updatedReport;
    } catch (error) {
      console.error('There was an error updating the report:', error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchReport() {
      try {
        let result = await fetch(`http://localhost:8000/api/report/${id}`);
        result = await result.json();
        setData(result);
        setTitle(result.report_title || "");
        setCategory(result.category || "");
        setDescr(result.report_descr || "");
        setReport(result.report || "");
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    }

    fetchReport();
  }, [id]);

  const handleUpdateClick = () => {
    const reportData = {
      title: title,
      category: category,
      descr: descr,
      report: report,
    };
    updateReportOnServer(reportData, id);
  };

  return (
    <div>
      <Header />
      <div className='col-sm-10 offset-sm-1'>
      <h1>Update Report Page</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
        placeholder="Report Title"
      />
      <br />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-control"
        placeholder="Category"
      />
      <br />
      <input
        type="text"
        value={descr}
        onChange={(e) => setDescr(e.target.value)}
        className="form-control"
        placeholder="Description"
      />
      <br />
      <textarea
        value={report}
        onChange={(e) => setReport(e.target.value)}
        className="form-control"
        rows="5"
        placeholder="Report Content"
      />
      <br />
      <button onClick={handleUpdateClick} className="btn-btn-primary">Update Report</button>
      </div>
    </div>
  );
}

export default UpdateReport;
import Header from 'F:/reactjs/reactjs-training/reactjs-training/src/Header';
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function AddReport() {
  const navigate=useNavigate();

  async function add() {
    console.warn(title, category, descr, report);
    const formData = new FormData();
    formData.append('report_title', title);
    formData.append('category', category);
    formData.append('report_descr', descr);
    formData.append('report', report);

    try {
        let result = await fetch("http://localhost:8000/api/addReport", {
            method: 'POST',
            body: formData
        });

        if (!result.ok) {
            const errorData = await result.json();
            if (errorData && errorData.error) {
                alert(errorData.error); 
                return;
            } else {
                alert("Failed to save report. Please try again.");
                return;
            }
        }

        alert("Report Saved");
        navigate("/");

    } catch (error) {
        console.error("Fetch error:", error);
        alert("An unexpected error occurred while saving the report.");
    }
}

    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [descr,setDescr]=useState("");
    const [report,setReport]=useState("");

    return (
      <div>
        <Header/>
        <div className='col-sm-10 offset-sm-1'>
        <h1>Add Report Page</h1>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" placeholder="Report Title"></input>       <br/>
        <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className="form-control" placeholder="Category"></input>      <br/>
        <input type="text" value={descr} onChange={(e)=>setDescr(e.target.value)} className="form-control" placeholder="Report Description"></input>      <br/>
        <textarea value={report} onChange={(e)=>setReport(e.target.value)} className="form-control" placeholder="Report" rows="5"></textarea>             <br/>
        <button onClick={add} className="btn-btn-primary">Add Report</button>
        </div>
      </div>
    )
  }

export default AddReport
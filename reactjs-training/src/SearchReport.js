import Header from './Header';
import { useState} from 'react';
import { Table } from 'react-bootstrap';


function SearchReport(){
const [data,setData]=useState([])

async function search(key) {
    let result = await fetch("http://localhost:8000/api/search/"+key);
    result = await result.json();
    setData(result)
}

    return(
        <div>
        <Header />
        <div className='col-sm-10 offset-sm-1'>
            <h1>Search Report</h1> <br />
            <input type='text' onChange={(e)=>search(e.target.value)} className='form-control' placeholder='Search Report'/> <br />

            <Table striped bordered hover>
        <thead>
          <tr>
            <th>Report Title</th>
            <th>Report Category</th>
            <th>Report Description</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id || item.report_title}>
              <td>{item.report_title}</td>
              <td>{item.category}</td>
              <td>{item.report_descr}</td>
              <td>{item.report}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
    </div>
    )
}

export default SearchReport
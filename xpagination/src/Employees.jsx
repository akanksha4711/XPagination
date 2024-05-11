import React, { useEffect, useState } from 'react';
import "./Employees.css";

function Employees() {
  
  const fetchEmployeeData = async () => {
    try {
        const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await res.json();
        setEmployees(data);
    } catch (err) {
        alert('failed to fetch data');
        console.log(err);
    }
  }

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEmployeeData();
  }, [])

  return (
    <div className='container'>
      <h1>Employee Data Table</h1>
      <table>
        <tr className='table-heading'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
        {employees.map((emp , idx) => {
            if(idx >= (page-1)*itemsPerPage && idx < page*itemsPerPage){
                return <tr key={emp.id}>
                            <th>{emp.id}</th>
                            <th>{emp.name}</th>
                            <th>{emp.email}</th>
                            <th>{emp.role}</th>
                        </tr>
            }
        })}
      </table>
      <div className='footer'>
        <button onClick={() => {
            if(page > 1) setPage(page-1)
        }}>Previous</button>
        <span className='pageno'>{page}</span>
        <button onClick={() => {
            if(page <= Math.floor(employees.length/itemsPerPage)) setPage(page+1)
        }}>Next</button>
      </div>
    </div>
  )
}

export default Employees

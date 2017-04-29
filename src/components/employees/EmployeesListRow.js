import React from 'react';
import { Link } from 'react-router';

export const EmployeesListRow = ({employee, onDelete}) => {
  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.address}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
      <td>{employee.job}</td>
      <td>{employee.salary}</td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/employees/${employee.id}`} className="btn btn-primary">Edit</Link>
          <a onClick={onDelete.bind(this, employee)} className="btn btn-danger">Delete</a>
        </div>
      </td>
    </tr>
  )
};

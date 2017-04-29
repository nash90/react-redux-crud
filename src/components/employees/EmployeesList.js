import React from 'react';
import { EmployeesListRow } from './EmployeesListRow';

export const EmployeesList = ({employees, onDelete}) => {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Job</th>
        <th>Salary</th>
      </tr>
      </thead>
      <tbody>
      {employees.map(employee => EmployeesListRow({employee, onDelete}))}
      </tbody>
    </table>
  )
};

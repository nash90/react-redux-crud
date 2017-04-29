import React from 'react';
import { EmployeesListRow } from './EmployeesListRow';

export const EmployeesList = ({employees, onDelete}) => {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Category</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {employees.map(employee => EmployeesListRow({employee, onDelete}))}
      </tbody>
    </table>
  )
};

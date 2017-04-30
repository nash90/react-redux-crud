import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as postsActions from './actionCreators';

export function fetchEmployee(action$) {
  return action$.ofType(actionTypes.FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        axios.get(`http://localhost:8081/employees/${id}`)
      ).map(res => postsActions.fetchEmployeeSuccess(res.data.employees[0]));
    });
}

export function fetchEmployees(action$) {
  return action$.ofType(actionTypes.FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get(`http://localhost:8081/employees?${querystring.stringify(params)}`)
      ).map(res => postsActions.fetchEmployeesSuccess(res.data.employees, params));
    });
}

export function updateEmployee(action$) {
  return action$.ofType(actionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(employee => {
      return Observable.merge(
        Observable.fromPromise(
          axios.put(`http://localhost:8081/employees/${employee.id}`, employee)
        ).map(res => postsActions.updateEmployeeSuccess(employee)),
        Observable.of(push('/employees'))
      );
    });
}

export function createEmployee(action$) {
  return action$.ofType(actionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(employee => {
      return Observable.merge(
        Observable.fromPromise(
          axios.post(`http://localhost:8081/employees`, employee)
        ).map(res => postsActions.createEmployeeSuccess(employee)),
        Observable.of(push('/employees'))
      );
    });
//    .mapTo(push('/employees'));
}

export function deletePost(action$) {
  return action$.ofType(actionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(employee => {
      return Observable.fromPromise(
        axios.delete(`http://localhost:8081/employees/${employee.id}`)
      ).map(res => postsActions.deleteEmployeeSuccess(employee));
    });
}

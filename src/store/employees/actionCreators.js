import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchEmployee(payload) {
  return {type: actionTypes.FETCH_ONE, payload};
}

export function fetchEmployeeSuccess(payload) {
  const byId = {[payload.id]: payload};
  return {type: actionTypes.FETCH_ONE_SUCCESS, payload: {byId}};
}

export function fetchEmployees(payload) {
  return {type: actionTypes.FETCH_COLLECTION, payload};
}

export function fetchEmployeesSuccess(posts, params) {
  const byId = keyBy(posts, (post) => post.id);
  return {type: actionTypes.FETCH_COLLECTION_SUCCESS, payload: {byId, params}};
}

export function createEmployee(payload) {
  return {type: actionTypes.CREATE, payload};
}

export function createEmployeeSuccess(payload) {
  return {type: actionTypes.CREATE_SUCCESS, payload};
}

export function updateEmployee(payload) {
  return {type: actionTypes.UPDATE, payload};
}

export function updateEmployeeSuccess(payload) {
  return {type: actionTypes.UPDATE_SUCCESS, payload};
}

export function deleteEmployee(payload) {
  return {type: actionTypes.DELETE, payload};
}

export function deleteEmployeeSuccess(payload) {
  return {type: actionTypes.DELETE_SUCCESS, payload};
}

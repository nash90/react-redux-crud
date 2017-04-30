export function getParams(state) {
  return state.employees.params;
}

export function getPost(state, id) {
  return state.employees.byId[id];
}

export function getPosts(state) {
  return Object.values(state.employees.byId);
}

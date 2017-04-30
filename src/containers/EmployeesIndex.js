import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { EmployeesList } from '../components/employees/EmployeesList';
import { SearchInput } from '../components/shared/SearchInput';
import { postsActions, postsSelectors } from '../store/employees/index';

@connect(
  (state) => {
    return {
      params: postsSelectors.getParams(state),
      employees: postsSelectors.getPosts(state),
    };
  }
)
export class EmployeesIndex extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.handleSearch = this.handleSearch.bind(this, 'title_like');
  }

  componentDidMount() {
    this.fetchEmployees({});
  }

  fetchEmployees(params) {
    this.context.store.dispatch(postsActions.fetchEmployees(params));
  }

  deleteEmployee(employee) {
    this.context.store.dispatch(postsActions.deleteEmployee(employee));
  }

  handleSearch(field, value) {
    this.fetchEmployees({q: value})
  }

  render() {
    const {
      params,
      employees,
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <SearchInput
              value={params.q}
              onSearch={this.handleSearch}
              placeholder="Title search ..."
            />
          </div>
          <div className="col-md-6 text-right">
            <Link to="/employees/new" className="btn btn-primary">New Post</Link>
          </div>
        </div>
        {employees.length > 0 &&
        <EmployeesList employees={employees} onDelete={this.deleteEmployee}/>}
      </div>
    );
  }
}

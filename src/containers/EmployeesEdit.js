import React from 'react';
import Textarea from 'react-textarea-autosize';
import { postsActions, postsSelectors } from '../store/employees/index';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

@connect(
  (state, props) => {
    return {
      employee: postsSelectors.getPost(state, props.params.employeeId),
    };
  }
)
export class EmployeesEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  static propTypes = {
    params: React.PropTypes.object,
    employee: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      employeeId: this.props.params.employeeId,
      employee: {id: '', name: '', address: '', phone: '', email: '', job: '', salary: ''}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.employee, this.state.employee)) {
      this.setState({...this.state, employee: nextProps.employee});
    }
  }

  componentDidMount() {
    if (this.state.employeeId) {
      this.context.store.dispatch(postsActions.fetchEmployee(this.props.params.employeeId));
    }
  }

  handleChange(field, e) {
    const employee = Object.assign({}, this.state.employee, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {employee}));
  }

  handleSubmit() {
    if (this.state.employeeId) {
      this.context.store.dispatch(postsActions.updateEmployee(this.state.employee));
    } else {
      this.context.store.dispatch(postsActions.createEmployee(this.state.employee));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.employee.name}
            onChange={this.handleChange.bind(this, 'name')} />
        </div>

        <div className="form-group">
          <label className="label-control">Address</label>
          <Textarea
            className="form-control"
            value={this.state.employee.address}
            onChange={this.handleChange.bind(this, 'address')} />
        </div>

        <div className="form-group">
          <label className="label-control">Phone</label>
          <Textarea
            className="form-control"
            value={this.state.employee.phone}
            onChange={this.handleChange.bind(this, 'phone')} />
        </div>

        <div className="form-group">
          <label className="label-control">Email</label>
          <Textarea
            className="form-control"
            value={this.state.employee.email}
            onChange={this.handleChange.bind(this, 'email')} />
        </div>

        <div className="form-group">
          <label className="label-control">Job</label>
          <Textarea
            className="form-control"
            value={this.state.employee.job}
            onChange={this.handleChange.bind(this, 'job')} />
        </div>

        <div className="form-group">
          <label className="label-control">Salary</label>
          <Textarea
            className="form-control"
            value={this.state.employee.salary}
            onChange={this.handleChange.bind(this, 'salary')} />
        </div>

        <button type="submit" className="btn btn-default">
          {this.state.employeeId ? 'Update' : 'Create' } Post
        </button>
      </form>
    );
  }
}

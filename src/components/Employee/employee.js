import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import React from 'react';
import Pagination from './pagination';
import _ from 'lodash';

import * as actions from '../../actions/employeeActions';


class Employee extends React.Component {

  constructor() {
    super();
    this.state = {
      pageSize: 5,
      currentPage: 1,
    };
  }

  componentDidMount(){
      if (this.props.employees && this.props.employees[0].EmployeeId == '') {
        this.props.actions.loadEmployees();
      }
    }

    handlePageChange = Page => {
      this.setState({ currentPage: Page });
    };

   GetPageEmployees = (allemployees, pageNumber, pageSize) => {
      let startIndex = (pageNumber - 1) * pageSize;
      const employees = _(allemployees)
        .slice(startIndex)
        .take(pageSize)
        .value();
      return employees;
    };

    handleDelete = (id)=>{
      this.props.actions.deleteEmployee(id).then(()=>{
      const pageLength = Math.ceil(
        this.props.employees.length /
          this.state.pageSize
      );
      const currentPage =
        pageLength < this.state.currentPage ? pageLength : this.state.currentPage;
      this.setState({ currentPage });
    });
    }

  render() {
    const {employees} = this.props;
    const {currentPage, pageSize} = this.state;
    
    let filteredEmployees = this.GetPageEmployees(employees, currentPage, pageSize);

    const allCount = employees.length;
    return (      
      <div>
      <div style={{display : "flex", justifyContent: "space-between", marginBottom : "5px", backgroundColor: "transparent"}}>
      <h4>Employee Details</h4>
      <Link to='/add' className="btn btn-primary btn-sm">Create</Link>
      </div>
      {this.props.employees[0].EmployeeId != ''  > 0 && <GetTableBody 
        filteredEmployees = {filteredEmployees}
        allCount = {allCount}
        pageSize = {pageSize}
        currentPage = {currentPage}
        onPageChange = {this.handlePageChange}
        onDelete = {this.handleDelete}
        />}
       {this.props.employees[0].EmployeeId == '' && (<div className="card"><p style={{ margin: "10px", fontWeight: "bold" }}>
       There are no employees in the database.
     </p></div>)}
   
         </div>
  );
  }
}

  export const GetTableBody=({filteredEmployees, allCount, pageSize, currentPage, onPageChange, onDelete})=>{
  return(
    <React.Fragment>
  <table className = "table table-striped" >
  <thead className = "black white-text">
  <tr>
    <th>Employee ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th></th>
   <th></th>
  </tr>
</thead>
<tbody>
{filteredEmployees.map(item => (
  <tr key={item.EmployeeId}>
      <td>{item.EmployeeId}</td>
      <td className = "wordBreak">{item.FirstName}</td>
      <td className="wordBreak">{item.LastName}</td>
      <td className ="wordBreak">{item.Email}</td>
      <td> <Link
      to={`/update/${item.EmployeeId}`}
      value="Update"
      className="btn btn-primary btn-sm"
      employee = {item}>Update</Link></td>
      <td> <button
      value="delete"
      className="btn btn-danger btn-sm"
      employee = {item}
      onClick = {()=>onDelete(item.EmployeeId)}>Delete</button></td>
     
  </tr>
))}
</tbody>
</table>
<Pagination
          totalEmployees={allCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        /></React.Fragment>)

}

function mapStateToProps(state) {
  if (state.employees.length > 0) {
    return {
      employees: state.employees
    };
  } else {
    return {
      employees: [{EmployeeId: '', FirstName: '', LastName: '', Email: ''}]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from 'react';
import * as actions from '../../actions/employeeActions';
import {FormErrors} from '../../common/formerrors';

class EmployeeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {EmployeeId:'',FirstName: '',LastName: '', Email:''},
      formerrors : {FirstName: '',LastName: '', Email:''},
      firstNameValid : this.props.match.params.id ? true : false,
      emailValid : this.props.match.params.id ? true : false,
      formValid : false,
      IsSaveSuccess : false
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    if(id){
    fetch(`${process.env.REACT_APP_API}/${id}`)
    .then(response => response.json())
    .then(data => {
        this.setState({employee : data});
    });      
  }
  }

  updateEmployeeState = (event)=> {
    const field = event.target.name;
    const value = event.target.value;
    const employee = this.state.employee;
    employee[field] = value;
    return this.setState({employee: employee}, ()=>{
      this.validateField(field, value);
    });
    
  }

  validateField=(fieldName, value)=> {
    let fieldValidationErrors = this.state.formerrors;
    let firstNameValid = this.state.firstNameValid;
    let emailValid = this.state.emailValid;
    switch(fieldName) {
      case 'Email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
        break;
      case 'FirstName':
        firstNameValid = value.trim().length > 0;
        fieldValidationErrors.FirstName = firstNameValid ? '': ' is required';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    firstNameValid: firstNameValid
                  }, this.validateForm);
  }
  
  validateForm=()=> {
    this.setState({formValid: this.state.emailValid && this.state.firstNameValid});
  }

  saveEmployee= (event) =>{
    event.preventDefault();
    if(this.props.match.params.id){
    this.props.actions.updateEmployee(this.state.employee)
    }
    else{
      this.props.actions.createEmployee(this.state.employee)
    }
    this.setState({IsSaveSuccess: true});
    this.props.history.push("/");  
}

  handleback = () =>{
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
      
      <h4>{this.props.match.params.id ? "Update Employee" : "Create Employee" }</h4>
      <div className ="card">
      <div className="card-body">
        <form>
          <div className ="col-sm-12">
          <label htmlFor="FirstName" className="col-sm-2 offset-sm-3 textAlignRight">First Name :</label>
          <input type="text" name="FirstName" id="FirstName" className="col-sm-3" value={this.state.employee.FirstName} onChange={this.updateEmployeeState}></input>
          </div>
          
          <div className="col-sm-12">
          <label htmlFor="LastName" className="col-sm-2 offset-sm-3 textAlignRight">Last Name :</label>
          <input type="text" name="LastName" id="LastName" className="col-sm-3" value={this.state.employee.LastName} onChange={this.updateEmployeeState}></input>
          </div>

          <div className="col-sm-12">
          <label htmlFor="Email" className="col-sm-2 offset-sm-3 textAlignRight">Email :</label>
          <input type="text" name="Email" id="Email" className="col-sm-3" value={this.state.employee.Email} onChange={this.updateEmployeeState}></input>
          </div>

          <div className="col-sm-8 offset-sm-6">
          <input
            type="submit"
            className="btn btn-primary marginRight10px"
            onClick={this.saveEmployee}
            disabled = {!this.state.formValid}
            value = "Submit"
            />
            
            <input type="button" className="btn btn-primary" onClick={this.handleback} value="Back"/>
          {this.state.IsSaveSuccess && <p style={{color : "green", fontWeight: "bold"}}>Employee Saved Successfully</p>}
            </div>
        </form>
        </div>
      
        </div>
        <FormErrors formErrors={this.state.formerrors}/>
        </div>
  );
  }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);

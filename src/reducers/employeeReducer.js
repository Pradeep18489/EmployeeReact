import {LOAD_EMPLOYEE_SUCCESS} from '../actions/employeeActions';
import {CREATE_EMPLOYEE_SUCCESS} from '../actions/employeeActions';
import {UPDATE_EMPLOYEE_SUCCESS} from '../actions/employeeActions';
import {DELETE_EMPLOYEE_SUCCESS} from '../actions/employeeActions';
const defaultstate = { Employees : [] };
export default function employeeReducer(state = defaultstate, action) {
  switch(action.type) {
    case LOAD_EMPLOYEE_SUCCESS:
     return action.employees;
     case CREATE_EMPLOYEE_SUCCESS:
      return [
        ...state.filter(employee => employee.EmployeeId !== action.employee.EmployeeId),
        Object.assign({}, action.employee)
      ]
    case UPDATE_EMPLOYEE_SUCCESS:
      return [
        ...state.filter(employee => employee.EmployeeId !== action.employee.EmployeeId),
        Object.assign({}, action.employee)
      ]
    case DELETE_EMPLOYEE_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfEmpToDelete = state.findIndex(employee => {return employee.EmployeeId == action.id})
      newState.splice(indexOfEmpToDelete, 1);
      return newState;
   }
    default: 
      return state;
  }
}

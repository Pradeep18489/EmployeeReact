import employeeApi from '../api/EmployeeApi';

export const LOAD_EMPLOYEE_SUCCESS = "LOAD_EMPLOYEE_SUCCESS";
export const CREATE_EMPLOYEE_SUCCESS = "CREATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const loadEmployeesSuccess = employees => ({ type: LOAD_EMPLOYEE_SUCCESS, employees });
export const createEmployeeSuccess = employee => ({ type: CREATE_EMPLOYEE_SUCCESS, employee });
export const updateEmployeeSuccess = employee => ({ type: UPDATE_EMPLOYEE_SUCCESS, employee });
export const deleteEmployeeSuccess = id => ({ type: DELETE_EMPLOYEE_SUCCESS, id });

export function loadEmployees() {
  return function(dispatch) {
    return employeeApi.getAllEmployees().then(employees => {
      dispatch(loadEmployeesSuccess(employees));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateEmployee(employee) {
  return function (dispatch) {
    return employeeApi.updateEmployee(employee).then(response => {
      dispatch(updateEmployeeSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createEmployee(employee) {
  return function (dispatch) {
    return employeeApi.createEmployee(employee).then(response => {
      dispatch(createEmployeeSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteEmployee(id) {
  return function(dispatch) {
    return employeeApi.deleteEmployee(id).then(() => {
      dispatch(deleteEmployeeSuccess(id));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}








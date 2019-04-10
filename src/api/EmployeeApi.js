 class EmployeeApi{
 static getAllEmployees() {
    const request = new Request((`${process.env.REACT_APP_API}`), {
      method: 'GET'
    });
    return fetch(request)
    .then(response => {
        return response.json()});
  }
  
  static updateEmployee(employee) {
    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request(`${process.env.REACT_APP_API}/${employee.EmployeeId}`, {
      method: 'PUT',
      headers: headers, 
      body: JSON.stringify(employee)
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

   static createEmployee(employee) {
     const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request(`${process.env.REACT_APP_API}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(employee)
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteEmployee(id) {
    const headers = Object.assign({'Content-Type': 'application/json'});
    const request = new Request(`${process.env.REACT_APP_API}/${id}`, {
      method: 'DELETE', 
      headers: headers
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default EmployeeApi;
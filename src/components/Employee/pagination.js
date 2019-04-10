import React, { Component } from "react";
import _ from "lodash";
class Pagination extends Component {
  state = {};
  render() {
    var totalPages = Math.ceil(this.props.totalEmployees / this.props.pageSize);
    var pages = _.range(1, totalPages + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === this.props.currentPage
                  ? "page-item active cursorPointer"
                  : "page-item cursorPointer"  
              } 
              
            >
              <a
                className="page-link"
                onClick={() => this.props.onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;

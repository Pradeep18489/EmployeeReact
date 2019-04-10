import React from 'react';
import Pagination from '../components/Employee/pagination';
import renderer from 'react-test-renderer';

test('Page changes when clicked', () => {
  const component = renderer.create(
    <Pagination></Pagination>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onPageChange();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
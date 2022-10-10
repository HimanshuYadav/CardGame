import React from 'react';
import {create} from 'react-test-renderer';
import Header from '../src/common/components/header/Header';

const tree = create(<Header />);

test('snapshot_header_component', () => {
  expect(tree).toMatchSnapshot();
});

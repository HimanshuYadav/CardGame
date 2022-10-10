import React from 'react';
import {create} from 'react-test-renderer';
import BackCard from '../src/common/components/card/BackCard';

const tree = create(<BackCard />);

test('snapshot_backcard_component', () => {
  expect(tree).toMatchSnapshot();
});

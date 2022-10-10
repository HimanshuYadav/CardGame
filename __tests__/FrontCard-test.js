import React from 'react';
import {create} from 'react-test-renderer';
import FrontCard from '../src/common/components/card/FrontCard';

const tree = create(<FrontCard />);

test('snapshot_frontcard_component', () => {
  expect(tree).toMatchSnapshot();
});

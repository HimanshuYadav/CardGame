import React from 'react';
import {create} from 'react-test-renderer';
import AnimatedCard from '../src/common/components/card/AnimatedCard';

const tree = create(<AnimatedCard cardData={{animatedValue: 0}} />);

test('snapshot_animated_card', () => {
  expect(tree).toMatchSnapshot();
});

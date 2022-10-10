import React from 'react';
import {create} from 'react-test-renderer';
import PopupModal from '../src/common/components/modal/Popup';

const tree = create(<PopupModal />);

test('snapshot_popup_modal', () => {
  expect(tree).toMatchSnapshot();
});

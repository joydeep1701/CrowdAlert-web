import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Label, Icon, Dropdown } from 'semantic-ui-react';
import ShareModal from '../Share';

/**
 * [EventFooter Footer Bar component for Events Card ]
 * @param {[type]} props [description]
 */
const EventFooter = props => (
  <Menu widths={3}>
    <Menu.Item active>
      <Icon color="red" name="thumbs up" />
      <Label color="red" floating>12</Label>
          Upvoted
    </Menu.Item>
    <Menu.Item>
      <ShareModal title={props.title}>
        <div>
          <Icon color="black" name="external share" />
              Share
        </div>
      </ShareModal>
    </Menu.Item>
    <Menu.Item>
      <Icon color="black" name="flag" /> Flag
    </Menu.Item>
  </Menu>
);
EventFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventFooter;

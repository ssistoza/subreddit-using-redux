import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

const Picker = ({ value, onChange, options }) => {
  const selectableOptions = options.map(option => ({
    value: option,
    key: option,
    text: option,
  }));

  return (
    <React.Fragment>
      <Dropdown
        onChange={e => onChange(e.target.textContent)}
        options={selectableOptions}
        value={value}
        selection
      />
    </React.Fragment>
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Picker;

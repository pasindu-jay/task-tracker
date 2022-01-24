import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='looding...'
        style={{ width: '200px', margin: 'auto', display: 'block' }}></img>
    </Fragment>
  );
};

export default Spinner;

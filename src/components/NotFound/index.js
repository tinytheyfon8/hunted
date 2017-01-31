import React from 'react';

import './style.css';

// The wildcard route in react router routes directs to
// this NotFound component.
const NotFound = () => (
  <div className="NotFound">
    <h1>404 <small>Not Found</small></h1>
  </div>
);

export default NotFound;

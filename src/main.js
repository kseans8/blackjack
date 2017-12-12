import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Game from './game'

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Game),
    document.getElementById('mount')
  );
});

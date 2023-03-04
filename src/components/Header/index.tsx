import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const NAVIGATION_TABS = [
  {
    name: 'Task List',
    route: '/tasklist',
  },
  {
    name: 'Chart',
    route: '/chart',
  },
];

const Header = () => (
  <>
    <nav>
      {NAVIGATION_TABS.map((i, index) => (
        <NavLink to={i.route} key={index} className="nav-tab">
          {i.name}
        </NavLink>
      ))}
    </nav>
    <div className="divider" />
  </>
);

export default Header;

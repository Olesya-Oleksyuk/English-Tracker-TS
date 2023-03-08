import React from 'react';
import { NavLink } from 'react-router-dom';
import { getText } from '../../multiLanguage/LanguageProvider';
import './style.css';

const Header = () => {
  const NAVIGATION_TABS = [
    {
      name: getText('NAVIGATION_TABS.TASK_LIST'),
      route: '/tasklist',
    },
    {
      name: getText('NAVIGATION_TABS.CHART'),
      route: '/chart',
    },
  ];

  return (
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
};

export default Header;

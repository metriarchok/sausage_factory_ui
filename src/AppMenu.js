import React, { createElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import SubMenu from './comp/Layout/SubMenu';
import PropTypes from 'prop-types';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DescriptionIcon from '@material-ui/icons/Description';
import MapIcon from '@material-ui/icons/Map';

const AppMenu = ({ onMenuClick, logout }) => {
  const [state, setState] = useState({
    menuMeta: false,
    menuLeg: false
  });
  const handleToggle = menu => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  const mainItems = ['users', 'comments'];
  const metaItems = ['bill_types', 'mime_types', 'sponsor_types', 'role_types', 'parties'];
  const legItems = ['states', 'people', 'committees', 'bodies'];
  const billItems = ['bills', 'bill_tracker_timeline', 'ls/search', 'sessions', 'roll_calls'];
  const trackerItems = ['tracker_steps'];

  return (
    <div>
      {resources
        .filter(r => mainItems.includes(r.name))
        .map(resource => (
          <MenuItemLink
            key={resource.name}
            to={`/${resource.name}`}
            primaryText={(resource.options && resource.options.label) || resource.name}
            leftIcon={createElement(resource.icon || FormatListBulletedIcon)}
            onClick={onMenuClick}
            sidebarIsOpen={open}
          />
        ))}
      <SubMenu
        handleToggle={() => handleToggle('menuBills')}
        isOpen={state.menuBills}
        sidebarIsOpen={open}
        name="Bills"
        icon={<DescriptionIcon />}
        dense={false}>
        {resources
          .filter(r => billItems.includes(r.name))
          .map(resource => (
            <MenuItemLink
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={(resource.options && resource.options.label) || resource.name}
              leftIcon={createElement(resource.icon || FormatListBulletedIcon)}
              onClick={onMenuClick}
              sidebarIsOpen={open}
            />
          ))}
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle('menuLeg')}
        isOpen={state.menuLeg}
        sidebarIsOpen={open}
        name="Legislature"
        icon={<AccountBalanceIcon />}
        dense={false}>
        {resources
          .filter(r => legItems.includes(r.name))
          .map(resource => (
            <MenuItemLink
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={(resource.options && resource.options.label) || resource.name}
              leftIcon={createElement(resource.icon || FormatListBulletedIcon)}
              onClick={onMenuClick}
              sidebarIsOpen={open}
            />
          ))}
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle('menuTracker')}
        isOpen={state.menuTracker}
        sidebarIsOpen={open}
        name="Tracker"
        icon={<MapIcon />}
        dense={false}>
        {resources
          .filter(r => trackerItems.includes(r.name))
          .map(resource => (
            <MenuItemLink
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={(resource.options && resource.options.label) || resource.name}
              leftIcon={createElement(resource.icon || FormatListBulletedIcon)}
              onClick={onMenuClick}
              sidebarIsOpen={open}
            />
          ))}
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle('menuMeta')}
        isOpen={state.menuMeta}
        sidebarIsOpen={open}
        name="Meta Data"
        icon={<FormatListBulletedIcon />}
        dense={false}>
        {resources
          .filter(r => metaItems.includes(r.name))
          .map(resource => (
            <MenuItemLink
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={(resource.options && resource.options.label) || resource.name}
              leftIcon={createElement(resource.icon || FormatListBulletedIcon)}
              onClick={onMenuClick}
              sidebarIsOpen={open}
            />
          ))}
      </SubMenu>

      {isXSmall && logout}
    </div>
  );
};

AppMenu.propTypes = {
  onMenuClick: PropTypes.func,
  logout: PropTypes.func
};

export default withRouter(AppMenu);

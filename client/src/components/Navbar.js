// @Packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// @Project
import '../styles/components/Navbar.scss';

const Navbar = (props) => {
  return (
    <div className="navigation">
      <NavLink to="/boards" className="navigation__link">Boards</NavLink>
      <NavLink to="/profile" className="navigation__link">Profile</NavLink>
      <NavLink to="/logout" className="navigation__link">Log out</NavLink>
    </div>
  )
}

export default Navbar;
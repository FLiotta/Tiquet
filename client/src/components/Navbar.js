// @Packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// @Project
import { logout } from '../actions/session';

// @Own
import '../styles/components/Navbar.scss';

const Navbar = ({ logout }) => {
  return (
    <div className="navigation">
      <NavLink to="/boards" className="navigation__link">Boards</NavLink>
      <NavLink to="/profile" className="navigation__link">Profile</NavLink>
      <a href="#" onClick={() => logout()} className="navigation__link">Log out</a>
    </div>
  )
}

Navbar.propTypes = {
  logout: propTypes.func,
};

const dispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(undefined, dispatchToProps)(Navbar);
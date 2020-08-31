// Packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// Project
import { logout } from '../../actions/session';
import './styles.scss';

const Navbar = ({ logout }) => {
  return (
    <div className="navigation">
      <NavLink to="/boards" className="navigation__link">Boards</NavLink>
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
// Packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Project
import { logout } from '../../actions/session';
import './styles.scss';

interface NavbarProps {
  logout: Function,
};

const Navbar = ({ logout }: NavbarProps): JSX.Element => {
  return (
    <div className="navigation">
      <NavLink to="/boards" className="navigation__link">Boards</NavLink>
      <a href="#" onClick={() => logout()} className="navigation__link">Log out</a>
    </div>
  )
}

const dispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(undefined, dispatchToProps)(Navbar);
// Packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Project
import { toggleCookiesModal, logout } from '../../actions/session';
import './styles.scss';

interface NavbarProps {
  logout(): void,
  toggleCookiesModal(): void,
};

const Navbar = ({
  logout,
  toggleCookiesModal,
}: NavbarProps): JSX.Element => {
  const handleManageCookies = (e) => {
    e.preventDefault();
    toggleCookiesModal();
  }

  return (
    <div className="navigation">
      <a href="#" onClick={handleManageCookies} className="navigation__link">Manage cookies</a>
      <NavLink to="/boards" className="navigation__link">Boards</NavLink>
      <a href="#" onClick={() => logout()} className="navigation__link">Log out</a>
    </div>
  )
}

const dispatchToProps = dispatch => ({
  toggleCookiesModal: () => dispatch(toggleCookiesModal()),
  logout: () => dispatch(logout()),
});

export default connect(undefined, dispatchToProps)(Navbar);
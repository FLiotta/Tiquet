// Packages
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Project
import { trackPageView } from '../../utils/ga';
import LandingImage from '../../assets/images/list-landing.jpg';
import './styles.scss';

const Landing = (): JSX.Element => {
  const [titleLabel, setTitleLabel] = useState('Projects');
  const options: string[] = ['Projects', 'Ideas', 'Team', 'Days'];

  useEffect(() => {
    const changeTextInterval = setInterval(() => {
      const random: number = Math.floor(Math.random() * options.length);
      setTitleLabel(options[random]);
    }, 4000);

    trackPageView('Landing');

    return (): void => {
      clearInterval(changeTextInterval);
    }
  }, []);

  return (
    <div className="landing">
      <div className="landing__nav">
        <h1 className="landing__nav-logo">TIQUET</h1>
        <div>
          <Link to="/auth?mode=signup">
            <button className="btn btn-primary">Sign up</button>
          </Link>
          <Link className="landing__nav-login" to="/auth?mode=login">Log in</Link>
        </div>
      </div>
      <div className="landing__body">
        <div className="landing__body-left">
          <h1 className="landing__body-title">
            Organize your <span className="landing__body-label">{titleLabel}</span>
            <br />
            with tiquet
          </h1>
          <p className="landing__body-description">
            Open source project management tool inspired in the kanban methodology.
          </p>
          <div className="landing__body-btns">
            <div>
              <Link to="/auth?mode=signup">
                <button className="btn btn-primary">Start now</button>
              </Link>
            </div>
            <div>
              <a href="https://github.com/FLiotta/Tiquet" target="_blank">
                <button className="btn btn-primary"><i className="fab fa-github"></i> Repositoriy</button>
              </a>
            </div>
          </div>
        </div>
        <img src={LandingImage} className="landing__body-image" />
      </div>
    </div>
  );
}

export default Landing;
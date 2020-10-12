// Packages
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Project
import { trackPageView } from '../../utils/ga';
import LandingImage from '../../assets/images/list-landing.png';
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
            An open source alternative, create boards,
            <br />
            lists and tasks.
          </p>
          <p className="landing__body-description">Simple and easy to use, as all thing should be.</p>
          <Link to="/auth?mode=signup">
            <button className="btn btn-primary">Start now</button>
          </Link>
        </div>
        <img src={LandingImage} className="landing__body-image" />
      </div>
    </div>
  );
}

export default Landing;
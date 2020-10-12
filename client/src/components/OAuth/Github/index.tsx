// Packages
import React from 'react';
import qs from 'qs';
import { v4 as uuidv4 } from 'uuid';

// Project
import { trackEvent } from '../../../utils/ga';
import { OAUTH_GITHUB } from '../../../config';
import './styles.scss';

interface IProps {
  onSuccess(code: string, state: string): any
  text?: string,
};

const GithubOAuth = ({
  onSuccess,
  text
}: IProps): JSX.Element => {
  const openModal = () => {
    trackEvent({
      category: 'OAUTH',
      action: 'Opened Github Modal'
    });

    const state = uuidv4();
    const url = `https://github.com/login/oauth/authorize?scope=user:email&state=${state}&client_id=${OAUTH_GITHUB.CLIENT_ID}`;
    const popup = window.open(url, '', "width=400,height=600,left=400,top=50");

    popup.onbeforeunload = (e) => {
      const { code } = qs.parse(popup.location.search, { ignoreQueryPrefix: true });
      onSuccess(code, state);
    }
  }

  return (
    <div className="oauth-github" onClick={openModal}>
      <i className="oauth-github__icon fab fa-github" aria-hidden="true"></i>
      <p className="oauth-github__text">{text || 'Auth with Github'}</p>
    </div>
  )
}

export default GithubOAuth;
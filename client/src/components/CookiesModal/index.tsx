// Packages
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Modal from 'react-modal';
import { connect } from 'react-redux';

// Project
import { toggleCookiesModal} from '../../actions/session';
import './styles.scss';

interface ICookiesModal {
  toggleCookiesModal(): void
};

const CookiesModal = ({
  toggleCookiesModal,
}: ICookiesModal): JSX.Element => {
  const cookies = new Cookies();

  const cookiesList = {
    hasSeenCookiesModal: {
      type: 'boolean',
      interactive: false,
      description: "This cookie allows us to know if you've been already informed about what cookies we use.",
    },
    token: {
      optional: false,
      type: 'string',
      checked: true,
      interactive: true,
      description: "It stores your session token, so you don't have to Log in everytime you visit the webpage.",
    },
    allowAnalytics: {
      optional: true,
      type: 'boolean',
      interactive: true,
      checked: JSON.parse(cookies.get('allowAnalytics')),
      description: "Tiquet has google analytics implemented to learn how you interact with the application and learn from that, but it is optional, you can disable it if you like to ^^.",
    }
  }

  useEffect(() => {
    cookies.set('hasSeenCookiesModal', true)
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '700px',
      maxHeight: '100vh',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
  }

  const togglecookie = (cookie) => {
    cookiesList[cookie].checked = !cookiesList[cookie].checked;

    cookies.set(cookie, cookiesList[cookie].checked);
  }

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={toggleCookiesModal}
    >
      <div className="cookies-modal">
        <div className="cookies-modal__header">
          <h5 className="cookies-modal__header-title">
            {"<sarcasm>"}
            <br />
            <span style={{ marginLeft: 25 }}>Oh wow... cookies... in 2020... i didn't see that coming.</span>
            <br />
            {"</sarcasm>"}
          </h5>
        </div>
        <hr />
        <div className="cookies-modal__body">
          <p>
            Hello! before you get deep into the website, i'd like to inform you what cookies we use and for what reasons.
          </p>
          {Object.keys(cookiesList).map((cookieName) => {
            const { interactive, type, optional, description, checked } = cookiesList[cookieName];

            return (
              <div className="cookies-modal__body-cookie">
                <div className="cookies-modal__body-cookie__description">
                  <p>
                    <strong>{cookieName}</strong> ({type})
                      <br />
                    <small>Optional: {optional ? 'Yes' : 'No'}</small>
                    <br />
                    <small>Description: {description}</small>
                  </p>
                </div>
                {interactive && (
                  <div>
                    <input type="checkbox" onChange={() => togglecookie(cookieName)} defaultChecked={checked} disabled={!optional} id={name} />
                  </div>
                )}
              </div>
            )
          })}
          <small>* You can always come back to this modal and change your preferences.</small>
        </div>
        <div className="cookies-modal__footer">
          <button className="btn" onClick={toggleCookiesModal}>Close</button>
        </div>
      </div>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleCookiesModal: () => dispatch(toggleCookiesModal()),
})
export default connect(undefined, mapDispatchToProps)(CookiesModal);
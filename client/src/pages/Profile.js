// @Packages
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import cn from 'classnames';

// @Project
import '../styles/pages/Profile.scss';
import { fetchProfile } from '../actions/profile';
import { selectProfile } from '../selectors/profile';
import Loading from '../components/Loading';


const Profile = ({ fetchProfile, profile, ...rest }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(JSON.stringify(profile) == '{}') {
      setLoading(true);

      fetchProfile()
        .then(() => setLoading(false));
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile__container">
        <Loading display={loading} />
        {
          !loading && (
            <Fragment>
              <h2 className="profile__username">{profile.username}</h2>
              <p className="profile__item">Boards created: {profile.boards}</p>
              <p className="profile__item">User since: {dayjs(profile.createdAt).format('DD/MM/YYYY')}</p>
            </Fragment>
          )
        }
      </div>
    </div>
  );
}

Profile.propTypes = {
  fetchProfile: propTypes.func,
  profile: propTypes.shape({
    id: propTypes.number,
    createdAt: propTypes.number,
    boards: propTypes.number,
    username: propTypes.string,
  })
}

const mapStateToProps = state => ({
  profile: selectProfile(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
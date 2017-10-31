import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Styles/App.css';
import updateBoardRooms from './Actions/updateBoardRooms';
import updateGameRooms from './Actions/updateGameRooms';
import updateProblems from './Actions/updateProblems';
import NavBar from './Components/NavBar/NavBar';
import $ from 'jquery';
import fire from './Firebase/firebase';
// import db from './Firebase/db';
import syncToDb from './Firebase/syncToDb'

import { push } from 'react-router-redux';

class App extends Component {

  componentWillMount() {
    let { updateGameRooms, updateProblems, updateBoardRooms } = this.props;
    syncToDb(updateGameRooms, updateProblems, updateBoardRooms);
    $(window).on('scroll', () => {
      if(window.scrollY > 50){
        $('.navbarLogo').fadeIn(1000);
        $('.navbarProfile').fadeIn(1000);
      } 
      if(window.scrollY < 50){
        $('.navbarLogo').fadeOut(1000);
        $('.navbarProfile').fadeOut(1000);
      }
    })
  }

  render() {
    let { navigate, currentUser } = this.props;
    let username = currentUser.email ? currentUser.email.split('@')[0] : 'null';

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HACKER ARENA</h1>
          {
            currentUser.email ? (
              <span className="profile-image" onClick={() => navigate('/User/' + username)}>
                <span className="profile-greeting"> Hi { username }! {' '} </span>
                <img className="profile-photo"
                  src={currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'}
                  alt='profile'
                >
                </img>
              </span>
            ) : null
          }
        </header>
        <NavBar 
          navigate={navigate}
          currentUser={currentUser}
        />
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameRooms: state.gameRooms,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  updateGameRooms: (rooms) => dispatch(updateGameRooms(rooms)),
  updateProblems: (problems) => dispatch(updateProblems(problems)),
  updateBoardRooms: (rooms) => dispatch(updateBoardRooms(rooms)),
  navigate: (route) => dispatch(push(route))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import Compose from './components/Compose';
import { submitForm } from '../src/actions';
import logo from './logo.svg';
import './App.css';

const ComposeRoute = () => <Compose submitForm={submitForm} />;

const Home = props => (
  <div>
    <Toolbar location={props.location.pathname} />
    <Route exact path="/compose" component={ComposeRoute} />
    <MessageList location={props.location.pathname} />
  </div>
);

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React Inbox</h2>
      </div>
      <div className="container">
        <Router>
          <div>
            <Route path="/" component={Home} />

          </div>
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const messages = state.messages;
  return {
    messages,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitForm,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);

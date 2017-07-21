import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { toggleStarred, toggleSelected, updateReadMessagesById } from '../actions';
import MessageBody from './MessageBody';
import Label from './Labels';

const MessageBodyRoute = props => (
  <MessageBody location={props.location.pathname} match={props.match} />
);

class Message extends PureComponent {
  render() {
    const read = this.props.read ? 'read' : 'unread';
    const selected = this.props.selected ? 'selected' : '';
    const checked = this.props.selected ? 'checked' : '';
    const starred = this.props.starred ? 'fa-star' : 'fa-star-o';
    return (
      <div className="container">
        <div className={`row message ${read} ${selected}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input
                  type="checkbox"
                  checked={`${checked}`}
                  onChange={() => this.props.toggleSelected(this.props.id)}
                />
              </div>
              <div className="col-xs-2">
                <i
                  className={`star fa ${starred}`}
                  onClick={() => {
                    this.props.toggleStarred(this.props.id, this.props.starred);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.props.labels.map(label =>
              <Label label={label} key={this.props.id} />,
            )}
            <Link onClick={() => this.props.updateReadMessagesById(this.props.id)} to={`/messages/${this.props.id}`}>{this.props.subject}</Link>

            <Route exact path={`/messages/${this.props.id}`} component={MessageBodyRoute} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const messages = state.messages;
  const messageById = state.messagesById;
  return {
    messages,
    messageById,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleStarred,
      toggleSelected,
      updateReadMessagesById,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Message);

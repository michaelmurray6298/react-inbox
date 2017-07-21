import React, { PureComponent } from 'react';

class Labels extends PureComponent {
  render() {
    return (
      <span className="label label-warning">
        {this.props.label}
      </span>
    );
  }
}

export default Labels;

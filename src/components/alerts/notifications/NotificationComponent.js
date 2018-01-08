import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NotificationComponent extends Component {
  render() {
    let { notifications } = this.props;
    return notifications.length > 0 ? (
      <div className="Notifications">
        {notifications.map(({ type, contentType, messages, message }, key) => (
          <div className={`alert alert-${type}`} key={key}>
            {contentType === "list" ? (
              <div className="NotificationMessages">
                {messages.map((text, key) => (
                  <div className="NotificationMessage" key={key}>
                    {text}
                  </div>
                ))}
              </div>
            ) : (
              message
            )}
          </div>
        ))}
      </div>
    ) : null;
  }
}

NotificationComponent.displayName = "NotificationComponent";

export const mapStateToProps = ({ notifications }) => ({ notifications });

NotificationComponent.propTypes = {
  notifications: PropTypes.array
};

export default connect(mapStateToProps, null)(NotificationComponent);

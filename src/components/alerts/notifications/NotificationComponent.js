import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

class NotificationComponent extends Component {
    render() {
        return (
            this.props.notifications.length > 0
            ? <div className='Notifications'>
                { this.props.notifications.map(({type, contentType, messages, message}, key) =>
                    <div className={`alert alert-${type}`} key={key}>
                        {contentType === 'list'
                        ? <div className="NotificationMessages">
                            {messages.map((text, key) => <div className="NotificationMessage" key={key}>{text}</div>)}
                          </div>
                        : message}
                    </div>
                )}
                </div>
            : null
        );
    }
}

NotificationComponent.displayName = 'NotificationComponent'

export const mapStateToProps = ({notifications}) => ({notifications})

NotificationComponent.propTypes = {
    notifications: PropTypes.array
};

export default connect(mapStateToProps, null)(NotificationComponent)
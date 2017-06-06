import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

class NotificationComponent extends Component {
    render() {
        let classNames = `alert ${this.props.notifications.type} ${this.props.notifications.isDismissable ? 'alert-dismissable': ''}`
        let closeButton = this.props.notifications.isDismissable ? <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> : null
        return (
            <div className={classNames}>
                {closeButton}
                {
                    this.props.notifications.messages.map((message, key) => <div>{message}</div>)
                }
            </div> 
        );
    }
}

NotificationComponent.displayName = 'NotificationComponent'

export const mapStateToProps = ({notifications}) => ({notifications})

NotificationComponent.propTypes = {
    notifications: PropTypes.array
};

export default connect(mapStateToProps, null)(NotificationComponent)
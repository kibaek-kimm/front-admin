import React, { Component } from 'react';
import { connect } from 'react-redux'

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const renderContent = () => {
            if (this.props.isLoading) {
                return (
                    <div className="loading-panel">
                        <div className="loading-icon"></div>
                    </div>
                )
            } else {
                return <React.Fragment></React.Fragment>;
            }
        };

        return (
            <React.Fragment>
                {renderContent()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    };
};

export default connect(mapStateToProps)(Loading);
import React from 'react'

class FaqList extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <React.Fragment>
                <h2>{this.props.title}</h2>
                <div>준비중입니다.</div>
            </React.Fragment>
        )
    }
}

export default FaqList;
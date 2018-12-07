import React from 'react'

class ShowcaseList extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="article-list">
                <h3>딜 정보 관리</h3>
                <div className="form-group">
                    <label className="col-md-2 control-label">ID</label>  
                    <div className="col-md-10">{this.state.jsonData.id}</div>
                </div>
            </div>
        )
    }
}

export default ShowcaseList;
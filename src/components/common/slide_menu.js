import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import { changeCurrentMenu } from '../../actions'

class SideMenu extends React.Component{
    constructor(props) {
        super(props);

        this.handleMenu = this.handleMenu.bind(this);
        this.state = {
            currentMenu: ''
        };
    }

    handleMenu(e, _name, _korName) {
        // this.props.onChangeMenu(_name, _korName);
        // this.setState({
        //     currentMenu: _name
        // });

        console.log('%c SideMenu Component -> handleMenu : ', 'color: #fff;background:blue;');
        console.log('parameter "_name" : ',_name);
        console.log('state.currentMenu : ',this.state.currentMenu);
        console.log('%c =============', 'color: #fff;background:blue;');
    }
    
    render() {
        const renderList = (_renderData) => {
            return _renderData.map((data, index) => {
                return (
                    <li
                        key={data.toString() + index}
                    >
                        <NavLink
                            exact={true}
                            to={`${data.link}`}
                            activeClassName="active"
                        >
                            <i className={data.iconType ? data.iconType : 'pe-7s-help1'}></i>
                            {data.korName}
                        </NavLink>
                    </li>
                )
            });
        };
        
        return (
            // onClick={() => this.props.onChangeMenu('heading')
            <div className="sidebar" data-image="https://picsum.photos/g/260/800/?random" data-color="darkgray">
                <div className="sidebar-wrapper">
                    <div className="logo">피플펀드<br/>프론트어드민</div>
                    <ul className="nav">
                        {renderList(this.props.listMap, '/')}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentMenu: state.menu.currentMenu,
        listMap: state.menu.listMap
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChangeMenu: (currentMenu, menuTitle) => dispatch(changeCurrentMenu(currentMenu, menuTitle))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
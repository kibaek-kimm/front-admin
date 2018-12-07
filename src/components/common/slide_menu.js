import React from 'react'
import { connect } from 'react-redux'
import { changeCurrentMenu } from '../../actions'
import { Link } from 'react-router-dom';

class SideMenu extends React.Component{
    constructor(props) {
        super(props);

        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu(e, _name, _korName) {
        this.props.onChangeMenu(_name, _korName);
    }
    
    render() {
        const renderList = (_renderData, _publicPath) => {
            let resultList = [],
                publicPath = _publicPath.replace(/\/$/, '');
            
            resultList = _renderData.map((data, index) => {
                return (
                    <li
                        key={data.toString() + index}
                        className={this.props.currentMenu === data.name ? 'active' : ''}
                        onClick={e => this.handleMenu(e, data.name, data.korName)}
                    >
                        <Link
                            to={data.subMenu ? 'javascript:;' : `${publicPath}/${data.name}`}
                            className={data.subMenu ? 'dropdown-toggle' : ''}
                            data-toggle={data.subMenu ? 'collapse' : ''}
                        >
                            {data.korName}
                        </Link>
                        {data.subMenu ? (
                            <ul className="collapse list-unstyled show">
                                {renderList(data.subMenu, `${publicPath}/${data.name}`)}
                            </ul>
                        ) : ''}
                    </li>
                )
            });
            
            return resultList;
        };
        
        return (
            // onClick={() => this.props.onChangeMenu('heading')
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3><a href="/">피플펀드<br/>프론트어드민</a></h3>
                </div>
                <ul className="list-unstyled components">
                    {renderList(this.props.listMap, '/')}
                </ul>
            </nav>
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

SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenu;
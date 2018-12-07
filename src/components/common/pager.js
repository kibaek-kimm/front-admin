import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Pager extends Component {
    constructor(props) {
        /*
            publicPath
            currentPage
            totalLength
            viewSize
            limitPageView
            lastPage
        */
        super(props);

        const pagePerLength = this.props.totalLength / this.props.viewSize;

        this.state = {
            pageLength: pagePerLength > 1 ? Math.ceil(pagePerLength) : 1,
            currentPage: this.props.currentPage
        }

        this.handlePage = this.handlePage.bind(this);
    }

    handlePage(event) {
        this.props.handleChangePage(Number(event.currentTarget.dataset.page));
    }

    render() {
        /**
         * 
         *  
            <li class="page-item"><a class="page-link" href="#">Previous</a></li> 
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
         */
        const renderPage = () => {
            const pageArray = [];
            for(let i = 1; i <= this.state.pageLength; i++) {
                pageArray.push((
                    <li className={this.props.currentPage == i ? 'page-item active' : 'page-item'} onClick={this.handlePage} data-page={i} key={'key-pg-' + i}>
                        <Link className="page-link" to={this.props.publicPath + i}>{i}</Link>
                    </li>
                ));
            }

            return pageArray;
        };

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {renderPage()}
                </ul>
            </nav>
        );
    }
}

export default Pager;
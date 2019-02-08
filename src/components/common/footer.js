import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    {/* <nav class="pull-left">
                        <ul>
                            <li>
                                <a href="https://peoplefund.co.kr" target="_blank">Website</a>
                            </li>
                        </ul>
                    </nav> */}
                    <p className="copyright pull-right">
                        © <a href="https://peoplefund.co.kr" target="_blank">Peoplefund</a>
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
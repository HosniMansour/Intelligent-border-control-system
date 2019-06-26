import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    <p className="copyright pull-right"> &copy; {1900 + (new Date()).getYear()} Made with <i className="fa fa-heart heart"></i>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;

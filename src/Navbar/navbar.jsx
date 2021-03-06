import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import Register from '../Login/Register';
// import classes from './Navbar.css';

export default class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    // handles the on/off for the navbar toggler
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(props) {
        let loginResgisterLogout;
        let register;
        console.log('## isLogged :', this.props.isLogged)
        if (this.props.isLogged) {
            loginResgisterLogout = <Logout isLogged={this.props.isLogged} auth_token={this.props.auth_token} handleLogout={this.props.handleLogout}/>;
        } else {
            loginResgisterLogout = <span class="login-area"> <Login username={this.props.username} password={this.props.password} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}
            /> <Register handleChange={this.props.handleChange} handleRegistration={this.props.handleRegistration} /></span>
        }
        return (
            <div>
                <Navbar color="rgba(24,24,24,0.9)" light expand="md" className='navBar'>
                    <NavbarBrand href="/" image-src="/public/images" ></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    {this.props.isLogged ? <button>Welcome {this.props.username}</button> : null}
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        {loginResgisterLogout}

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

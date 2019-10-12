import React from 'react';
import '../css/Navbar.css';
import logo from '../resources/Logo4.png';

const Navbar = () => (
    <nav>
    <a href="/">
           <img src={logo} alt="Home" id="logo"/>
    </a>
    <div className="dropdown" id="sign_in">
        <a className="navbar_item" href="#" onclick="showSignIn()">Sign In</a>
        <form>
        <div className="dropdown-content-p dropdown-padding get-this" id="sign-in">
                <div className="email">
                    <input className="form-control form-control-lg form-control-borderless" type="email" placeholder="email" name="j_username" />
                </div>
                <div className="password">
                    <input className="form-control form-control-lg form-control-borderless" type="password" placeholder="password" name="j_password" />
                </div>
                <div className="msg_error">
                    <label></label>
                </div>
                <div className="check_box">
                    <label><input type="checkbox" name="j_rememberme" />Remember me</label>
                </div>
                <div className="sign_b">
                    <input type="submit" className="btn" value="Sign In" />
                </div>
        </div>
        </form>
    </div>
    <div>
        <a className="navbar_item" id="sign_up" href="./SignUp">Sign Up</a>
    </div>
</nav>
)

export default Navbar;
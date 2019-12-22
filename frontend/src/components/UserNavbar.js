import React from 'react';
import logo from '../resources/Logo4.png';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';
import LocalStorageService from '../services/LocalStorageService'

class UserNavbar extends React.Component {
    constructor(props) {
         super(props);
         this.signOut = this.signOut.bind(this);
       }

    signOut(){
        let currentPath = this.props.location;
        LocalStorageService.clearToken()
        this.props.rerenderParentCallback();
        this.props.history.push(currentPath)
    }

    isAdmin(t){
        if(this.props.isAdmin)
            return(
                <Link to={{pathname: "/AdminGenerator"}}>
                    <a href="#" className="dropdown-item">{t("userNavbar.manage")}</a>
                </Link>
            )
        else
            return
    }


    render(){
        const { t } = this.props;
        const adminOption = this.isAdmin(t);
        return(
            <nav>
                <Link to={{pathname: "/"}}>
                    <a href="">
                        <img src={logo} alt="Home" id="logo"/>
                    </a>
                </Link>
                <NavDropdown title={t("userNavbar.options")} id="basic-nav-dropdown">
                    <Link to={{pathname: "/MyInformation"}}>
                        <a href="#" className="dropdown-item">{t("userNavbar.profile")}</a>
                    </Link>
                    <Link to={{pathname: "/Publish"}}>
                        <a href="#" className="dropdown-item">{t("userNavbar.publish")}</a>
                    </Link>
                    {adminOption}
                    <NavDropdown.Divider/>
                    <a href="#" onClick={this.signOut} className="dropdown-item">{t("userNavbar.signOut")}</a>
                </NavDropdown>
            </nav>
        )
    }

}

export default withRouter(withTranslation()(UserNavbar));
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
         this.state = {
             username: "",
             redirect: false
         }

         this.logout = this.logout.bind(this);
       }

    componentDidMount(){
        this.setState({ username: LocalStorageService.getUsername()})
    }

    logout(){
        let currentComponent = this;
        LocalStorageService.clearToken()
        currentComponent.props.history.push("/SignUp")
    }

    isAdmin(t){
        if(this.props.isAdmin)
            return(
                <Link to={{pathname: "/AdminGenerator"}}>
                    <p className="dropdown-item">{t("userNavbar.manage")}</p>
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
                    <img src={logo} alt="Home" id="logo"/>
                </Link>
                <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                    <Link to={{pathname: "/MyInformation"}}>
                        <p className="dropdown-item">{t('userNavbar.profile')}</p>
                    </Link>
                    <Link to={{pathname: "/Publish"}}>
                        <p className="dropdown-item">{t('userNavbar.publish')}</p>
                    </Link>
                    {adminOption}
                    <NavDropdown.Divider/>
                        <button onClick={this.logout} className="dropdown-item">{t('userNavbar.logout')}</button>
                </NavDropdown>
            </nav>
        )
    }

}

export default withRouter(withTranslation()(UserNavbar));
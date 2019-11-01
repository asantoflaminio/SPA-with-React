import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/AdminUsers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as axiosRequest from '../util/axiosRequest'

class userRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : null
        };
      }

      render(){
        const { t } = this.props;
        const labelID = this.state.user.id + "-label"
        const status;

        if(this.state.user.locked)
            status = t('admin.locked')
        else
            status = t('admin.unlocked')
        return(
            <div class="row">
                <div class="column">
                    <p class="user-email">{this.state.user.email}</p>
                </div>
                <div class="column">
                    <label class="switch">
                        <input type="checkBox" labelID={labelID} id={this.state.user.id} onClick={(event) => this.lockUser(event,t)} checked="false"/>
                        <span class="slider round"/>
                    </label>
                    <p class="user-status" id={labelID}>{status}</p>		
                </div>
            </div>
        );
    }

}

export default withTranslation()(userRow);
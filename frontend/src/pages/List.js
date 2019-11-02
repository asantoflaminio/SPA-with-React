import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/list.css';
import Navbar from '../components/Navbar'
import ImgsViewer from 'react-images-viewer'
import * as axiosRequest from '../util/axiosRequest'
import queryString from 'query-string'

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "queryString.parse(this.props.location.search)"
        };
      }

      render(){
        const { t } = this.props;
        return(
            <div>
                <Navbar t={t} />
            </div>
            
        );
    }

}

export default withTranslation()(List);
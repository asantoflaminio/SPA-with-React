import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/list.css';
import Navbar from '../components/Navbar'
import ImgsViewer from 'react-images-viewer'
import * as axiosRequest from '../util/axiosRequest'

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
        };
      }

      render(){
        const { t } = this.props;
        
        const state = {
            isOpen : false,         
        } 
        


        
        return(
            <div>
                <Navbar t={t} />
            </div>
        );
    }

}

export default withTranslation()(List);
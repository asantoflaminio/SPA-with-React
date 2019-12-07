import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'


class EditPublication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
      }
     

    componentDidMount(){
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

export default withTranslation()(EditPublication);

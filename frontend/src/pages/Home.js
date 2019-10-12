import React from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

function setImageBase64(base64){
  return "data:image/png;base64," + base64;
}

class Home extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        
        axios({
          method: 'get',
          url: 'home/img',
          headers: {
            'Content-Type': 'application/octet-stream'
            }
        })
        .then(function (response) {
          alert(response.status);
          alert(response.data)
          let imageNode = document.getElementById('asd');
          imageNode.src = setImageBase64(response.data);
        })
        .catch(function (error) {
          alert("Error");
        });
      }

    render(){
        return(
            <div>home
            <button onClick={this.handleSubmit}>IMG</button>
            <br></br>
            <h3 id="text"></h3>
            <img id="asd"></img>
            </div>
        );
    }

}

export default withTranslation()(Home);
import React from 'react';
import { Modal , Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import '../css/modal.css';

class ToastNotification extends React.Component{
  constructor(props) {
    super(props);
     this.state = { 
        show: false
    };
    this.handleClose = this.handleClose.bind(this)
}

  componentDidUpdate(prevProps,prevState){
    if(prevProps != this.props){
      this.setState({
        show: this.props.show
      })
    }
  }

  handleClose(){
    this.setState({
      show: false
    })
  }

  showButtons(){
    const { t } = this.props;
    if(this.props.checkModal === true){
      return(
        <>
          <Button variant="secondary" onClick={this.handleClose}>
          {t('modal.close')}
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
          {t('modal.accept')}
          </Button>
        </>
      )
    }
  }


  render(){
    setTimeout(() => {this.setState({show: false})}, 8000)
    return (
      <Modal 
        show={this.state.show} 
        onHide={this.handleClose} 
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.information}</Modal.Body>
        <Modal.Footer>
          {this.showButtons}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withTranslation()(ToastNotification);
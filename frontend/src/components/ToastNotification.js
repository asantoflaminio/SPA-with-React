import React from 'react';
import { Modal , Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import '../css/modal.css';

class ToastNotification extends React.Component{
  constructor(props) {
    super(props);
     this.state = { 
        show: false,
        oneTimeShow: true,
        timerid: null
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
}

  componentDidUpdate(prevProps,prevState){
    if(prevProps != this.props){
      this.setState({
        show: this.props.show
      })
    }
  }

  handleClose(){
    let showAgain = true;
    if(this.props.oneTimeShow !== undefined)
      showAgain = false;


    clearTimeout(this.state.timerid);
    this.setState({
      show: false,
      oneTimeShow: showAgain
    })
  }

  handleShow(){
    let showAgain = true;
    let timerid = null
    if(this.props.oneTimeShow !== undefined)
      showAgain = false;
    if(this.props.checkModal === false){
      timerid = setTimeout(() => {this.setState({show: false, oneTimeShow: showAgain})}, 7000)
      this.setState({ timerid: timerid })
    }
      
  }

  showButtons(){
    const { t } = this.props;
    if(this.props.checkModal === true){
      return(
        <>
          <Button variant="secondary" onClick={this.handleClose}>
          {t('modal.close')}
          </Button>
          <Button variant="primary" onClick={() => this.props.acceptFunction(this.props.functionParameter) & this.handleClose()}>
          {t('modal.accept')}
          </Button>
        </>
      )
    }
  }


  render(){
    let buttons = this.showButtons()
    return (
      <Modal 
        show={this.state.show && this.state.oneTimeShow} 
        onHide={this.handleClose} 
        backdrop={false}
        onShow={this.handleShow}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.information}</Modal.Body>
        <Modal.Footer>
          {buttons}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withTranslation()(ToastNotification);
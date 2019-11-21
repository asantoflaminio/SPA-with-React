import React from 'react';
import { withTranslation } from 'react-i18next';
import Navbar from '../components/Navbar'
import * as axiosRequest from '../util/axiosRequest';
import { Form, Button, Col } from 'react-bootstrap';
import '../css/Details.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImageVisualizer from '../components/ImageVisualizer'
import MapContainer from '../components/MapContainer';
import credentials from '../components/credentials'

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}` ;
class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicationID: null,
            province: null,
            city: null,
            neighborhood: null,
            address: null,
            bedrooms: null,
            bathrooms: null,
            floorSize: null,
            parking: null,
            price: null,
            title: null,
            description: null,
            image: null,
            maxImages: null,
            ownerEmail: null,
            phoneNumber: null
        }
      }

      static defaultProps = {
        center: {lat: 40.73, lng: -73.93}, 
        zoom: 12
     }

    componentDidMount(){
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search)
        const component = this
        axiosRequest.getPublication(query.publicationID).then(function (pub){
            axiosRequest.getImage(query.publicationID,0,pub).then(function (img){
                component.setState({
                    publicationID: pub.publicationID,
                    province: pub.provinceID,
                    city: pub.cityID,
                    neighborhood: pub.neighborhoodID,
                    address: pub.address,
                    bedrooms: pub.bedrooms,
                    bathrooms: pub.bathrooms,
                    floorSize: pub.dimention,
                    parking: pub.parking,
                    price: pub.price,
                    title: pub.title,
                    description: pub.description,
                    image: img,
                    maxImages: pub.images,
                    phoneNumber: pub.phoneNumber,
                    ownerEmail: pub.userEmail
                })
            })
        })
    }

    handleSendMessage(event){
        event.preventDefault();
        axiosRequest.sendMessage(event).then(function (status){
            alert("Message sent")
        })
    }

    render(){
        const { t } = this.props;
        const schema = yup.object({
            name: yup.string().required( t('errors.requiredField') ),
            email: yup.string().required(t('errors.requiredField')),
            message: yup.string().required(t('errors.requiredField')),
            ownerEmail: yup.string(),
            title: yup.string()
            });
        return(
            <div>
                <Navbar t={t} />
                <div id="cols">
                    <div id="left-col">   
                        <div class="polaroid">
                            <ImageVisualizer 
                                publicationID={this.state.publicationID}
                                maxImages={this.state.maxImages}
                                image={this.state.image}
                                page="Details"
                                imageClass="imageSize"
                                containerClass="img-with-tag mySlides"
                                nextClass="next-image pointer centerArrow"
                                previousClass="prev-image pointer centerArrow"
                            />
                            <div class="container-list">
                                <p class="direction">{this.state.address},{this.state.neighborhood}, {this.state.city},{this.state.province}</p>
                            </div>
                        </div>
                    
                        <div class="polaroid_overview">
                            <div class="container4">
                                <p class="polaroid_title">{t('details.overview')}</p>
                                <p class="agency_text">{t('details.bedrooms')} {this.state.bedrooms}</p>
                                <p class="agency_text">{t('details.bathrooms')} {this.state.bathrooms}</p>
                                <p class="agency_text">{t('details.floorSize')} {this.state.floorSize} m2</p>
                                <p class="agency_text">{t('details.parking')} {this.state.parking}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="right-col">
                        <div class="polaroid_price">
                            <div class="container2">
                                <div class="price_text">
                                    <p id="rent_sale">{t('details.price')} </p> 
                                    <p id="price_tag">U$S {this.state.price}</p>
                                </div>
                            </div>
                        </div>
                    
                        <div class="polaroid_agency">
                            <div class="container3">
                                <p class="agency_text_contact">{t('details.contact')}</p>
                                <div id="tel-container">
                                    <p class="tel-text">{t('details.phoneNumber')}</p>
                                    <p class="tel-num">{this.state.phoneNumber}</p>
                                </div>
                                <div class="fillers">
                                    <Formik
                                        validationSchema={schema}
                                        >
                                        {({
                                            values,
                                            handleChange,
                                            errors,
                                        }) => (
                                            <Form noValidate id="messageForm" onSubmit={(event) => {this.handleSendMessage(event)}}>
                                                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                                                        <Form.Label bsPrefix="contact-title">{t('details.name')}</Form.Label>
                                                        <Form.Control
                                                            type="input"
                                                            placeholder={t('details.namePlaceholder')}
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            name="name"
                                                            isInvalid={!!errors.name}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.name}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="12" controlId="validationFormik02">
                                                        <Form.Label bsPrefix="contact-title">{t('details.email')}</Form.Label>
                                                        <Form.Control
                                                            type="input"
                                                            placeholder={t('details.emailPlaceholder')}
                                                            onChange={handleChange}
                                                            name="email"
                                                            value={values.email}
                                                            isInvalid={!!errors.email}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.email}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                                        <Form.Label bsPrefix="contact-title">{t('details.message')}</Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            placeholder={t('details.messagePlaceholder')}
                                                            name="message"
                                                            onChange={handleChange}
                                                            value={values.message}
                                                            isInvalid={!!errors.message}
                                                        >
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="12" bsPrefix="hidden" controlId="validationFormik04">
                                                        <Form.Label bsPrefix="contact-title">{t('details.message')}</Form.Label>
                                                        <Form.Control
                                                            as="input"
                                                            placeholder={t('details.messagePlaceholder')}
                                                            name="ownerEmail"
                                                            onChange={handleChange}
                                                            value={this.state.ownerEmail}
                                                        >
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="12" bsPrefix="hidden" controlId="validationFormik05">
                                                        <Form.Label bsPrefix="contact-title">{t('details.message')}</Form.Label>
                                                        <Form.Control
                                                            as="input"
                                                            placeholder={t('details.messagePlaceholder')}
                                                            name="title"
                                                            onChange={handleChange}
                                                            value={this.state.title}
                                                        >
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button bsPrefix="button-contact" type="submit">{t('details.submit')}</Button>
                                            </Form>
                                            
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="polaroid_des">
                    <div class="container-list">
                        <p class="polaroid_title">{this.state.title}</p>
                        <p class="agency_text">{this.state.description}</p>
                    </div>
                </div>  
                <div class="polaroid_des">
                    <div class="container-list">
                        <p class="polaroid_title">{t('details.location')}</p>
                        <MapContainer 
                        googleMapURL= {mapURL}
                        containerElement= {<div style={{height: '300px'}}/>}
                        mapElement= {<div style={{height:'100%'}} />}
                        loadingElement= {<p> Cargando</p>}
                        />
                        
                    </div>
                </div>               
            </div>
        )
    }

}

    export default withTranslation()(Details);

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { Formik } from 'formik';
import '../css/AdminGenerator.css';
import AdminManagment from '../components/AdminManagment';
import {appendSelectElement} from '../util/function'
import LocationService from '../services/LocationService'
import ErrorService from '../services/ErrorService'
import JsonService from '../services/JsonService'
import { withRouter } from "react-router";
import ToastNotification from '../components/ToastNotification'
import * as StatusCode from '../util/StatusCode'

class AdminGenerator extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            provinces: [],
            cities: [],
            neighborhoods: [],
            showModal: false,
            titleModal: null,
            informationModal: null,
            typeModal: null

        };
    }

    componentDidMount(){
        let currentComponent = this
        LocationService.getProvinces().then(function (response){
            if(response.status !== StatusCode.OK)
                ErrorService.logError(currentComponent.props,response)
            currentComponent.setState({
                provinces: response.data,
            })
        })
      }

    handleProvinceSubmit(event,errors) {
        event.preventDefault();
        let currentComponent = this
        let province = event.target[0].value
        let provinceDTO = JsonService.getJSONParsed(event.target)
        if(Object.keys(errors).length === 0){
            LocationService.postProvince(provinceDTO).then(function (response){
                if(response.status === StatusCode.CONFLICT)
                    currentComponent.setModalError(province)
                else if(response.status === StatusCode.CREATED){
                    currentComponent.setModalInformation(province)
                    LocationService.getProvinces(currentComponent.props).then(function (response){
                    currentComponent.setState({
                        provinces: response.data
                        })
                    })
                }
                else{
                    ErrorService.logError(currentComponent.props,response)
                }
            })
        }

    }

    handleCitySubmit(event,errors) {
        event.preventDefault();
        let currentComponent = this
        let city = event.target[1].value
        let cityDTO = JsonService.getJSONParsed(event.target)
        if(Object.keys(errors).length === 0){
            LocationService.postCity(cityDTO).then(function (response){
                if(response.status === StatusCode.CONFLICT)
                    currentComponent.setModalError(city)
                else if(response.status === StatusCode.CREATED)
                    currentComponent.setModalInformation(city)
                else
                    ErrorService.logError(currentComponent.props,response)
            })
        }
       
    }

    handleNeighborhoodSubmit(event,errors) {
        event.preventDefault();
        let currentComponent = this
        let neighborhood = event.target[2].value
        let neighborhoodDTO = JsonService.getJSONParsed(event.target)
        if(Object.keys(errors).length === 0){
            LocationService.postNeighborhood(neighborhoodDTO).then(function (response){
                if(response.status === StatusCode.CONFLICT)
                    currentComponent.setModalError(neighborhood)
                else if(response.status === StatusCode.CREATED)
                    currentComponent.setModalInformation(neighborhood)
                else
                    ErrorService.logError(currentComponent.props,response)
            })
        }
    }

    updateCity(event,values){
        event.preventDefault();
        let currentComponent = this
        values.provinceID = event.target.value
        event.target.blur();
        let provinceID = event.target[0].parentElement.value
        LocationService.getCities(provinceID).then(function (response){
            if(response.status !== StatusCode.OK)
                ErrorService.logError(currentComponent.props,response)
            let select = document.getElementById("city_neighborhood")
            let cities = response.data
            select.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < cities.length; i++){
                appendSelectElement(select,cities[i].city,cities[i].cityID)
            }
        })
    }

    updateProvinceValue(event,values){
        event.preventDefault();
        values.provinceID = event.target.value
        event.target.blur();
    }

    updateCityValue(event,values){
        event.preventDefault();
        values.cityID = event.target.value
        event.target.blur();
    }

    setModalInformation(location){
        const { t } = this.props;
        this.setState({
            showModal: true,
            titleModal: t('modal.postLocation'),
            informationModal: t('modal.postLocationDetail', {location: location}),
            typeModal:"Information"
        })
    }

    setModalError(location){
        const { t } = this.props;
        this.setState({
            showModal: true,
            titleModal: t('modal.postLocationError'),
            informationModal: t('modal.postLocationDetailError', {location: location}),
            typeModal:"Error"
        })
    }



    render(){
        const { t } = this.props;
        const provinces = this.state.provinces.map(function(item){
            return <option value={item.provinceID} name="provinceID">  {item.province} </option>;
          });
        const schemaProvince = yup.object({
            province: yup.string().required(t('errors.requiredField'))
        });
        const schemacity = yup.object({
            provinceID: yup.string().required(t('errors.requiredField')),
            city: yup.string().required(t('errors.requiredField'))
        });
        const schemaNeighborhood = yup.object({
            provinceID: yup.string().required(t('errors.requiredField')),
            cityID: yup.string().required(t('errors.requiredField')),
            neighborhood: yup.string().required(t('errors.requiredField'))
        });
        return(
            <div>
                <AdminManagment t={t} active={"AdminGenerator"}/>
                <ToastNotification 
                    show={this.state.showModal}
                    title={this.state.titleModal}
                    information={this.state.informationModal}
                    type={this.state.typeModal}
                    checkModal={false}
                />
                <div className="polaroid data">
                    <div className="title-container">       
                        <h3>{t('admin.locationTitle')}</h3>  
                    </div>
                    <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.provinceLegend')}</legend>
                        <Formik 
                        validationSchema={schemaProvince}
                        initialValues={{province:""}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            resetForm();
                            setSubmitting(false);
                           }}
                        >{({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            handleBlur
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={(event) => handleSubmit(event) || this.handleProvinceSubmit(event,errors)}>
                                    <Form.Group controlId="validationFormik01">
                                        <div>
                                            <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="province"
                                                className="location-input"
                                                placeholder={t('admin.provinceHolder')}
                                                value={values.province}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.province && touched.province}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                    {errors.province}
                                            </Form.Control.Feedback>
                                        </div>
                                    <Button type="submit" id="submitProvinceButton" className="signup-submit" disabled={isSubmitting} onClick={handleChange}>{t('admin.create')}</Button>

                                    </Form.Group>
                                </Form>
                                    )}
                        </Formik>
                    </fieldset>
                    <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.cityLegend')}</legend>
                        <Formik 
                        validationSchema={schemacity}
                        initialValues={{provinceID:"", city:""}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            resetForm();
                            setSubmitting(false);
                           }}
                        >
                            {({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            isSubmitting
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={(event) => handleSubmit(event) || this.handleCitySubmit(event,errors)}>
                                    <Form.Group controlId="validationFormik02">
                                        <div>
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="provinceID"
                                            className="location-select"
                                            value={values.provinceID}
                                            onChange={(event) => this.updateProvinceValue(event,values) && handleChange(event)}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.provinceID && touched.provinceID}
                                        >
                                            <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                            {provinces}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.provinceID}
                                        </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik03">
                                        <div>
                                        <Form.Label className="location-label">{t('admin.city')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            className="location-input"
                                            placeholder={t('admin.cityHolder')}
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.city && touched.city}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                        </Form.Control.Feedback>
                                        </div>
                                    <Button type="submit" id="submitCityButton" className="signup-submit" disabled={isSubmitting} onClick={handleChange}>{t('admin.create')}</Button>
                                    </Form.Group>  
                                </Form>
                                    )}
                            </Formik>
                        </fieldset>
                        <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.neighborhoodLegend')}</legend>
                        <Formik validationSchema={schemaNeighborhood}                        
                        initialValues={{provinceID:"", cityID:"", neighborhood:""}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            resetForm();
                            setSubmitting(false);
                           }}
                        >{({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            isSubmitting
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={(event) => handleSubmit(event) || this.handleNeighborhoodSubmit(event,errors)}>
                                    <Form.Group controlId="validationFormik04">
                                        <div>
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="provinceID"
                                            className="location-select"
                                            value={values.provinceID}
                                            onChange={(event) => this.updateCity(event,values) && handleChange(event)}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.provinceID && touched.provinceID}
                                        >
                                            <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                            {provinces}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.provinceID}
                                        </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik05">
                                        <div>
                                        <Form.Label className="location-label">{t('admin.city')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="cityID"
                                            id="city_neighborhood"
                                            className="location-select"
                                            value={values.cityID}
                                            onBlur={handleBlur}
                                            onChange={(event) => this.updateCityValue(event,values) && handleChange(event)}
                                            isInvalid={!!errors.cityID && touched.cityID}
                                        >
                                            <option disabled selected value="">{t('publish.cityHolder')}</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cityID}
                                        </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik06">
                                        <div>
                                        <Form.Label className="location-label">{t('admin.neighborhood')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="neighborhood"
                                            className="location-input"
                                            placeholder={t('admin.neighborhoodHolder')}
                                            value={values.neighborhood}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.neighborhood && touched.neighborhood}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.neighborhood}
                                        </Form.Control.Feedback>
                                        </div>
                                    <Button type="submit" id="submitNeighborhoodButton" className="signup-submit" disabled={isSubmitting} onClick={handleChange}>{t('admin.create')}</Button>
                                    </Form.Group>
                                </Form>
                                    )}
                        </Formik>
                    </fieldset>
                </div>
            </div>
        );
    }
}



export default withRouter(withTranslation()(AdminGenerator));
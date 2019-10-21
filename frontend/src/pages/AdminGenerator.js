import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import * as yup from 'yup';
import { Formik } from 'formik';
import '../css/AdminGenerator.css';
import AdminManagment from '../components/AdminManagment';
import {appendSelectElement} from '../util/function'
import * as axiosRequest from '../util/axiosRequest'

class AdminGenerator extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            provinces: [],
            cities: [],
            neighborhoods: []
        };
    }

    handleProvinceSubmit(event) {
        event.preventDefault();
        axiosRequest.postProvince(event);
    }

    handleCitySubmit(event) {
        event.preventDefault();
        axiosRequest.postCity(event);
    }

    handleNeighborhoodSubmit(event) {
        event.preventDefault();
        axiosRequest.postNeighborhood(event);
    }

    componentDidMount(){
        let currentComponent = this
        axiosRequest.getProvinces().then(function (provincesList){
            currentComponent.setState({
                provinces: provincesList,
            })
        })
      }

    updateCity(event){
        event.preventDefault();
        axiosRequest.getCities(event).then(function (cities){
            let select = document.getElementById("city_neighborhood")
            select.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < cities.length; i++){
                appendSelectElement(select,cities[i].city,cities[i].cityID)
            }
        })
    }



    render(){
        const { t } = this.props;
        const provinces = this.state.provinces.map(function(item){
            return <option value={item.provinceID}>  {item.province} </option>;
          });
        const schemaProvince = yup.object({
            province: yup.string().required(t('errors.requiredField'))
        });
        const schemacity = yup.object({
            province: yup.string().required(t('errors.requiredField')),
            city: yup.string().required(t('errors.requiredField'))
        });
        const schemaNeighborhood = yup.object({
            province: yup.string().required(t('errors.requiredField')),
            city: yup.string().required(t('errors.requiredField')),
            neighborhood: yup.string().required(t('errors.requiredField'))
        });

        return(
            <div>
                <Navbar t={t} />
                <AdminManagment t={t}/>
                <div className="polaroid data">
                    <div className="title-container">       
                        <h3>{t('admin.locationTitle')}</h3>  
                    </div>
                    <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.provinceLegend')}</legend>
                        <Formik validationSchema={schemaProvince}>{({
                            values,
                            handleChange,
                            errors,
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={event => {
                                    this.handleProvinceSubmit(event);
                                }}>
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="province"
                                            className="location-input"
                                            placeholder={t('admin.provinceHolder')}
                                            value={values.province}
                                            onChange={handleChange}
                                            isInvalid={!!errors.province}
                                        />
                                    <Button type="submit" className="signup-submit">{t('admin.create')}</Button>
                                    <Form.Control.Feedback type="invalid">
                                            {errors.province}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form>
                                    )}
                        </Formik>
                    </fieldset>
                    <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.cityLegend')}</legend>
                        <Formik validationSchema={schemacity}>{({
                            values,
                            handleChange,
                            errors,
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={event => {
                                    this.handleCitySubmit(event);
                                }}>
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="provinceID"
                                            className="location-select"
                                            value={values.provinceID}
                                            onChange={handleChange}
                                            isInvalid={!!errors.provinceID}
                                        >
                                            <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                            {provinces}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik03">
                                        <Form.Label className="location-label">{t('admin.city')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            className="location-input"
                                            placeholder={t('admin.cityHolder')}
                                            value={values.city}
                                            onChange={handleChange}
                                            isInvalid={!!errors.city}
                                        />
                                    <Button type="submit" className="signup-submit">{t('admin.create')}</Button>
                                    </Form.Group>
                                </Form>
                                    )}
                            </Formik>
                        </fieldset>
                        <fieldset className="signup-list-item">
                        <legend className="legendTag">{t('admin.neighborhoodLegend')}</legend>
                        <Formik validationSchema={schemaNeighborhood}>{({
                            values,
                            handleChange,
                            errors,
                            }) => (
                                <Form noValidate className="form-inline" onSubmit={event => {
                                    this.handleNeighborhoodSubmit(event);
                                }}>
                                    <Form.Group controlId="validationFormik04">
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="provinceID"
                                            className="location-select"
                                            value={values.provinceID}
                                            onChange={(event) => handleChange && this.updateCity(event)}
                                            isInvalid={!!errors.provinceID}
                                        >
                                            <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                            {provinces}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik05">
                                        <Form.Label className="location-label">{t('admin.city')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="cityID"
                                            id="city_neighborhood"
                                            className="location-select"
                                            value={values.cityID}
                                            onChange={handleChange}
                                            isInvalid={!!errors.cityID}
                                        >
                                            <option disabled selected value="">{t('publish.cityHolder')}</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik06">
                                        <Form.Label className="location-label">{t('admin.neighborhood')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="neighborhood"
                                            className="location-input"
                                            placeholder={t('admin.neighborhoodHolder')}
                                            value={values.neighborhood}
                                            onChange={handleChange}
                                            isInvalid={!!errors.neighborhood}
                                        />
                                    <Button type="submit" className="signup-submit">{t('admin.create')}</Button>
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



export default withTranslation()(AdminGenerator);
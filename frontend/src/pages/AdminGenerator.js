import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import '../css/AdminGenerator.css';
import AdminManagment from '../components/AdminManagment';
import {getJSON, getJSONSingle} from '../util/function'
import { isTSImportEqualsDeclaration } from '@babel/types';

class AdminGenerator extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            provinces: [],
            cities: [],
            neighborhoods: []
        };
        this.updateCity = this.updateCity.bind(this);
    }

    handleProvinceSubmit(event) {
        event.preventDefault();
        const data = getJSON(event.target,1)
        const jsonObject = JSON.parse(data);
        axios({
          method: 'post',
          url: 'admin/province',
          data: jsonObject
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
            alert(error)
        });
    }

    handleCitySubmit(event) {
        event.preventDefault();
        const data = getJSON(event.target,2)
        const jsonObject = JSON.parse(data);
        axios({
          method: 'post',
          url: 'admin/city',
          data: jsonObject
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
            alert(error)
        });
    }

    handleNeighborhoodSubmit(event) {
        event.preventDefault();
        const data = getJSON(event.target,3)
        const jsonObject = JSON.parse(data);
        axios({
          method: 'post',
          url: 'admin/neighborhood',
          data: jsonObject
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
            alert(error)
        });
    }

    componentDidMount(){
        axios
          .get('admin/getProvinces')
          .then(({ data })=> {
            this.setState({
                provinces: data.provinces,
            })})
          .catch((err)=> {})
      }



    async getCities(event){
        event.preventDefault();
        const data = getJSONSingle(event.target)
        const jsonObject = JSON.parse(data);
        return await axios({
            method: 'post',
            url: 'admin/getCities',
            data: jsonObject
          })
          .then(function (response) {
              return response.data.provinces
          })
          .catch(function (error) {
              alert(error)
          });
    }

    updateCity(event){
        this.getCities(event).then(function (cities){
            let selectCity = document.getElementById("city_neighborhood")
            let newOption;
            while (selectCity.firstChild) {
                selectCity.removeChild(selectCity.firstChild);
            }
            for(let i = 0; i < cities.length; i++){
                newOption = document.createElement("option");
                newOption.value = cities[i].cityID
                newOption.innerHTML = cities[i].city
                selectCity.appendChild(newOption)
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
                        <Formik validationSchema={schemacity}>{({
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
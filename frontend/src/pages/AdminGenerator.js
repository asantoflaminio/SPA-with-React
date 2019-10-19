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
import {getJSON} from '../util/function'

class AdminGenerator extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            locations: []
        };
    }

    handleFormSubmit(event) {
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

    componentDidMount(){
        axios
          .get('admin/getLocations')
          .then(({ data })=> {
            this.setState({
                locations: data.provinces,
            })})
          .catch((err)=> {})
          
      }


    render(){
        const { t } = this.props;
        const provinces = this.state.locations.map(function(item){
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
                                    this.handleFormSubmit(event);
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
                                    this.handleFormSubmit(event);
                                }}>
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label className="location-label">{t('admin.province')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            type="text"
                                            name="province"
                                            className="location-select"
                                            value={values.province}
                                            onChange={handleChange}
                                            isInvalid={!!errors.province}
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
                </div>
            </div>
        );
    }
}



export default withTranslation()(AdminGenerator);
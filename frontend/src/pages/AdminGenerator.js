import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import '../css/AdminGenerator.css';
import AdminManagment from '../components/AdminManagment';

class AdminGenerator extends React.Component {
    render(){
        const { t } = this.props;
        const schemaProvince = yup.object({
            province: yup.string().required(t('errors.requiredField')),
        });

        return(
            <div>
                <Navbar t={t} />
                <AdminManagment t={t}/>
                <div className="polaroid data">
                    <div className="title-container">       
                        <h3>asd</h3>  
                    </div>
                    <div className="signup-list-item">
                    <Formik validationSchema={schemaProvince}>{({
                        values,
                        handleChange,
                        errors,
                        }) => (
                            <Form noValidate onSubmit={event => {
                                this.handleFormSubmit(event);
                            }}>
                                <Form.Group as={Col} md="12" controlId="validationFormik01">
                                    <Form.Label>{t('admin.province')}</Form.Label>
                                    <Form.Control
                                        as="input"
                                        type="text"
                                        name="province"
                                        className="location-input"
                                        placeholder={t('admin.provinceHolder')}
                                        value={values.province}
                                        onChange={handleChange}
                                        isInvalid={!!errors.province}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.province}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="submitButton">{t('admin.create')}</Button>
                            </Form>
                                )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}



export default withTranslation()(AdminGenerator);
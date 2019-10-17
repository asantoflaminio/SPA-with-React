import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Publish.css';
import axios from 'axios';

class Publish extends React.Component {

    handleFormSubmit(event) {
        event.preventDefault();
        const data = {
          firstName: event.target[0].value,
          lastName: event.target[1].value,
          email: event.target[2].value,
          password: event.target[3].value,
          repeatPassword: event.target[4].value,
          phoneNumber: event.target[5].value
        }
        axios({
          method: 'post',
          url: 'users/publish',
          data: data
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
        });
    }

    render() {

        const { t } = this.props;
        const schema = yup.object({
        firstName: yup.string().required( t('errors.requiredField') ).min( t('errors.shortMin') ),
        });

        return (
            <div className="box_form">
                <div>
                    <h3>{t('publish.publish')}</h3>
                </div>
                <hr/>
                <Formik
                validationSchema={schema}
                >
                {({
                    values,
                    touched,
                    errors,
                }) => (
                    <Form noValidate onSubmit={event => {
                        if(this.checkErrors(schema))
                            this.handleFormSubmit(event);
                      }}>
                        <div className="sub_box">
                            <Form.Group as={Col} md="12" controlId="validationFormik01">
                                <Form.Label>{t('publish.title')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder={t('publish.titleHolder')}
                                    value={values.firstName}
                                    id="title"
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik02">
                                <Form.Label>{t('publish.province')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder={t('publish.provinceHolder')}
                                    name="province"
                                    value={values.province}
                                    isInvalid={!!errors.province}
                                >
                                    <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.province}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik03">
                                <Form.Label>{t('publish.city')}</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="city"
                                    value={values.city}
                                    isInvalid={!!errors.city}
                                    >
                                        <option disabled selected value="">{t('publish.cityHolder')}</option>
                                    </Form.Control>  
                                    <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik04">
                                <Form.Label>{t('publish.neighborhood')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="neighborhood"
                                    value={values.neighborhood}
                                    isInvalid={!!errors.neighborhood}
                                >
                                    <option disabled selected value="">{t('publish.neighborhoodHolder')}</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.neighborhood}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik05">
                                <Form.Label>{t('publish.address')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.addressHolder')}
                                    name="address"
                                    value={values.address}
                                    isInvalid={!!errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik06">
                                <Form.Label>{t('publish.operation')}</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label={t('publish.buy')}
                                    name="operation"
                                    value="buy"
                                    checked
                                />
                                <Form.Check
                                    type="radio"
                                    label={t('publish.rent')}
                                    name="operation"
                                    value="rent"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik07">
                                <Form.Label>{t('publish.price')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.priceHolder')}
                                    name="price"
                                    value={values.price}
                                    isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>
                            </div>
                            <div className="sub_box">
                                <Form.Group as={Col} md="12" controlId="validationFormik08">
                                        <Form.Label>{t('publish.description')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            placeholder={t('publish.descriptionHolder')}
                                            name="description"
                                            value={values.description}
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik09">
                                    <Form.Label>{t('publish.type')}</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.house')}
                                        name="type"
                                        value="house"
                                        checked
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.apartment')}
                                        name="type"
                                        value="apartment"
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik10">
                                <Form.Label>{t('publish.rooms')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.roomsHolder')}
                                    name="rooms"
                                    value={values.rooms}
                                    isInvalid={!!errors.rooms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.rooms}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik11">
                                <Form.Label>{t('publish.bathrooms')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.bathroomsHolder')}
                                    name="bathrooms"
                                    value={values.bathrooms}
                                    isInvalid={!!errors.bathrooms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bathrooms}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik12">
                                <Form.Label>{t('publish.dimention')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.dimentionHolder')}
                                    name="dimention"
                                    value={values.dimention}
                                    isInvalid={!!errors.dimention}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dimention}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik13">
                                <Form.Label>{t('publish.parking')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.parkingHolder')}
                                    name="parking"
                                    value={values.parking}
                                    isInvalid={!!errors.parking}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.parking}
                                </Form.Control.Feedback>
                            </Form.Group>
                            </div>
                            <div class="down_box">
                                <h4>{t('publish.titleImages')}</h4>
                                <div className="imageViewer">
                                    <p id="imageText">{t('publish.uploadImagesText')}</p>
                                </div>
                                <button id="uploadButton">{t('publish.uploadImages')}</button>
                                <Button type="submit" id="submitButton">{t('publish.submit')}</Button>
                            </div>
                    </Form>
                )}
                </Formik>
            </div>
        );
        }
}


export default withTranslation()(Publish);
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getJSON} from '../util/function'
import '../css/Publish.css';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

class Publish extends React.Component {

    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        var file = new File(picture, "", {
            type: "image/jpg",
          });
        this.createPicture(file)
    }

    createPicture(picture){
        let wrapper = document.getElementById("imageViewer");
        if(wrapper.childNodes[0].tagName === "P")
            wrapper.removeChild(wrapper.childNodes[0]);

        var reader = new FileReader();
            reader.onload = function(){
              var dataURL = reader.result;
              var img = document.createElement("img")
              img.src = dataURL;
              img.classList.add("imageStyle");
              wrapper.appendChild(img)
            };
        reader.readAsDataURL(picture);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const data = getJSON(event.target,13)
        const jsonObject = JSON.parse(data);
        axios({
          method: 'post',
          url: 'users/publish',
          data: jsonObject
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
            alert(error)
        });
    }

    checkErrors(){
        return true;
    }

    render() {

        const { t } = this.props;
        const schema = yup.object({
        title: yup.string().required( t('errors.requiredField') ),
        province: yup.string().required(t('errors.requiredField')),
        city: yup.string().required(t('errors.requiredField')),
        neighborhood: yup.string().required(t('errors.requiredField')),
        address: yup.string().required(t('errors.requiredField')),
        price: yup.number().required(t('errors.requiredField')).positive(),
        description: yup.string().required(t('errors.requiredField')),
        bedrooms: yup.number().required(t('errors.requiredField')).positive(),
        bathrooms: yup.number().required(t('errors.requiredField')).positive(),
        dimention: yup.number().required(t('errors.requiredField')).positive(),
        parking: yup.number().required(t('errors.requiredField')).positive()


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
                    handleChange,
                    errors,
                }) => (
                    <Form noValidate id="asd" onSubmit={event => {
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
                                    onChange={handleChange}
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
                                    value="FSale"
                                    checked
                                />
                                <Form.Check
                                    type="radio"
                                    label={t('publish.rent')}
                                    name="operation"
                                    value="FRent"
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
                                    <Form.Label>{t('publish.propertyType')}</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.house')}
                                        name="propertyType"
                                        value="House"
                                        checked
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.apartment')}
                                        name="propertyType"
                                        value="Apartment"
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik10">
                                <Form.Label>{t('publish.bedrooms')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.bedroomsHolder')}
                                    name="bedrooms"
                                    value={values.bedrooms}
                                    isInvalid={!!errors.bedrooms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bedrooms}
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
                                <div className="imageViewer" id="imageViewer">
                                    <p id="imageText">{t('publish.uploadImagesText')}</p>
                                </div>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText={t('publish.uploadImages')}
                                    label= {t('publish.uploadImagesTitle')}
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg']}
                                    maxFileSize={5242880}
                                />
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
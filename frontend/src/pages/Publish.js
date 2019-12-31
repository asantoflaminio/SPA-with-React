import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Publish.css';
import { withRouter, Redirect } from "react-router";
import {appendSelectElement} from '../util/function'
import ImageUploader from 'react-images-upload';
import AdminService from '../services/AdminService'
import UserService from '../services/UserService'
import * as ValidationConst from '../util/ValidationConst'

class Publish extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
             pictures: [],
             actualImage: 0,
             provinces: []
        };
         this.onDrop = this.onDrop.bind(this);
         this.previousImage = this.previousImage.bind(this);
         this.nextImage = this.nextImage.bind(this);
         this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount(){
        let currentComponent = this
        AdminService.getProvinces(this.props).then(function (provincesList){
            currentComponent.setState({
                provinces: provincesList,
            })
        })
      }

    onDrop(picture) {
         this.setState({
            pictures: picture,
            actualImage: 0,
            }, () => {
                var file = new File([picture[0]], "", { type: "image/jpg",});
                this.createPicture(file)
                document.getElementById("imageText").classList.add("hidden");
                let count = document.getElementById("countImage")
                count.innerHTML = this.state.actualImage + 1 + "/" + this.state.pictures.length;
                count.classList.remove("hidden");
                count.classList.add("countImagesText");
            });
    }

    createPicture(picture, index){
        var reader = new FileReader();
            reader.onload = function(){
              var dataURL = reader.result;
              var img = document.getElementById("image");
              img.src = dataURL;
              img.classList.remove("hidden")
            };
        reader.readAsDataURL(picture);
    }

    previousImage(){
        let index = this.state.actualImage;
        let newIndex;
        if(this.state.pictures.length <= 1)
            return;
        if(index - 1 < 0)
            newIndex = this.state.pictures.length - 1
        else
            newIndex = index - 1;
        var file = new File([this.state.pictures[newIndex]], "", { type: "image/jpg",});
        this.createPicture(file);
        let count = document.getElementById("countImage")
        count.innerHTML = newIndex + 1 + "/" + this.state.pictures.length;
        this.setState({
            actualImage: newIndex,
        });
        
    }

    nextImage(){
        let index = this.state.actualImage;
        let newIndex;
        if(this.state.pictures.length <= 1)
            return;
        if(index + 1 === this.state.pictures.length)
            newIndex = 0
        else
            newIndex = index + 1;
        var file = new File([this.state.pictures[newIndex]], "", { type: "image/jpg",});
        this.createPicture(file);
        let count = document.getElementById("countImage")
        count.innerHTML = newIndex + 1 + "/" + this.state.pictures.length;
        this.setState({
            actualImage: newIndex,
        });
    }

    updateCity(event,values){
        event.preventDefault();
        values.provinceID = event.target.value
        event.target.blur();
        AdminService.getCities(event, this.props).then(function (cities){
            let select = document.getElementById("city-Select")
            let selectNeighborhood = document.getElementById("neighborhood-Select")
            select.selectedIndex = 0;
            selectNeighborhood.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < cities.length; i++){
                appendSelectElement(select,cities[i].city,cities[i].cityID)
            }
        })
    }

    updateNeighborhood(event,values){
        event.preventDefault();
        values.cityID = event.target.value
        event.target.blur();
        AdminService.getNeighborhoods(event, this.props).then(function (neighborhoods){
            let select = document.getElementById("neighborhood-Select")
            select.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < neighborhoods.length; i++){
                appendSelectElement(select,neighborhoods[i].neighborhood,neighborhoods[i].neighborhoodID)
            }
        })
    }

    updateNeighborhoodValue(event,values){
        event.preventDefault();
        values.neighborhoodID = event.target.value
        event.target.blur();
    }

    handleFormSubmit(event,errors) {
        let currentComponent = this
        event.preventDefault()
        if(Object.keys(errors).length === 0){
            UserService.postPublication(event, this.props).then(function (publicationID){
                UserService.postImages(publicationID,currentComponent.state.pictures,currentComponent.props).then(function (){
                    currentComponent.props.history.push({
                        pathname: '/publication',
                        search: '?publicationID=' + publicationID,
                    });
                })
            })
        }
    }

    render() {
        const { t } = this.props;
        const provinces = this.state.provinces.map(function(item){
            return <option value={item.provinceID}>  {item.province} </option>;
          });
        const schema = yup.object({
        title: yup.string().required( t('errors.requiredField') )
                            .matches(ValidationConst.lettesNumersAndSpacesRegex, t('errors.lettesNumersAndSpacesRegex'))
                            .min(ValidationConst.FIRST_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.FIRST_FORM_MAX_LENGTH, t('errors.lengthMax')),
        provinceID: yup.number().required(t('errors.requiredField')),
        cityID: yup.number().required(t('errors.requiredField')),
        neighborhoodID: yup.number().required(t('errors.requiredField')),
        address: yup.string().required(t('errors.requiredField'))
                            .matches(ValidationConst.lettesNumersAndSpacesRegexComma, t('errors.lettesNumersAndSpacesRegexComma'))
                            .min(ValidationConst.FIRST_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.FIRST_FORM_MAX_LENGTH, t('errors.lengthMax')),
        price: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex'))                   
                            .min(ValidationConst.PRICE_MIN_LENGTH, t('errors.minValue'))
                            .max(ValidationConst.PRICE_MAX_LENGTH, t('errors.maxValue')),
        description: yup.string().required(t('errors.requiredField'))
                            .matches(ValidationConst.descriptionRegex, t('errors.descriptionRegex'))
                            .min(ValidationConst.SECOND_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(ValidationConst.SECOND_FORM_MAX_LENGTH, t('errors.lengthMax')),
        bedrooms: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.LOW_MAX_NUMBER, t('errors.maxValue')),
        bathrooms: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.LOW_MAX_NUMBER, t('errors.maxValue')),
        dimention: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.DIMENSION_MAX_LENGTH, t('errors.maxValue')),
        coveredFloorSize: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.DIMENSION_MAX_LENGTH, t('errors.maxValue')),
        parking: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.LOW_MAX_NUMBER, t('errors.maxValue')),
        balconies: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(ValidationConst.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(ValidationConst.LOW_MAX_NUMBER, t('errors.maxValue')),
        expenses: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .max(ValidationConst.HIGH_MAX_NUMBER, t('errors.maxValue')),
        amenities: yup.string().required(t('errors.requiredField'))
                            .matches(ValidationConst.lettesNumersAndSpacesRegexComma, t('errors.lettesNumersAndSpacesRegexComma'))
                            .max(ValidationConst.AMENITIES_MAX_LENGTH, t('errors.lengthMax')),
        });

        return (
            <div className="box_form">
                <div>
                    <h3>{t('publish.publish')}</h3>
                </div>
                <hr/>
                <Formik
                validationSchema={schema}
                initialValues={{ title:"", provinceID:"", cityID:"", neighborhoodID:"",
                                 address:"", price:"", expenses:"", amenities:"",
                                 description:"", bedrooms:"", bathrooms:"", dimention: "",
                                 coveredFloorSize:"", parking:"", balconies:""}}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    resetForm();
                    setSubmitting(false);
                                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form onSubmit={(event) => handleSubmit(event) || this.handleFormSubmit(event,errors)} >
                        <div className="sub_box">
                            <Form.Group as={Col} md="12" controlId="validationFormik01">
                                <Form.Label>{t('publish.title')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder={t('publish.titleHolder')}
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="title"
                                    isInvalid={!!errors.title && touched.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik02"></Form.Group>
                                <Form.Label>{t('publish.province')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="provinceID"
                                    onChange={(event) => this.updateCity(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    value={values.provinceID}
                                    isInvalid={!!errors.provinceID && touched.provinceID}
                                >
                                    <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                    {provinces}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.provinceID}
                                </Form.Control.Feedback>
                            <Form.Group as={Col} md="12" controlId="validationFormik03">
                                <Form.Label>{t('publish.city')}</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="cityID"
                                    id="city-Select"
                                    onChange={(event) => this.updateNeighborhood(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    value={values.cityID}
                                    isInvalid={!!errors.cityID && touched.cityID}
                                    >
                                        <option disabled selected value="">{t('publish.cityHolder')}</option>
                                    </Form.Control>  
                                    <Form.Control.Feedback type="invalid">
                                    {errors.cityID}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik04">
                                <Form.Label>{t('publish.neighborhood')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="neighborhoodID"
                                    id="neighborhood-Select"
                                    value={values.neighborhoodID}
                                    onChange={(event) => this.updateNeighborhoodValue(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.neighborhoodID && touched.neighborhoodID}
                                >
                                    <option disabled selected value="">{t('publish.neighborhoodHolder')}</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.neighborhoodID}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik05">
                                <Form.Label>{t('publish.address')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.addressHolder')}
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    isInvalid={!!errors.address && touched.address}
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    isInvalid={!!errors.price && touched.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik08">
                                <Form.Label>{t('publish.expenses')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.expensesHolder')}
                                    name="expenses"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expenses}
                                    isInvalid={!!errors.expenses && touched.expenses}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.expenses}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik09">
                                <Form.Label>{t('publish.amenities')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.amenitiesHolder')}
                                    name="amenities"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.amenities}
                                    isInvalid={!!errors.amenities && touched.amenities}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amenities}
                                </Form.Control.Feedback>
                            </Form.Group>
                            </div>
                            <div className="sub_box">
                                <Form.Group as={Col} md="12" controlId="validationFormik10">
                                        <Form.Label>{t('publish.description')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            placeholder={t('publish.descriptionHolder')}
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            isInvalid={!!errors.description && touched.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationFormik11">
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
                            <Form.Group as={Col} md="12" controlId="validationFormik12">
                                <Form.Label>{t('publish.bedrooms')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.bedroomsHolder')}
                                    name="bedrooms"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bedrooms}
                                    isInvalid={!!errors.bedrooms && touched.bedrooms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bedrooms}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik13">
                                <Form.Label>{t('publish.bathrooms')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.bathroomsHolder')}
                                    name="bathrooms"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bathrooms}
                                    isInvalid={!!errors.bathrooms && touched.bathrooms}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.bathrooms}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik14">
                                <Form.Label>{t('publish.dimention')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.dimentionHolder')}
                                    name="dimention"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dimention}
                                    isInvalid={!!errors.dimention && touched.dimention}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dimention}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik15">
                                <Form.Label>{t('publish.coveredFloorSize')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.dimentionHolder')}
                                    name="coveredFloorSize"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.coveredFloorSize}
                                    isInvalid={!!errors.coveredFloorSize && touched.coveredFloorSize}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.coveredFloorSize}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik16">
                                <Form.Label>{t('publish.parking')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.parkingHolder')}
                                    name="parking"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.parking}
                                    isInvalid={!!errors.parking && touched.parking}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.parking}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik17">
                                <Form.Label>{t('publish.balconies')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={t('publish.balconiesHolder')}
                                    name="balconies"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.balconies}
                                    isInvalid={!!errors.balconies && touched.balconies}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.balconies}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik18">
                                    <Form.Label>{t('publish.storage')}</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.Yes')}
                                        name="storage"
                                        value="yes"
                                        checked
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.No')}
                                        name="storage"
                                        value="no"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.notCorresponding')}
                                        name="storage"
                                        value="notCorresponding"
                                    />
                            </Form.Group>
                            </div>
                            <div class="down_box">
                                <h4>{t('publish.titleImages')}</h4>
                                <div className="image_wrapper">
                                    <div className="wrapper_arrows">
                                        <span className="arrows" onClick={this.previousImage}>&#8656;</span>
                                    </div>
                                    <div className="imageViewer" id="imageViewer">
                                        <p id="imageText">{t('publish.uploadImagesText')}</p>
                                        <img id="image" className="imageStyle hidden"></img>
                                        <p id="countImage" classList="countImagesText hidden"></p>
                                    </div>
                                    <div className="wrapper_arrows">
                                        <span className="arrows" onClick={this.nextImage}>&#8658;</span>
                                    </div>
                                </div>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText={t('publish.uploadImages')}
                                    label= {t('publish.uploadImagesTitle')}
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg']}
                                    maxFileSize={5242880}
                                />
                                <Button type="submit" id="submitButton" disabled={isSubmitting} onClick={handleChange}>{t('publish.submit')}</Button>
                            </div>
                    </Form>
                )}
                </Formik>
            </div>
        );
        }
}


export default withRouter(withTranslation()(Publish));
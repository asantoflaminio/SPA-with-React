import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { withRouter } from "react-router";
import {appendSelectElement} from '../util/function'
import ImageUploader from 'react-images-upload';
import UserService from '../services/UserService'
import LocationService from '../services/LocationService'
import LocalStorageService from '../services/LocalStorageService'
import JsonService from '../services/JsonService';
import PublicationService from '../services/PublicationService';
import CancelTokenService from '../services/CancelRequestService';
import ErrorService from '../services/ErrorService';
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Publish.css';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';


class Publish extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
             pictures: [],
             actualImage: 0,
             provinces: [],
             selectedOption: 'yes'
        };
         this.onDrop = this.onDrop.bind(this);
         this.previousImage = this.previousImage.bind(this);
         this.nextImage = this.nextImage.bind(this);
         this.handleFormSubmit = this.handleFormSubmit.bind(this);
         this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    componentDidMount(){
        let currentComponent = this
        document.getElementById("FSale").checked = true
        document.getElementById("House").checked = true
        LocationService.getProvinces().then(function (response){
            if(CancelTokenService.isCancel(response))
                return;
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
            currentComponent.setState({
                provinces: response.data,
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
        values.provinceid = event.target.value
        event.target.blur();
        LocationService.getCities(values.provinceid).then(function (response){
            if(CancelTokenService.isCancel(response))
                return;
            let cities = response.data
            let select = document.getElementById("city-Select")
            let selectNeighborhood = document.getElementById("neighborhood-Select")
            select.selectedIndex = 0;
            selectNeighborhood.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < cities.length; i++){
                appendSelectElement(select,cities[i].city,cities[i].cityid)
            }
        })
    }

    updateNeighborhood(event,values){
        event.preventDefault();
        values.cityid = event.target.value
        event.target.blur();
        LocationService.getNeighborhoods(values.cityid).then(function (response){
            if(CancelTokenService.isCancel(response))
                return;
            let neighborhoods = response.data
            let select = document.getElementById("neighborhood-Select")
            select.selectedIndex = 0;
            while (select.childNodes[1]) {
                select.removeChild(select.childNodes[1]); 
            }
            for(let i = 0; i < neighborhoods.length; i++){
                appendSelectElement(select,neighborhoods[i].neighborhood,neighborhoods[i].neighborhoodid)
            }
        })
    }

    updateNeighborhoodValue(event,values){
        event.preventDefault();
        values.neighborhoodid = event.target.value
        event.target.blur();
    }

    handleFormSubmit(event,errors) {
        let currentComponent = this
        let userid = LocalStorageService.getUserid();
        let publicationDTO = JsonService.getJSONParsed(event.target)
        event.preventDefault()
        
        if(Object.keys(errors).length === 0){
            UserService.postPublication(userid,publicationDTO).then(function (response){
                if(response.status !== StatusCode.CREATED){
                    ErrorService.logError(currentComponent.props,response)
                    return;
                }
                let publicationid = response.data.publicationid
                let formData = new FormData();
                for(let i = 0; i < currentComponent.state.pictures.length; i++) {
                    formData.append('files', currentComponent.state.pictures[i])
                }
                if(currentComponent.state.pictures.length !== 0){
                    PublicationService.postImages(publicationid,formData).then(function (response){
                        if(response.status !== StatusCode.CREATED){
                            ErrorService.logError(currentComponent.props,response)
                            return;
                        }
                    })
                }
                currentComponent.props.history.push({
                    pathname: '/publications',
                    search: '?publicationid=' + publicationid,
                });
            })
        }else{
            this.showErrorInForm(Object.keys(errors).length);
            window.scrollTo(0, 0);
        }
    }


    showErrorInForm(quantityErrors) {
        let { t } = this.props;
        if(quantityErrors > 1) {
            toast.notify(t('publish.unsuccesfullSubmitMore', {n: quantityErrors})); 
        } else { 
            toast.notify(t('publish.unsuccesfullSubmitOne')); 
        }
    }


    handleRadioChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value,
        })
    }

    componentWillUnmount(){
        CancelTokenService.getSource().cancel()
        CancelTokenService.refreshToken()
    }

    


    render() {
        const { t } = this.props;
        const provinces = this.state.provinces.map(function(item){
            return <option value={item.provinceid} key={item.provinceid}>  {item.province} </option>;
        });

        function smallerThan(ref, msg) {
            return this.test({
                name: 'smallerThan',
                exclusive: false,
            message: msg || t('errors.smallerThanFloorSize'),
                params: {
                    reference: ref.path
                },
                test: function(value) {
              return value <= this.resolve(ref) 
                }
            })
        };

        yup.addMethod(yup.number, 'smallerThan', smallerThan);
        
        const schema = yup.object({
        title: yup.string().required( t('errors.requiredField') )
                            .matches(Constants.lettesNumersAndSpacesRegex, t('errors.lettesNumersAndSpacesRegex'))
                            .min(Constants.FIRST_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.FIRST_FORM_MAX_LENGTH, t('errors.lengthMax')),
        provinceid: yup.number().required(t('errors.requiredField')),
        cityid: yup.number().required(t('errors.requiredField')),
        neighborhoodid: yup.number().required(t('errors.requiredField')),
        address: yup.string().required(t('errors.requiredField'))
                            .matches(Constants.lettesNumersAndSpacesRegexComma, t('errors.lettesNumersAndSpacesRegexComma'))
                            .min(Constants.FIRST_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.FIRST_FORM_MAX_LENGTH, t('errors.lengthMax')),
        price: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex'))                   
                            .min(Constants.PRICE_MIN_LENGTH, t('errors.minValue'))
                            .max(Constants.PRICE_MAX_LENGTH, t('errors.maxValue')),
        description: yup.string().required(t('errors.requiredField'))
                            .matches(Constants.descriptionRegex, t('errors.descriptionRegex'))
                            .min(Constants.SECOND_FORM_MIN_LENGTH, t('errors.lengthMin'))
                            .max(Constants.SECOND_FORM_MAX_LENGTH, t('errors.lengthMax')),
        bedrooms: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.LOW_MAX_NUMBER, t('errors.maxValue')),
        bathrooms: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.LOW_MAX_NUMBER, t('errors.maxValue')),
        dimention: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.DIMENSION_MAX_LENGTH, t('errors.maxValue')),
        coveredFloorSize: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.DIMENSION_MAX_LENGTH, t('errors.maxValue'))
                            .smallerThan(yup.ref('dimention')),
        parking: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.LOW_MAX_NUMBER, t('errors.maxValue')),
        balconies: yup.number().required(t('errors.requiredField'))
                            .typeError(t('errors.numbersRegex')) 
                            .min(Constants.LOW_MIN_NUMBER, t('errors.minValue'))
                            .max(Constants.LOW_MAX_NUMBER, t('errors.maxValue')),
        expenses: yup.number()
                            .typeError(t('errors.numbersRegex')) 
                            .max(Constants.HIGH_MAX_NUMBER, t('errors.maxValue')),
        amenities: yup.string()
                            .matches(Constants.lettesNumersAndSpacesRegexComma, t('errors.lettesNumersAndSpacesRegexComma'))
                            .max(Constants.AMENITIES_MAX_LENGTH, t('errors.lengthMax')),
        });

        return (
            <div className="box_form">
                <div>
                    <h3 className="publish-title">{t('publish.publish')}</h3>
                </div>
                <Formik
                validationSchema={schema}
                initialValues={{ title:"", provinceid:"", cityid:"", neighborhoodid:"",
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
                                <Form.Label>{t('publish.province')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="provinceid"
                                    id="province-Select"
                                    onChange={(event) => this.updateCity(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    value={values.provinceid}
                                    isInvalid={!!errors.provinceid && touched.provinceid}
                                >
                                    <option disabled defaultValue="" value="">{t('publish.provinceHolder')}</option>
                                {provinces}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.provinceid}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                                <Form.Label>{t('publish.city')}</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="cityid"
                                    id="city-Select"
                                    onChange={(event) => this.updateNeighborhood(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    value={values.cityid}
                                    isInvalid={!!errors.cityid && touched.cityid}
                                    >
                                        <option disabled defaultValue="" value="">{t('publish.cityHolder')}</option>
                                    </Form.Control>  
                                    <Form.Control.Feedback type="invalid">
                                    {errors.cityid}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                                <Form.Label>{t('publish.neighborhood')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="neighborhoodid"
                                    id="neighborhood-Select"
                                    value={values.neighborhoodid}
                                    onChange={(event) => this.updateNeighborhoodValue(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.neighborhoodid && touched.neighborhoodid}
                                >
                                    <option disabled defaultValue="" value="">{t('publish.neighborhoodHolder')}</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.neighborhoodid}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
                                <Form.Label>{t('publish.operation')}</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label={t('publish.buy')}
                                    name="operation"
                                    value="FSale"
                                    id="FSale"
                                />
                                <Form.Check
                                    type="radio"
                                    label={t('publish.rent')}
                                    name="operation"
                                    value="FRent"
                                    id="FRent"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                                <Form.Group as={Col} md="12">
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
                                <Form.Group as={Col} md="12">
                                    <Form.Label>{t('publish.propertyType')}</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.house')}
                                        name="propertyType"
                                        value="House"
                                        id="House"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.apartment')}
                                        name="propertyType"
                                        value="Apartment"
                                        id="Apartment"
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} md="12">
                                    <Form.Label>{t('publish.storage')}</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.Yes')}
                                        name="storage"
                                        value="yes"
                                        checked={this.state.selectedOption === 'yes'}
                                        onChange={this.handleRadioChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.No')}
                                        name="storage"
                                        value="no"
                                        checked={this.state.selectedOption === 'no'}
                                        onChange={this.handleRadioChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.notCorresponding')}
                                        name="storage"
                                        value="notCorresponding"
                                        checked={this.state.selectedOption === 'notCorresponding'}
                                        onChange={this.handleRadioChange}
                                    />
                            </Form.Group>
                            </div>
                            <div className="down_box">
                                <h4 className="down_box_title">{t('publish.titleImages')}</h4>
                                <div className="image_wrapper">
                                    <div className="wrapper_arrows">
                                        <span className="arrows arrow-left" onClick={this.previousImage}>&#60;</span>
                                    </div>
                                    <div className="imageViewer" id="imageViewer">
                                        <p id="imageText">{t('publish.uploadImagesText')}</p>
                                        <img id="image" alt="img" className="imageStyle hidden"></img>
                                        <p id="countImage" className="countImagesText hidden"></p>
                                    </div>
                                    <div className="wrapper_arrows">
                                        <span className="arrows arrow-right" onClick={this.nextImage}>&#62;</span>
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
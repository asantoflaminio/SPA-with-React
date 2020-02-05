import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Publish.css';
import { withRouter } from "react-router";
import {appendSelectElement} from '../util/function'
import UserService from '../services/UserService'
import LocationService from '../services/LocationService'
import LocalStorageService from '../services/LocalStorageService'
import CancelTokenService from '../services/CancelRequestService';
import * as Constants from '../util/Constants'
import * as StatusCode from '../util/StatusCode'
import ErrorService from '../services/ErrorService';
import JsonService from '../services/JsonService';
import ColoredLinearProgress from '../components/ColoredLinearProgress';
import ColoredCircularProgress from '../components/ColoredCircularProgress';
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class EditPublication extends React.Component {

    constructor(props) {
        super(props);
         this.state = { 
            provinces: [],
            cities: [],
            neighborhoods: [],
            title: '',
            province: '',
            city: '',
            neighborhood:'',
            propertyType: '',
            address: '',
            operation: '',
            price: '',
            expenses: '',
            amenities: '',
            description: '',
            bedrooms: '',
            bathrooms: '',
            dimention: '',
            coveredFloorSize: '',
            parking: '',
            balconies: '',
            storage: '',
            selectedOperationOption: '',
            selectedPropertyTypeOption: '',
            selectedStorageOption: '',
            provinceid:'',
            cityid:'',
            neighborhoodid: '',
            loading: false,
            circleloading: false

        };
         this.handleOperationChange = this.handleOperationChange.bind(this);
         this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
         this.handleStorageChange = this.handleStorageChange.bind(this);
         this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount(){
        document.getElementById("FSale").checked = true
        document.getElementById("House").checked = true
        this.setState({
            circleloading: true
        })
        this.updateFormValues();
    }

    loadProvinces(province,city) {
        let currentComponent = this
        let provinceid;
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

            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].province === province)
                    provinceid = response.data[i].provinceid
            }

            currentComponent.setState({
                provinceid: provinceid
            })

            currentComponent.loadCities(provinceid,city)

        })
       
    }

    loadCities(provinceid,city){
        let currentComponent = this;
        let cityid;

        if(provinceid !== undefined) {   
            LocationService.getCities(provinceid).then(function (response){
                if(CancelTokenService.isCancel(response))
                    return;
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(currentComponent.props,response)
                    return;
                }
                
                currentComponent.setState({
                    cities: response.data,
                })

                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].city === city)
                        cityid = response.data[i].cityid
                }

                currentComponent.setState({
                    cityid: cityid
                })

                currentComponent.loadNeighborhood(cityid)
            })
        }
    }


    loadNeighborhood(cityid) {
        let currentComponent = this;
       
        if(cityid !== undefined) {   
            LocationService.getNeighborhoods(cityid).then(function (response){
                if(CancelTokenService.isCancel(response))
                    return;
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(currentComponent.props,response)
                    return;
                }
                
                currentComponent.setState({
                    neighborhoods: response.data,
                })

                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].neighborhood === currentComponent.state.neighborhood)
                        currentComponent.setState({
                            neighborhoodid: response.data[i].neighborhoodid
                    })
                }

            })
        }
    }


    updateFormValues() {
        let currentComponent = this;
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search)
        let userid = LocalStorageService.getUserid();
        
        UserService.getPublication(userid,query.publicationid).then(function (response){
            if(CancelTokenService.isCancel(response))
                return;    
            if(response.status !== StatusCode.OK){
                ErrorService.logError(currentComponent.props,response)
                return;
            }
           
            currentComponent.setState({
                title: response.data.title,
                province: response.data.provinceid,
                city: response.data.cityid,
                neighborhood: response.data.neighborhoodid,
                address: response.data.address,
                propertyType: response.data.propertyType,
                operation: response.data.operation,
                price: response.data.price,
                expenses: response.data.expenses,
                amenities: response.data.amenities,
                description: response.data.description,
                bedrooms: response.data.bedrooms,
                bathrooms: response.data.bathrooms,
                dimention: response.data.dimention,
                coveredFloorSize: response.data.coveredFloorSize,
                parking: response.data.parking,
                balconies: response.data.balconies,
                storage: response.data.storage,
                selectedOperationOption: response.data.operation,
                selectedPropertyTypeOption: response.data.propertyType,
                selectedStorageOption: response.data.storage,
                circleloading: false
            })
            currentComponent.loadProvinces(response.data.provinceid,response.data.cityid)
        })

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
            let selectNeighborhood = document.getElementById("neighborhood-Select");
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

    reInitializeForm(){
        let schema = {}
        
        schema.title = this.state.title;
        schema.province = this.state.province;
        schema.city = this.state.city;
        schema.neighborhood = this.state.neighborhood;
        schema.address = this.state.address;
        schema.operation = this.state.operation;
        schema.price = this.state.price;
        (this.state.expenses === '-1') ? schema.expenses = '' : schema.expenses = this.state.expenses;
        (this.state.amenities === '-1') ? schema.amenities = '' : schema.amenities = this.state.amenities;
        schema.description = this.state.description;
        schema.bedrooms = this.state.bedrooms;
        schema.bathrooms = this.state.bathrooms;
        (this.state.coveredFloorSize === '-1') ? schema.coveredFloorSize = '' : schema.coveredFloorSize = this.state.coveredFloorSize;
        schema.dimention = this.state.dimention;
        schema.parking = this.state.parking;
        (this.state.balconies === '-1') ? schema.balconies = '' : schema.balconies = this.state.balconies;
        schema.storage = this.state.storage;
        schema.provinceid = this.state.provinceid;
        schema.cityid = this.state.cityid;
        schema.neighborhoodid = this.state.neighborhoodid;

        return schema;
    }



    handleOperationChange(changeEvent) {
        this.setState({
            selectedOperationOption: changeEvent.target.value,
        })
    }

    handlePropertyTypeChange(changeEvent) {
        this.setState({
            selectedPropertyTypeOption: changeEvent.target.value,
        })
    }

    handleStorageChange(changeEvent) {
        this.setState({
            selectedStorageOption: changeEvent.target.value,
        })
    }

    updateState(event) {
        
        this.setState({
            title: event.target[0].value,
            province: event.target[1].value, 
            city: event.target[2].value,
            neighborhood: event.target[3].value,
            address: event.target[4].value,
            price: event.target[7].value,
            expenses: event.target[8].value,
            amenities: event.target[9].value,
            description: event.target[10].value,
            bedrooms: event.target[13].value,
            bathrooms: event.target[14].value,
            dimention: event.target[15].value,
            coveredFloorSize: event.target[16].value,
            parking: event.target[17].value,
            balconies: event.target[18].value, 
        })

    }

    handleFormSubmit(event,errors) {
        let currentComponent = this
        let userid = LocalStorageService.getUserid();
        let queryString = require('query-string');
        let { t } = this.props;
        let query = queryString.parse(this.props.location.search);
        let publicationDTO = JsonService.getJSONParsed(event.target)
        let publicationid = query.publicationid;
        event.preventDefault();

        this.updateState(event);
     
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true }); 
            UserService.editPublication(userid,query.publicationid,publicationDTO).then(function (response){
                if(response.status !== StatusCode.OK){
                    ErrorService.logError(currentComponent.props,response)
                    return;
                }
                currentComponent.setState({
                    loading: false
                });
                currentComponent.props.history.push({
                    pathname: '/publications',
                    search: '?publicationid=' + publicationid,
                });
                
            })
        } else{
            toast.notify(t('editpublication.unsuccesfullSubmit'));  
            window.scrollTo(0, 0);
        }
        
    }

    componentWillUnmount(){
        CancelTokenService.getSource().cancel()
        CancelTokenService.refreshToken()
    }


    render() {
        const { t } = this.props;
        let initialSchema = this.reInitializeForm();
        
        const provinces = this.state.provinces.map(function(item){ 
            return <option value={item.provinceid} key={item.provinceid}>  {item.province} </option>;
        });

        const cities = this.state.cities.map(function(item){ 
            return <option value={item.cityid} key={item.cityid}>  {item.city} </option>;
        });

        const neighborhood = this.state.neighborhoods.map(function(item){
            return <option value={item.neighborhoodid} key={item.neighborhood + item.neighborhoodid}>  {item.neighborhood} </option>;
        });
   
        const publicationSchema = yup.object({
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
                            .max(Constants.DIMENSION_MAX_LENGTH, t('errors.maxValue')),
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
            <div>
            {this.state.loading ? <ColoredLinearProgress /> : null}  
            {(this.state.circleloading) ? 
            ( <ColoredCircularProgress /> )
            : ( 
            <div className="box_form">
                <div>
                    <h3 className="publish-title">{t('editpublication.edit')}</h3>
                </div>
                <Formik
                validationSchema={publicationSchema}
                enableReinitialize={true}
                initialValues={initialSchema}
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
                                <option disabled value="">{t('publish.provinceHolder')}</option>
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
                                        <option disabled value="">{t('publish.cityHolder')}</option>
                                   {cities}
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
                                    onChange={(event) => this.updateNeighborhoodValue(event,values) && handleChange(event)}
                                    onBlur={handleBlur}
                                    value={values.neighborhoodid}
                                    isInvalid={!!errors.neighborhoodid && touched.neighborhoodid}
                                >
                                    <option disabled value="">{t('publish.neighborhoodHolder')}</option>
                                {neighborhood} 
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
                                    checked={this.state.selectedOperationOption === 'FSale'}
                                    onChange={this.handleOperationChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label={t('publish.rent')}
                                    name="operation"
                                    value="FRent"
                                    id="FRent"
                                    checked={this.state.selectedOperationOption === 'FRent'}
                                    onChange={this.handleOperationChange}
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
                                        checked={this.state.selectedPropertyTypeOption === 'House'}
                                        onChange={this.handlePropertyTypeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.apartment')}
                                        name="propertyType"
                                        value="Apartment"
                                        id="Apartment"
                                        checked={this.state.selectedPropertyTypeOption === 'Apartment'}
                                        onChange={this.handlePropertyTypeChange}
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
                                        checked={this.state.selectedStorageOption === 'yes'}
                                        onChange={this.handleStorageChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.No')}
                                        name="storage"
                                        value="no"
                                        checked={this.state.selectedStorageOption === 'no'}
                                        onChange={this.handleStorageChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t('publish.notCorresponding')}
                                        name="storage"
                                        value="-1"
                                        checked={this.state.selectedStorageOption === '-1'}
                                        onChange={this.handleStorageChange}
                                    />
                            </Form.Group>
                        </div>
                        <Button type="submit" id="submitButton" disabled={isSubmitting} onClick={handleChange}>{t('editpublication.submit')}</Button>  
                    </Form>
                )}
                </Formik>
            </div>
            )}
            </div>
        );
        }
}


export default withRouter(withTranslation()(EditPublication));


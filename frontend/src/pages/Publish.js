import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as axiosRequest from '../util/axiosRequest'
import '../css/Publish.css';
import {appendSelectElement} from '../util/function'
import ImageUploader from 'react-images-upload';

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
        axiosRequest.getProvinces(this.props).then(function (provincesList){
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

    handleFormSubmit(event) {
        let currentComponent = this
        event.preventDefault();
        axiosRequest.postPublication(event, this.props).then(function (publicationID){
            axiosRequest.postImages(publicationID,currentComponent.state.pictures, this.props);
        })

    }

    updateCity(event){
        event.preventDefault();
        axiosRequest.getCities(event, this.props).then(function (cities){
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

    updateNeighborhood(event){
        event.preventDefault();
        axiosRequest.getNeighborhoods(event, this.props).then(function (neighborhoods){
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

    checkErrors(){
        return true;
    }

    render() {
        const { t } = this.props;
        const provinces = this.state.provinces.map(function(item){
            return <option value={item.provinceID}>  {item.province} </option>;
          });
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
                                    value={values.title}
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
                                    name="provinceID"
                                    onChange={(event) => handleChange && this.updateCity(event)}
                                    value={values.province}
                                    isInvalid={!!errors.province}
                                >
                                    <option disabled selected value="">{t('publish.provinceHolder')}</option>
                                    {provinces}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.province}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik03">
                                <Form.Label>{t('publish.city')}</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="cityID"
                                    id="city-Select"
                                    onChange={(event) => handleChange && this.updateNeighborhood(event)}
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
                                    name="neighborhoodID"
                                    id="neighborhood-Select"
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
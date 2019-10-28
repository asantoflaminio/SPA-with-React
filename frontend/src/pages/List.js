import React from 'react';
import { withTranslation } from 'react-i18next';
import '../css/list.css';
import Navbar from '../components/Navbar'
import ImgsViewer from 'react-images-viewer'
import * as axiosRequest from '../util/axiosRequest'

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
        };
      }

      render(){
        const { t } = this.props;
        
        const state = {
            isOpen : false,         
        } 
        


        
        return(

            <div>
                <Navbar t={t} />
                <div class="breadcrumb">
                    <a href="%">&lt; Go back</a>
                </div>
                <div class="wrap">
                    <div class="search_list">
                        <fieldset class="search_list-container rounded">
                            <div class="search_list-item" id="buy">
                                <p class="search_list-item-label">For Sale</p>                             
                            </div>
                            <div class="search_list-item" id="rent">
                                <p class="search_list-item-label">For Rent</p>
                                
                            </div>                   
                        </fieldset> 
                    </div>  
                    <form modelAttribute="homeSearchForm" method="post">
                        <input type="hidden" name="operation"/>
                        <input type="hidden" name="propertyType"/>
                        <input type="hidden" name="minPrice"/>
                        <input type="hidden" name="maxPrice"/>
                        <input type="hidden" name="minFloorSize" />
                        <input type="hidden" name="maxFloorSize" />
                        <input type="hidden" name="bedrooms"/>
                        <input type="hidden" name="bathrooms"/>
                        <input type="hidden" name="parking" />
                        <input type="hidden" name="order"/>
                        <div class="search">
                            <form id="propertyTypeForm" method="post">
                            <select class="type-home-select" id="propertyType" onchange="updateInputPropertyType(this.value)">
                                        <option value="House">house</option>
                                        <option value="Apartment">apart</option>
                            </select>
                            </form>
                            
                            <form path="address" type="text" class="searchTerm" placeholder="${title}" oninput="updateCheckInput(this)"/>
                            <input type="submit" id="search-btn" value="Search"/>
                        </div>
                        <form path="address" cssClass="error" element="p"/>
                    </form>
                           
                </div>



                <div id="results-container">
                    <div class="results" id="res">
                            <h3 id="res-title">resutls title</h3>	
                    </div>
                    <div class="results" id="order">
                            <select id="order-select">
                                <option value="No order"></option>
                                <option value="Ascending order">lowest</option>
                                <option value="Descending order">highest</option>
                                <option value="Newest publications">newsest</option>
                                <option value="Oldest publications">oldest</option>
                                <input type="hidden" name="address"/>
                                <input type="hidden" name="operation"/>
                                <input type="hidden" name="propertyType"/>
                                <input type="hidden" name="minPrice"/>
                                <input type="hidden" name="maxPrice"/>
                                <input type="hidden" name="minFloorSize" />
                                <input type="hidden" name="maxFloorSize" />
                                <input type="hidden" name="bedrooms"/>
                                <input type="hidden" name="bathrooms"/>
                                <input type="hidden" name="parking" />
                                <input type="hidden" name="order"/>
                            </select>
                        
                        <h3 id="order-title">ordertTitle</h3>
                    </div>
                </div>

                <div class="filters">
                    <ul id="applied-filters-list">
                        <li class="applied-filters-list-item" id="filterMinPrice">
                            <form action="${postPath}" method="post" class="delete-input">
                                <input type="hidden" name="address"/>
                                <input type="hidden" name="operation"/>
                                <input type="hidden" name="propertyType"/>
                                <input type="hidden" name="minPrice"/>
                                <input type="hidden" name="maxPrice"/>
                                <input type="hidden" name="minFloorSize" />
                                <input type="hidden" name="maxFloorSize" />
                                <input type="hidden" name="bedrooms"/>
                                <input type="hidden" name="bathrooms"/>
                                <input type="hidden" name="parking" />
                                <input type="hidden" name="order"/>
                                <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn"/>
                                <p class="applied-filter-text" id="filterMinPriceText">U$S</p>
                            </form>
                        </li>
                    </ul>
                </div>

            <div id="content-container">
    		<aside>    		
			    <div class="polaroid">
					<div class="container">
					<div id="filters-title">
						<h3>Filtros</h3>
					</div>
						<div id="filters-list">
							    <div class="filters-list-item">Filtos1<img src="" ></img></div>
								<div class="expandible filters-list-item-last">
											<form  method="post">
												<div class="radioFlexOption">
													<input type="hidden" name="address"/>
												    <input type="hidden" name="operation"/>
												    <input type="hidden" name="propertyType"/>
												    <input type="hidden" name="minPrice"/>
										  		    <input type="hidden" name="maxPrice"/>
										  		    <input type="hidden" name="minFloorSize" />
				  						  			<input type="hidden" name="maxFloorSize" />
										  		    <input type="hidden" name="bathrooms"/>
												    <input type="hidden" name="order"/>
													<input type="hidden" name="bedrooms"/>
													<input type="hidden" name="parking" />
														<a class="filters-item-name"  >
														</a>
												</div>
											</form>
                                    
                                </div>
                        </div>
                    </div>
                </div>
										 			  	
             </aside>
            </div>		  	
            
            </div>
            


            
        );
    }

}

export default withTranslation()(List);
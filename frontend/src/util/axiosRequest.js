import React from 'react';
import axios from 'axios';
import LocalStorageService from '../services/LocalStorageService'
import {Redirect} from 'react-router-dom';

export const getJSON = (array,quantity) => {
    let result = "{";
    for(var i = 0; i < quantity; i++){
        if(array[i].type === "radio" && array[i].checked === false){
            quantity = quantity + 1;
        }else{
            result += '"' + array[i].name + '"' + ":" + '"' + array[i].value + '"' ;
            if(i !== quantity - 1)
                result += ",";
        }
    }
    result += "}"
    return result;
}

export const generateImageJSON = (publicationID, index) => {
    let result = "{";

    result += '"' + "publicationID" + '"' + ":" + '"' + publicationID + '"' ;
    result += ",";
    result += '"' + "index" + '"' + ":" + '"' + index + '"' ;
    result += "}"

    return result;

}

export const getJSONSingle = (target) => {
    let result = "{"
    result += '"' + target.name + '"' + ":" + '"' + target.value + '"';
    result += "}";
    return result;
}

export const postProvince = (event, props) => {
    const data = getJSON(event.target,1)
    const jsonObject = JSON.parse(data);
    axios({
      method: 'post',
      url: 'admin/province',
      data: jsonObject,
      headers: {
        authorization: LocalStorageService.getAccessToken(),
      }
    })
    .then(function (response) {
        alert(response.status)
    })
    .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
    });
}

export const postCity = (event, props) => {
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
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
    });
}

export const postNeighborhood = (event, props) => {
    const data = getJSON(event.target,3)
    const jsonObject = JSON.parse(data);
    alert(data)
    axios({
      method: 'post',
      url: 'admin/neighborhood',
      data: jsonObject
    })
    .then(function (response) {
        alert(response.status)
    })
    .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
    });
}

export const getProvinces = async (props) => {
    return await axios({
        method: 'get',
        url: 'admin/getProvinces',
      })
      .then(function (response) {
          return response.data.provinces
      })
      .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
      });
}

export const getCities = async (event, props) => {
    const data = getJSONSingle(event.target)
    const jsonObject = JSON.parse(data);
    return await axios({
        method: 'post',
        url: 'admin/getCities',
        data: jsonObject
      })
      .then(function (response) {
          return response.data.cities
      })
      .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
      });
  }

  export const getNeighborhoods = async (event, props) => {
    const data = getJSONSingle(event.target)
    const jsonObject = JSON.parse(data);
    return await axios({
        method: 'post',
        url: 'admin/getNeighborhoods',
        data: jsonObject
      })
      .then(function (response) {
          return response.data.neighborhoods
      })
      .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
      });
  }

export const postPublication = async (event, props) => {
    const data = getJSON(event.target,13)
    const jsonObject = JSON.parse(data);
    return await axios({
      method: 'post',
      url: 'users/publish',
      data: jsonObject,
      headers: {
        authorization: LocalStorageService.getAccessToken(),
      }
    })
    .then(function (response) {
        return response.data.id;
    })
    .catch(function (error) {
        props.history.push({
            pathname: '/error',
            state: { coding: error.response.status }
          })
    });
}

export const postImages = (publicationID,images)  => {
    let formData = new FormData();
    for(let i = 0; i < images.length; i++) {
        formData.append('file', images[i])
        
    }
    alert("appended: " + images.length)

    axios({
        method: 'post',
        url: 'users/images',
        data: formData,
        headers: {
            contentType:'multipart/form-data'},
            authorization: LocalStorageService.getAccessToken()

      })
      .then(function (response) {
          alert(response.status)
      })
      .catch(function (error) {
        // props.history.push({
        //     pathname: '/error',
        //     state: { coding: error.response.status }
        //   })
      });
}


    export const getSalePublications = async (props) => {
        return await axios({
            method: 'get',
            url: 'home/getSalePublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getRentPublications = async (props) => {
        return await axios({
            method: 'get',
            url: 'home/getRentPublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getUsers = async (page, props) => {
        const pageJSON = {
            "page": page
        }
        return await axios({
            method: 'post',
            url: 'admin/getUsers',
            data: pageJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getUsersCount = async (props) => {
        return await axios({
            method: 'get',
            url: 'admin/getUsersQuantity',
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const lockUser = (status,id, props) => {
        const idJSON = {
            "id": id,
            "locked" : status
        }
        return axios({
            method: 'post',
            url: 'admin/lockUser',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getPublicationsCount = async (query, props) => {
        return await axios({
            method: 'post',
            url: 'users/getPublicationsQuantity',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getPublication = async (id, props) => {
        const idJSON = {"id": id,}
        return await axios({
            method: 'post',
            url: 'users/getPublicationByID',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getPublications = async (query, props) => {
        return await axios({
            method: 'post',
            url: 'users/getPublications',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getFilters = async (query, props) => {
        return await axios({
            method: 'post',
            url: 'users/getFilters',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
          });
    }

    export const getImage = async (publicationID,index) => {
        const request = generateImageJSON(publicationID,index)
        const jsonObject = JSON.parse(request);
        return await axios({
            method: 'post',
            url: 'users/getPublicationImage',
            data: jsonObject,
          })
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            alert("error");
          });
            
    }

    export const sendMessage = async (event, props) => {
        const data = getJSON(event.target,5)
        const jsonObject = JSON.parse(data);
        return await axios({
          method: 'post',
          url: 'users/sendMessage',
          data: jsonObject
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
        });
    }

    export const getMyPublicationsQuantity = async (id) => {
        const idJSON = {"id": id}
        return await axios({
            method: 'post',
            url: 'users/getMyPublicationsQuantity',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getMyFavoritesCount = async (id) => {
        const idJSON = {"id": id}
        return await axios({
            method: 'post',
            url: 'users/getMyFavoritesQuantity',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getMyPublications = async (pub) => {
        return await axios({
            method: 'post',
            url: 'users/getMyPublications',
            data: pub
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getMyPublicationsCount = async (id) => {
        return await axios({
            method: 'post',
            url: 'users/getMyPublicationsCount',
            data: id
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const login = (email, password, props) => {
        alert(email + " + " + password)
        const data = {
            email: email,
            password: password
          }
        axios({
          method: 'post',
          url: 'users/login',
          data: data
        })
        .then(function (response) {
            alert(response.headers)
            LocalStorageService.setToken(response.headers.authorization, response.headers.authorities)
            return(
                <Redirect to="/" />
            )
        })
        .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
        });
    }

    export const signUp = async (event, props) => {
        const data = getJSON(event.target,6)
        const jsonObject = JSON.parse(data);
        axios({
          method: 'post',
          url: 'users/signUp',
          data: jsonObject
        })
        .then(function (response) {
        })
        .catch(function (error) {
            props.history.push({
                pathname: '/error',
                state: { coding: error.response.status }
              })
        });
    }


    

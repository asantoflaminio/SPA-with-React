import axios from 'axios';

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

export const postProvince = (event) => {
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

export const postCity = (event) => {
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
        alert(error)
    });
}

export const postNeighborhood = (event) => {
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
        alert(error)
    });
}

export const getProvinces = async () => {
    return await axios({
        method: 'get',
        url: 'admin/getProvinces',
      })
      .then(function (response) {
          return response.data.provinces
      })
      .catch(function (error) {
          alert(error)
      });
}

export const getCities = async (event) => {
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
          alert(error)
      });
  }

  export const getNeighborhoods = async (event) => {
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
          alert(error)
      });
  }

export const postPublication = async (event) => {
    const data = getJSON(event.target,13)
    const jsonObject = JSON.parse(data);
    return await axios({
      method: 'post',
      url: 'users/publish',
      data: jsonObject
    })
    .then(function (response) {
        return response.data.id;
    })
    .catch(function (error) {
        alert(error)
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
        headers: {contentType:'multipart/form-data'},

      })
      .then(function (response) {
          alert(response.status)
      })
      .catch(function (error) {
          alert(error)
      });
}


    export const getSalePublications = async () => {
        return await axios({
            method: 'get',
            url: 'home/getSalePublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getRentPublications = async () => {
        return await axios({
            method: 'get',
            url: 'home/getRentPublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getUsers = async (page) => {
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
              alert(error)
          });
    }

    export const getUsersCount = async () => {
        return await axios({
            method: 'get',
            url: 'admin/getUsersQuantity',
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const lockUser = (status,id) => {
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
              alert(error)
          });
    }

    export const getPublicationsCount = async (query) => {
        return await axios({
            method: 'post',
            url: 'users/getPublicationsQuantity',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
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

    export const getPublications = async (query) => {
        return await axios({
            method: 'post',
            url: 'users/getPublications',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
          });
    }

    export const getFilters = async (query) => {
        return await axios({
            method: 'post',
            url: 'users/getFilters',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              alert(error)
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
              alert(error)
          });
    }

    export const sendMessage = async (event) => {
        const data = getJSON(event.target,5)
        alert(data)
        const jsonObject = JSON.parse(data);
        return await axios({
          method: 'post',
          url: 'users/sendMessage',
          data: jsonObject
        })
        .then(function (response) {
            alert(response)
            return response;
        })
        .catch(function (error) {
            alert(error)
        });
    }

    export const login = (event) => {
        const data = getJSON(event.target,3)
        const jsonObject = JSON.parse(data);
        alert(data)
        axios({
          method: 'post',
          url: 'users/login',
          data: jsonObject
        })
        .then(function (response) {
            alert(response.status)
        })
        .catch(function (error) {
            alert(error)
        });
    }


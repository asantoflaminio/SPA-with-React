import React from 'react';
import '../css/Publication.css';


function getNoPublicationMessage(t, page) {
    
    if(page === "List") {
        return(<p>{t('list.noPublications')}</p>)
    } else if(page === "MyPublications"){
        return(<p>{t('mypublications.noPublications')}</p>)
    } else if(page === "MyFavorites"){
        return(<p>{t('myfavorites.noPublications')}</p>)
    } else if(page === "AdminPublications") {
        return(<p>{t('admin.noPublications')}</p>)
    }
}

// Todo: key???
const NoPublication = ({t, page}) => {
    let noPublicationMessage = getNoPublicationMessage(t, page);
    return(
        <div /*key={t('list.noPublications')}*/> 
                {noPublicationMessage}
        </div>
    )
}

export default NoPublication;
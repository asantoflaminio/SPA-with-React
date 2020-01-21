import React from 'react'
import ContentLoader from 'react-content-loader'

const PublicationLoader = () => (
    
    <ContentLoader height={50} width={400} >
            <rect x="5" y="5" width="67" height="50" />
            <rect x="75" y="8" rx="3" ry="3" width="85" height="6" />
            <rect x="300" y="8" rx="3" ry="3" width="85" height="4" />
            <rect x="75" y="18" rx="3" ry="3" width="95" height="5" />
            <rect x="80" y="28" rx="3" ry="3" width="35" height="4" />
            <rect x="80" y="36" rx="3" ry="3" width="35" height="4" />
            <rect x="80" y="44" rx="3" ry="3" width="35" height="4" />
            <rect x="130" y="28" rx="3" ry="3" width="35" height="4" />
            <rect x="130" y="36" rx="3" ry="3" width="35" height="4" />
            <rect x="130" y="44" rx="3" ry="3" width="35" height="4" />
            <rect x="340" y="40" rx="3" ry="3" width="40" height="4" />
    </ContentLoader>
    
)

export default PublicationLoader;
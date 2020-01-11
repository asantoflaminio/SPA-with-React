import React from 'react';
import '../css/AdminManagment.css';

const AdminManagment = ({ t, active }) => (
    <aside>
    <div class="leftcol">
        <ul>
            <li className={(active === "AdminGenerator") ? "current" : null}><a href="./AdminGenerator">{t('admin.locations')}</a></li>
            <li className={(active === "AdminUsers") ? "current" : null}><a href="./AdminUsers">{t('admin.users')}</a></li>
            <li className={(active === "AdminPublications") ? "current" : null}><a href="./AdminPublications">{t('admin.publications')}</a></li>
        </ul>
    </div>
</aside>
)

export default AdminManagment;
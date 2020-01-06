import React from 'react';
import '../css/AdminManagment.css';

const AdminManagment = ({ t }) => (
    <aside>
    <div class="leftcol">
        <ul>
            <li><a href="./AdminGenerator">{t('admin.locations')}</a></li>
            <li><a href="./AdminUsers">{t('admin.users')}</a></li>
            <li><a href="./AdminPublications">{t('admin.publications')}</a></li>
        </ul>
    </div>
</aside>
)

export default AdminManagment;
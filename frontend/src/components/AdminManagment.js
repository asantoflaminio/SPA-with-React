import React from 'react';
import '../css/AdminManagment.css';

const AdminManagment = ({ t }) => (
    <aside>
    <div class="leftcol">
        <ul>
            <li><a href="/">{t('admin.locations')}</a></li>
            <li><a href="/">{t('admin.users')}</a></li>
            <li><a href="/">{t('admin.publications')}</a></li>
        </ul>
    </div>
</aside>
)

export default AdminManagment;
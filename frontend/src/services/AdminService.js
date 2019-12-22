import LocalStorageService from './LocalStorageService'

const AdminService = (function(){

    function _isAdmin(){
        let access = LocalStorageService.getAccessRole()
        if(access != null && access.includes("ROLE_ADMIN"))
            return true;
        else
            return false;
    }

   return {
      isAdmin : _isAdmin,
    }
   })();

   export default AdminService;
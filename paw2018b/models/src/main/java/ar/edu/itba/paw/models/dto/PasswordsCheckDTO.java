package ar.edu.itba.paw.models.dto;

public class PasswordsCheckDTO {
	
		private String token;
	    private String newPassword1;
	    private String newPassword2;
	    

	    public PasswordsCheckDTO(String token, String newPassword1, String newPassword2) {
	        this.token = token;
	        this.newPassword1 = newPassword1;
	        this.newPassword2 = newPassword2;
	    }

	    public PasswordsCheckDTO(){
	    }
	    
	    public String getToken() {
	        return token;
	    }

	    public void setToken(String token) {
	        this.token = token;
	    }

	    public String getNewPassword1() {
	        return newPassword1;
	    }

	    public void setNewPassword1(String pass) {
	        this.newPassword1 = pass;
	    }

	    public String getNewPassword2() {
	        return newPassword2;
	    }

	    public void setNewPassword2(String pass) {
	        this.newPassword2 = pass;
	    }

	    

}

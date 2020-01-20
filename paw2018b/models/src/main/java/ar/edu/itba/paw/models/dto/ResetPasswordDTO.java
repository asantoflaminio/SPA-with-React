package ar.edu.itba.paw.models.dto;

public class ResetPasswordDTO {
	
		private String token;
	    private String newPassword;
	    

	    public ResetPasswordDTO(String token, String newPassword) {
	        this.token = token;
	        this.newPassword = newPassword;
	    }

	    public ResetPasswordDTO(){
	    }
	    
	    public String getToken() {
	        return token;
	    }

	    public void setToken(String token) {
	        this.token = token;
	    }

	    public String getNewPassword() {
	        return newPassword;
	    }

	    public void setNewPassword(String newPassword) {
	        this.newPassword = newPassword;
	    }

	    

}

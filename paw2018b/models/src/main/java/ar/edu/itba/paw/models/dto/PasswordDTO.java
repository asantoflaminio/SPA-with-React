package ar.edu.itba.paw.models.dto;

public class PasswordDTO {

	private String password;
	private String newpassword;
	
	public PasswordDTO() {}
	
	public PasswordDTO (String password, String newpassword) {
		this.setPassword(password);
		this.setNewpassword(newpassword);
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}
	
	
}

package ar.edu.itba.paw.models.dto;

public class ErrorDTO {

	private String error;
	private String details;

	public ErrorDTO() {
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

}

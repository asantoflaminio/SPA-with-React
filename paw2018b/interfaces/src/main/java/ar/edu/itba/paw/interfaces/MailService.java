package ar.edu.itba.paw.interfaces;


import ar.edu.itba.paw.models.Mail;

public interface MailService {
	public void sendEmail(Mail mail);
	
	public void sendEmail (String name, String to,String from, String body, String info);
	
	public void sendPasswordRecoveryEmail (String to, String token);

}

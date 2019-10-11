package ar.edu.itba.paw.interfaces;

import java.io.IOException;
import java.net.MalformedURLException;



import ar.edu.itba.paw.models.Mail;

public interface MailService {
	public void sendEmail(Mail mail);
	
	public String prepareMessage (String message, String email, String info, String languaje);

	public String getHTML() throws MalformedURLException, IOException;
	
	public void sendEmail (String to,String from, String body, String info);

}

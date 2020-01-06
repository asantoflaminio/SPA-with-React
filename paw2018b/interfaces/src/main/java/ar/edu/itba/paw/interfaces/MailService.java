package ar.edu.itba.paw.interfaces;

import java.io.IOException;
import java.net.MalformedURLException;



import ar.edu.itba.paw.models.Mail;

public interface MailService {
	public void sendEmail(Mail mail);
	
	public void sendEmail (String name, String to,String from, String body, String info);

}

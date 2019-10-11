package ar.edu.itba.paw.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.MailService;
import ar.edu.itba.paw.models.Mail;
import ar.edu.itba.paw.models.User;

@Service()
public class MailServiceImpl implements MailService {
	
	private static final String CONTACT = "Contact";
	private static final String MAILFROM = "MailFrom";
	private static final String EMAIL = "Email";
	private static final String FOLLOWMESSAGE = "FollowMessage";
	private static final String MESSAGE = "Message";
	private static final String PROPERTY = "Property:";
	private static final String PROPERTYTILE = "PropertyTitle";
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private SpringMessageServiceImpl sms;
    
    @Autowired
    private UserServiceImpl us;
    
    @Autowired
    private RequestURIServiceImpl rs;
 
    public void sendEmail(Mail mail) {
    	SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mail.getMailFrom());
        message.setTo(mail.getMailTo());
        message.setText(mail.getMailContent());
        mailSender.send(message);
    }
    
    @Override
    public String getHTML() throws MalformedURLException, IOException {
        File initialFile = new File("../webapp/src/main/webapp/resources/html/Mail.html");
        InputStream targetStream = FileUtils.openInputStream(initialFile);
    	String htmlFile = IOUtils.toString(targetStream);
    	IOUtils.closeQuietly(targetStream);
    	return htmlFile;
    }
    

    @Override
	public String prepareMessage(String message, String email, String info, String languaje) {
    	String html = "<!DOCTYPE html><html><body>\r\n" + 
				"		    \r\n" + 
				"<head>\r\n" + 
				"<meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html; charset=UTF-8\\\" />\r\n" + 
				"<link href=\\\"https://fonts.googleapis.com/css?family=Rubik\\\" rel=\\\"stylesheet\\\">\r\n" + 
				"<meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\"/>\r\n" + 
				"</head>\r\n" + 
				"<html>					\r\n" + 
				"	<body style=\"margin: 0;padding: 0;\">\r\n" + 
				"		<table style=\"border-spacing: 0; padding: 0; border: 0; width: 100%;\">	\r\n" + 
				"			<tr>\r\n" + 
				"				<td style=\"padding: 10px 0 30px 0;\">\r\n" + 
				"					<table style=\"border: 1px solid #cccccc; border-collapse: collapse; width: 600px;	margin-left:auto; margin-right:auto; border-spacing: 0;	padding: 0;\">\r\n" + 
				"						<tr>\r\n" + 
				"							<td style=\"padding: 30px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: 'Rubik', sans-serif;\" align=\"center\" bgcolor=\"#ccc\" >\r\n" + 
				"								<img style=\"display: block;\" src=\"http://i66.tinypic.com/30u8z8m.jpg\" alt=\"MeinHaus\" width=\"150\" height=\"50\"  />\r\n" + 
				"							</td>\r\n" + 
				"								</tr>\r\n" + 
				"								<tr>\r\n" + 
				"							<td bgcolor=\"#ffffff\" style=\"padding: 40px 30px 40px 30px;\">\r\n" + 
				"								<table style=\"border-spacing: 0; padding: 0; border: 0; width: 100%;\">\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"color: #153643; font-family: 'Rubik', sans-serif; font-size: 24px;\">\r\n" + 
				"											<b>Contact</b>\r\n" + 
				"												</td>\r\n" + 
				"									</tr>\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"padding: 20px 0 10px 0; color: #153643; font-family: 'Rubik', sans-serif; font-size: 15px; line-height: 20px;\">\r\n" + 
				"											MailFrom \r\n" + 
				"											<a href=\"#\" style=\"color:#FD8907; margin-left:5px;\">Email</a>\r\n" + 
				"										</td>\r\n" + 
				"									</tr>\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"padding: 5px 0 15px 0; color: #153643; font-family: 'Rubik', sans-serif; font-size: 15px; line-height: 20px;\">\r\n" + 
				"											FollowMessage\r\n" + 
				"										</td>\r\n" + 
				"									</tr>\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"font-style: italic; font-family: 'Rubik', sans-serif; color: #999; font-size: 15px;\">\r\n" + 
				"											Message\r\n" + 
				"										</td>\r\n" + 
				"									</tr>\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"padding: 20px 0 10px 0; color: #153643; font-family: 'Rubik', sans-serif; font-size: 15px; line-height: 20px;\">\r\n" + 
				"											Property: \r\n" + 
				"										</td>\r\n" + 
				"									</tr>\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"font-style: italic; font-family: 'Rubik', sans-serif; color: #999; font-size: 15px;\">PropertyTitle</td>\r\n" + 
				"									</tr>\r\n" + 
				"								</table>\r\n" + 
				"							</td>\r\n" + 
				"						</tr>\r\n" + 
				"						<tr>\r\n" + 
				"							<td bgcolor=\"#FD8907\" style=\"padding: 30px 30px 30px 30px;\">\r\n" + 
				"								<table style=\"border-spacing: 0; padding: 0; border: 0; width: 100%;\">\r\n" + 
				"									<tr>\r\n" + 
				"										<td style=\"color: #ffffff; font-family: 'Rubik', sans-serif; font-size: 14px;\" width=\"75%\">\r\n" + 
				"											&reg; Meinhaus, 2018<br/>\r\n" + 
				"										</td>\r\n" + 
				"									</tr>\r\n" + 
				"								</table>\r\n" + 
				"							</td>\r\n" + 
				"						</tr>\r\n" + 
				"					</table>\r\n" + 
				"				</td>\r\n" + 
				"			</tr>\r\n" + 
				"		</table>\r\n" + 
				"	</body>\r\n" + 
				"</html>\r\n" + 
				"";		
/*		try {
			html = getHTML();
		} catch (Exception e) {
			LOGGER.trace("Error parsing email");
			return html;
		}
*/
		sms.setLocale(rs.getLocale(languaje));
		html = html.replaceAll(CONTACT, sms.get("mail.contact"));
		html = html.replaceAll(MAILFROM, sms.get("mail.mailFrom"));
		html = html.replaceAll(EMAIL, email);
		html = html.replaceAll(FOLLOWMESSAGE, sms.get("mail.followMessage"));
		html = html.replaceAll(MESSAGE, message);
		html = html.replaceAll(PROPERTY, sms.get("mail.property"));
		html = html.replaceAll(PROPERTYTILE, info);
		return html;
	}
	
    @Override
	public void sendEmail (String to,String from, String body, String info){
		User user = us.findByUsername(to);
		String message = prepareMessage(body,from, info, user.getLanguaje());

		MimeMessage email = mailSender.createMimeMessage();
		
		try {
			email.setSubject("Contact message");
			email.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			email.setContent(message, "text/html; charset=utf-8");
		} catch (Exception e) {
			LOGGER.trace("Error sending email");
			return;
		}

		
		mailSender.send(email);
		LOGGER.trace("Sending email to {} from {} ", to, from);
	}
 
}
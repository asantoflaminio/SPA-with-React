package ar.edu.itba.paw.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.Locale;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import ar.edu.itba.paw.interfaces.MailService;
import ar.edu.itba.paw.models.Mail;
import ar.edu.itba.paw.models.User;

@Service()
public class MailServiceImpl implements MailService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
	
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private UserServiceImpl us;
    
    @Autowired
    private RequestServiceImpl rs;
    
    @Autowired
	private SpringTemplateEngine engine;
    
    @Autowired
	public MessageSource messageSource;
 
    public void sendEmail(Mail mail) {
    	SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mail.getMailFrom());
        message.setTo(mail.getMailTo());
        message.setText(mail.getMailContent());
        mailSender.send(message);
    }
	
    @Override
	public void sendEmail (String name, String to,String from, String body, String info){
    	

		MimeMessage email = mailSender.createMimeMessage();
		
		User user = us.findByUsername(to);
		Context context = new Context(rs.getLocale(user.getLanguaje()));
		context.setVariable("name", name);
		context.setVariable("email", from);
		context.setVariable("message", body);
		context.setVariable("propertyTitle", info);
		
		String message = engine.process("mailContent", context);
		
		try {
			email.setSubject(messageSource.getMessage("subject.messageFromMeinhaus", null, rs.getLocale(user.getLanguaje())));
			email.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			email.setContent(message, "text/html; charset=utf-8");
		} catch (Exception e) {
			LOGGER.trace("Error sending email");
			return;
		}

		
		mailSender.send(email);
		LOGGER.trace("Sending email to {} from {} ", to, from);
	}

	@Override
	public void sendPasswordRecoveryEmail(String to, String token) {


		MimeMessage email = mailSender.createMimeMessage();
		
		User user = us.findByUsername(to);
		Context context = new Context(rs.getLocale(user.getLanguaje()));
		context.setVariable("email", to);
		context.setVariable("token", token);
		String message = engine.process("recoveryMailContent", context);
		
		try {
			email.setSubject(messageSource.getMessage("subject.passwordRecovery", null, rs.getLocale(user.getLanguaje())));
			email.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			email.setContent(message, "text/html; charset=utf-8");
		} catch (Exception e) {
			LOGGER.trace("Error sending email");
			return;
		}

		
		mailSender.send(email);
		LOGGER.trace("Sending email to {}", to);
		
	}
 
}
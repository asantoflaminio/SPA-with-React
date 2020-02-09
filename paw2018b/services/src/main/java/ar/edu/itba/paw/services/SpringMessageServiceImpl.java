package ar.edu.itba.paw.services;

import java.util.Locale;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.SpringMessageService;

@Service
public class SpringMessageServiceImpl implements SpringMessageService {

	@Autowired
	private MessageSource messageSource;

	private MessageSourceAccessor accessor;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@PostConstruct
	public void init() {

	}

	@Override
	public void setLocale(Locale locale) {
		accessor = new MessageSourceAccessor(messageSource, locale);
	}

	@Override
	public String get(String code) {
		LOGGER.debug("Returning message with code {}", code);
		return accessor.getMessage(code);
	}
}

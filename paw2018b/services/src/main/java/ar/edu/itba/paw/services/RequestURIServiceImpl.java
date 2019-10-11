package ar.edu.itba.paw.services;

import java.util.Locale;

import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.RequestURIService;

@Service
public class RequestURIServiceImpl implements RequestURIService{

	private static final String SPANISH = "es";
	private static final String ENGLISH = "en";
	
	@Override
	public String addError(String URI) {
		if(URI.indexOf("errorLogin=true") != -1)
			return URI;
		
		if(URI.indexOf("?") > 0)
			URI += "&errorLogin=true";
		else
			URI += "?errorLogin=true";
		return URI;
	}

	@Override
	public String eraseError(String URI) {
		if(URI.indexOf("?errorLogin=true") > 0) 
			URI = URI.replace("?errorLogin=true", "");
		else if(URI.indexOf("&errorLogin=true") > 0) 
			URI = URI.replace("&errorLogin=true", "");
		else 
			return URI;
		return URI;
	}

	@Override
	public String getRedirectUrl(String referer) {
		final Integer indexParams = referer.indexOf("?");
		if(indexParams == -1)
			return "";
		return referer.substring(indexParams);
	}
	
	@Override
    public Locale getLocale(String languaje) {
    	if(languaje.indexOf("es") == 0) {
    		return new Locale(SPANISH);
    	}else {
    		return new Locale(ENGLISH);
    	}
    }

}

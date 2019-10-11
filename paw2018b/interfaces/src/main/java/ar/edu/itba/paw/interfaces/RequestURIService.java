package ar.edu.itba.paw.interfaces;

import java.util.Locale;

public interface RequestURIService {
	
	public String addError(String URI);
	
	public String eraseError(String URI);
	
	public String getRedirectUrl(String referer);
	
	public Locale getLocale(String languaje);

}

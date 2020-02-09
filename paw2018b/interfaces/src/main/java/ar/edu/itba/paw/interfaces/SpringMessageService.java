package ar.edu.itba.paw.interfaces;

import java.util.Locale;

public interface SpringMessageService {

	public void setLocale(Locale locale);

	public String get(String code);

}

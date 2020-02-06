package ar.edu.itba.paw.webapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class MainController {
	  @RequestMapping(method={RequestMethod.GET})
	  public String index() {
	    return "index";
	  }
}

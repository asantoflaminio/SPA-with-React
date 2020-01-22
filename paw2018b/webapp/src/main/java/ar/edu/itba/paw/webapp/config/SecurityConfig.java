package ar.edu.itba.paw.webapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ar.edu.itba.paw.interfaces.UserService;
import ar.edu.itba.paw.models.Constants;
import ar.edu.itba.paw.webapp.auth.CustomAccessDeniedHandler;
import ar.edu.itba.paw.webapp.auth.PawUserDetailsService;
import ar.edu.itba.paw.webapp.auth.PlainTextBasicAuthenticationEntryPoint;
import ar.edu.itba.paw.webapp.auth.StatelessAuthenticationFilter;
import ar.edu.itba.paw.webapp.auth.StatelessLoginFilter;
import ar.edu.itba.paw.webapp.auth.TokenAuthenticationService;

@Configuration
@EnableWebSecurity
@ComponentScan("ar.edu.itba.paw.webapp.auth")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
    @Value(value = "${rememberMe.secretKey}")
    private String key;

    @Autowired
    private PawUserDetailsService userDetailsService;

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;

    @Autowired
    private UserService userService;
	
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
    	http.csrf().disable();
    	http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    	http.authorizeRequests()
        
        	//LocationController
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-managment/provinces").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-managment/provinces/{provinceid}/cities").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-managment/cities/{cityid}/neighborhoods").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-managment/provinces").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-managment/provinces/{provinceid}/cities").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-managment/cities/{cityid}/neighborhoods").permitAll()
                
                
            //PublicationController
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-managment/publications").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-managment/publications/filters").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-managment/publications/{publicationid}").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-managment/publications/{publicationid}/images").permitAll()
        	.antMatchers(HttpMethod.POST, "/meinHaus/publications-managment/publications/{publicationid}/images").hasAnyRole(Constants.Role.ADMIN.getRole(),Constants.Role.USER.getRole())
        	.antMatchers(HttpMethod.DELETE, "/meinHaus/publications-managment/publications/{publicationID}").hasRole(Constants.Role.ADMIN.getRole())
        		
        
        	//UserController
        	.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/login").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/users-managment/users").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/users").permitAll()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-managment/users/{userid}").authenticated()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-managment/users/{userid}").authenticated()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-managment/users/{userid}/lock").hasRole(Constants.Role.ADMIN.getRole())
    		.antMatchers(HttpMethod.HEAD, "/meinHaus/users-managment/users/{email}").permitAll()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/users/{email}/password-reset").permitAll()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-managment/users/password-reset").permitAll()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/users/{userid}/publications").hasAnyRole(Constants.Role.ADMIN.getRole(),Constants.Role.USER.getRole())
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/users/messages").permitAll()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-managment/users/{userid}/publications").authenticated()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-managment/users/{userid}/favourite-publications").authenticated()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-managment/users/{userid}/favourite-publications").authenticated()
    		.antMatchers(HttpMethod.DELETE, "/meinHaus/users-managment/users/{userid}/favourite-publications/{publicationid}").authenticated();
    		


        http.addFilterBefore(new StatelessLoginFilter("/meinHaus/users-managment/login", tokenAuthenticationService, userDetailsService, userService,
                authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(new PlainTextBasicAuthenticationEntryPoint()) //resuelve no autenticado 401
                .and().exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler()); //resuelve la excepcion 403
        
        //Con las excepciones de antes ni idea todavia bien como las handlea en el video, hay q revisar bien 
    }
    
    @Override
    public void configure(final WebSecurity http) throws Exception {
     http.ignoring()
     .antMatchers("/**.js", "/**.css", "/**.jpg", "/**.png", "/**.gif", "/**.ico");
    }
    
    //Cambiamos de lugar el Bean del password encoder aca por temas de diseño
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

}

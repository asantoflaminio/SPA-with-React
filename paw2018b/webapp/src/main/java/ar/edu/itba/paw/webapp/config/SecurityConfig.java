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
import ar.edu.itba.paw.webapp.auth.ForbiddenError;
import ar.edu.itba.paw.webapp.auth.NotAuthorizedError;
import ar.edu.itba.paw.webapp.auth.PawUserDetailsService;
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
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-management/provinces").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-management/provinces/{provinceid}/cities").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/locations-management/cities/{cityid}/neighborhoods").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-management/provinces").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-management/provinces/{provinceid}/cities").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/locations-management/cities/{cityid}/neighborhoods").permitAll()
                
                
            //PublicationController
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-management/publications").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-management/publications/filters").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-management/publications/{publicationid}").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/publications-management/publications/{publicationid}/images").permitAll()
        	.antMatchers(HttpMethod.POST, "/meinHaus/publications-management/publications/{publicationid}/images").access("! hasRole('ROLE_LOCKED')")
        	.antMatchers(HttpMethod.DELETE, "/meinHaus/publications-management/publications/{publicationID}").hasRole(Constants.Role.ADMIN.getRole())
        		
        
        	//UserController
        	.antMatchers(HttpMethod.POST, "/meinHaus/users-management/login").permitAll()
        	.antMatchers(HttpMethod.GET, "/meinHaus/users-management/users").hasRole(Constants.Role.ADMIN.getRole())
        	.antMatchers(HttpMethod.POST, "/meinHaus/users-management/users").permitAll()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-management/users/{userid}").authenticated()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-management/users/{userid}").authenticated()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-management/users/{userid}/lock").hasRole(Constants.Role.ADMIN.getRole())
    		.antMatchers(HttpMethod.HEAD, "/meinHaus/users-management/users/{email}").permitAll()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-management/users/{email}/password-reset").permitAll()
    		.antMatchers(HttpMethod.PATCH, "/meinHaus/users-management/users/password-reset").permitAll()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-management/users/{userid}/publications").access("! hasRole('ROLE_LOCKED')")
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-management/users/messages").permitAll()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-management/users/{userid}/publications").authenticated()
    		.antMatchers(HttpMethod.GET, "/meinHaus/users-management/users/{userid}/favourite-publications").authenticated()
    		.antMatchers(HttpMethod.POST, "/meinHaus/users-management/users/{userid}/favourite-publications").authenticated()
    		.antMatchers(HttpMethod.DELETE, "/meinHaus/users-management/users/{userid}/favourite-publications/{publicationid}").authenticated();
    		


        http.addFilterBefore(new StatelessLoginFilter("/meinHaus/users-management/login", tokenAuthenticationService, userDetailsService, userService,
                authenticationManager()), UsernamePasswordAuthenticationFilter.class)
        		.addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(new NotAuthorizedError())
                .and().exceptionHandling().accessDeniedHandler(new ForbiddenError());
        

    }
    
    @Override
    public void configure(final WebSecurity http) throws Exception {
     http.ignoring()
     .antMatchers("/**.js", "/**.css", "/**.jpg", "/**.png", "/**.gif", "/**.ico");
    }
    
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

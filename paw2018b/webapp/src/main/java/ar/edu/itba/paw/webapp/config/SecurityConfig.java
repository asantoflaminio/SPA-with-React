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
        
        		//permitAll
        		.antMatchers(HttpMethod.GET, "/home/getSalePublications").permitAll()
                .antMatchers(HttpMethod.GET, "/home/getRentPublications").permitAll()
                .antMatchers(HttpMethod.POST, "/users/signUp").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getPublicationsQuantity").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getPublications").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getPublicationByID").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getFilters").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getPublicationImage").permitAll()
                .antMatchers(HttpMethod.POST, "/users/sendMessage").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getProvinces").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getCities").permitAll()
                .antMatchers(HttpMethod.POST, "/users/getNeighborhoods").permitAll()
                
                
                //access(USER OR ADMIN)
                .antMatchers(HttpMethod.POST, "/users/publish").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/users/images").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/users/getMyPublicationsQuantity").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/users/getMyFavoritesQuantity").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/users/getMyPublications").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/users/getMyPublicationsCount").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
        		
        
        		//access(ADMIN)
                .antMatchers(HttpMethod.POST, "/admin/province").access("hasRole('ROLE_ADMIN')")
        		.antMatchers(HttpMethod.POST, "/admin/city").access("hasRole('ROLE_ADMIN')")
        		.antMatchers(HttpMethod.POST, "/admin/neighborhood").access("hasRole('ROLE_ADMIN')")
        		.antMatchers(HttpMethod.POST, "/admin/getUsers").access("hasRole('ROLE_ADMIN')")
        		.antMatchers(HttpMethod.POST, "/admin/getUsersQuantity").access("hasRole('ROLE_ADMIN')")
        		.antMatchers(HttpMethod.POST, "/admin/lockUser").access("hasRole('ROLE_ADMIN')");


        http.addFilterBefore(new StatelessLoginFilter("/users/login", tokenAuthenticationService, userDetailsService, userService,
                authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(new PlainTextBasicAuthenticationEntryPoint()) //resuelve no autenticado 401
                .and().exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler()); //resuelve la excepcion 403
        
        //Con las excepciones de antes ni idea todavia bien como las handlea en el video, hay q revisar bien 
    }
    
    @Override
    public void configure(final WebSecurity web) {
        web.ignoring().antMatchers("/css/**");
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

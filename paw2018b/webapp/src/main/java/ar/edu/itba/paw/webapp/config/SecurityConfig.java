package ar.edu.itba.paw.webapp.config;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
@EnableWebSecurity
@ComponentScan("ar.edu.itba.paw.webapp.auth")
public class SecurityConfig {
	
	
	
	@Order(3)
	@Configuration
	public static class WebAuthConfig extends WebSecurityConfigurerAdapter {
		
		@Autowired
		private UserDetailsService userDetailsService;
		
		@Autowired
		private DaoAuthenticationProvider authProvider;
		
		@Autowired
		@Qualifier("persistentTokenRepository")
		private PersistentTokenRepository persistentTokenRepository;
		
		
		@Override
		protected void configure(final HttpSecurity http) throws Exception {
		http.antMatcher("/**")
		.userDetailsService(userDetailsService)
		.sessionManagement()
		.invalidSessionUrl("/home")
		.and().authorizeRequests()
		.antMatchers("/publish*").authenticated()
		.antMatchers("/profile").authenticated()
		.anyRequest().permitAll()
		.and().formLogin()
		.usernameParameter("j_username")
		.passwordParameter("j_password")
		.loginPage("/PrincipalLogin")
		.successHandler(successHandler())
		.failureHandler(failureHandler())
		.and().rememberMe()
		.rememberMeParameter("j_rememberme")
		.key("Xk5JrZuGN5uwD9jPBeTD2GaPgGJ7Bp832svkugEkF6kS3cxqcOTxw892ZRg7bE7OPqC8XyJFphxKGxg70uKDnfbKp4CtGyz8lEbXbsoCtwEabtyqTgaYnsOGkui1ul7K")
		.tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(30))
		.tokenRepository(persistentTokenRepository)
		.userDetailsService(userDetailsService)
		.and().logout()
		.logoutUrl("/logout")
		.and().exceptionHandling()
		.accessDeniedPage("/forbidden")
		.and().csrf().disable();
		}
		
		@Override
		public void configure(final WebSecurity web) throws Exception {
		web.ignoring()
		.antMatchers("/css/**", "/js/**", "/img/**","/favicon.ico", "/403");
		}
		
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.authenticationProvider(authProvider);
	    }
	    
		
	    @Bean
	    public AuthenticationSuccessHandler successHandler() {
	    	AuthenticationSuccessHandler handler = new AuthenticationSuccessHandler() {	    		
				@Override
				public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
						Authentication authentication) throws IOException, ServletException {
					response.sendRedirect("/paw-2018b-10/PrincipalLogin");
				}
	    		
	    	};
	    	
	    	return handler;
	    }
	    
		
	    @Bean
	    public AuthenticationFailureHandler failureHandler() {
	        AuthenticationFailureHandler handler = new AuthenticationFailureHandler() {

				@Override
				public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
						AuthenticationException exception) throws IOException, ServletException {
					response.sendRedirect("/paw-2018b-10/PrincipalLoginError");
					
				}
	        	
	        };
	        return handler;
	    }

	}
	
	@Configuration
	@Order(2)
	public static class WebAuthConfigSignUp extends WebSecurityConfigurerAdapter {

		@Autowired
		private UserDetailsService userDetailsService;
		
		@Autowired
		private DaoAuthenticationProvider authProvider;
		
		@Autowired
		@Qualifier("persistentTokenRepository")
		private PersistentTokenRepository persistentTokenRepository;
		
		@Override
		protected void configure(final HttpSecurity http) throws Exception {
		http.antMatcher("/signUp/**")
		.userDetailsService(userDetailsService)
		.sessionManagement()
		.invalidSessionUrl("/signUp")
		.and().authorizeRequests()
		.antMatchers("/signUp/**").permitAll()
		.and().formLogin()
		.usernameParameter("j_username")
		.passwordParameter("j_password")
		.loginPage("/signUp")
		.defaultSuccessUrl("/home", false)
		.failureUrl("/signUp?error=true")
		.and().rememberMe()
		.rememberMeParameter("j_rememberme")
		.key("Xk5JrZuGN5uwD9jPBeTD2GaPgGJ7Bp832svkugEkF6kS3cxqcOTxw892ZRg7bE7OPqC8XyJFphxKGxg70uKDnfbKp4CtGyz8lEbXbsoCtwEabtyqTgaYnsOGkui1ul7K")
		.tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(30))
		.tokenRepository(persistentTokenRepository)
		.userDetailsService(userDetailsService)
		.and().logout()
		.logoutUrl("/logout")
		.logoutSuccessUrl("/home")
		.and().exceptionHandling()
		.accessDeniedPage("/forbidden")
		.and().csrf().disable();
		}
		
		@Override
		public void configure(final WebSecurity web) throws Exception {
		web.ignoring()
		.antMatchers("/css/**", "/js/**", "/img/**","/favicon.ico", "/403");
		}
		
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.authenticationProvider(authProvider);
	    }
		
	}
	
	@Configuration
	@Order(1)
	public static class WebAuthConfigAdmin extends WebSecurityConfigurerAdapter {

		@Autowired
		private UserDetailsService userDetailsService;
		
		@Autowired
		private DaoAuthenticationProvider authProvider;
		
		@Override
		protected void configure(final HttpSecurity http) throws Exception {
		http.antMatcher("/admin/**")
		.userDetailsService(userDetailsService)
		.sessionManagement()
		.invalidSessionUrl("/admin/adminSignIn")
		.and().authorizeRequests()
		.antMatchers("/admin/adminSignUp").hasAuthority("ROLE_ADMIN")
		.antMatchers("/admin/adminMainPage").hasAuthority("ROLE_ADMIN")
		.antMatchers("/admin/adminSignIn").permitAll()
		.and().formLogin()
		.usernameParameter("j_username")
		.passwordParameter("j_password")
		.loginPage("/admin/adminSignIn")
		.defaultSuccessUrl("/admin/adminMainPage", false)
		.failureUrl("/admin/adminSignIn?error=true")
		.and().logout()
		.logoutUrl("/admin/logout")
		.logoutSuccessUrl("/home")
		.and().exceptionHandling()
		.accessDeniedPage("/forbidden")
		.and().csrf().disable();
		}
		
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.authenticationProvider(authProvider);
	    }
		
		@Override
		public void configure(final WebSecurity web) throws Exception {
		web.ignoring()
		.antMatchers("/css/**", "/js/**", "/img/**","/favicon.ico", "/403");
		}
		
		
	}



}

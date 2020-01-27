package ar.edu.itba.paw.webapp.config;

import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.StandardTemplateModeHandlers;

@EnableWebMvc
@ComponentScan({ "ar.edu.itba.paw.webapp.controller", "ar.edu.itba.paw.services", "ar.edu.itba.paw.persistence", "ar.edu.itba.paw.models" })
@Configuration
@EnableTransactionManagement
public class WebConfig extends WebMvcConfigurerAdapter {
	@Value("classpath:schema.sql")
    private Resource scriptSql;
	
	@Bean
	public LocalSessionFactoryBean sessionFactory() {
	   LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
	   sessionFactory.setDataSource(dataSource());
	   sessionFactory.setPackagesToScan(
	       new String[] { "ar.edu.itba.paw"  }
	   );
	   //sessionFactory.setHibernateProperties(hibernateProperties());

	   return sessionFactory;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getCommonsMultipartResolver() {
	    CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
	    multipartResolver.setMaxUploadSize(20971520);   // 20MB
	    multipartResolver.setMaxInMemorySize(1048576);  // 1MB
	    return multipartResolver;
	}
	
	/* Just modified resource location and set up cache control */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:static/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
	
	@Bean
	public ViewResolver viewResolver() {
		final InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/jsp/");
		viewResolver.setSuffix(".jsp");
		
		
		return viewResolver;
	}
	
	@Bean
	public static DataSource dataSource() {
		final SimpleDriverDataSource ds = new SimpleDriverDataSource();
		ds.setDriverClass(org.postgresql.Driver.class);
		
		//local
		
		
		ds.setUrl("jdbc:postgresql://localhost/postgres");
		ds.setUsername("postgres");
		ds.setPassword("123456");
	
		//local con base de producción
		/*
		ds.setUrl("jdbc:postgresql://localhost:9091/paw-2018b-10");
		ds.setUsername("paw-2018b-10");
		ds.setPassword("eWAh0kb4x");
		/*
		/*deploy*/
		
		//ds.setUrl("jdbc:postgresql://localhost/paw-2018b-10");
		//ds.setUsername("paw-2018b-10");
		//ds.setPassword("eWAh0kb4x");
		
		
		return ds;
		
	}
	
	@Bean
	public MessageSource messageSource() {
		final ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:i18n/mailContent");
		messageSource.setDefaultEncoding(StandardCharsets.UTF_8.displayName());
		messageSource.setCacheSeconds(5);
		return messageSource;
	}
	
	
    @Bean
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
 
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("meinhauspaw@gmail.com");
        mailSender.setPassword("pawgrupo10");
 
        Properties javaMailProperties = new Properties();
        javaMailProperties.put("mail.smtp.starttls.enable", "true");
        javaMailProperties.put("mail.smtp.auth", "true");
        javaMailProperties.put("mail.transport.protocol", "smtp");
        javaMailProperties.put("mail.debug", "false");
        javaMailProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
 
        mailSender.setJavaMailProperties(javaMailProperties);
        return mailSender;
    }
    
    @Bean
	public SpringTemplateEngine springTemplateEngine() {
		SpringTemplateEngine engine = new SpringTemplateEngine();
		engine.addTemplateResolver(htmlSolver());
		return engine;
	}

	@Bean
	public SpringResourceTemplateResolver htmlSolver() {
		SpringResourceTemplateResolver templateSolver = new SpringResourceTemplateResolver();
		templateSolver.setPrefix("classpath:/mail/");
		templateSolver.setSuffix(".html");
		templateSolver.setTemplateMode(StandardTemplateModeHandlers.HTML5.getTemplateModeName());
		templateSolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
		return templateSolver;
	}
    
    @Bean 
    public RequestContextListener requestContextListener(){
        return new RequestContextListener();
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
	    final LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
	    factoryBean.setPackagesToScan("ar.edu.itba.paw.models");
	    factoryBean.setDataSource(dataSource());
	    final JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
	    factoryBean.setJpaVendorAdapter(vendorAdapter);
	    final Properties properties = new Properties();
	    properties.setProperty("hibernate.hbm2ddl.auto","update");
	    properties.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL92Dialect");
	    properties.setProperty("hibernate.show_sql", "false");
	    properties.setProperty("format_sql", "false");
	    factoryBean.setJpaProperties(properties);
	    return factoryBean;
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(
	    final EntityManagerFactory emf) {
	    return new JpaTransactionManager(emf);
    }
    


    

}
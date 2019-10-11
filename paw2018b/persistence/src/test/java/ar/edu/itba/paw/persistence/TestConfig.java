package ar.edu.itba.paw.persistence;

import org.hsqldb.jdbc.JDBCDriver;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import ar.edu.itba.paw.interfaces.UserDao;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@ComponentScan({"src.main.java.ar.edu.itba.paw.persistence"})
@Configuration
@EnableTransactionManagement
public class TestConfig {
		
	 @Mock
	 @Autowired
	 private UserHibernateDao userHibernateDao;
	 
	 @Bean
	 @Autowired
	 public UserHibernateDao getUserHibernateDao() {
		 return userHibernateDao;
	 }
	
	 @Bean
	 @Autowired
	 public LocalContainerEntityManagerFactoryBean getEntityManagerFactory() {
	     final LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
	     factoryBean.setPackagesToScan("ar.edu.itba.paw.models");
	     factoryBean.setDataSource(dataSource());
	     final JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
	     factoryBean.setJpaVendorAdapter(vendorAdapter);
	     final Properties properties = new Properties();
	     properties.setProperty("hibernate.hbm2ddl.auto", "none");
	     properties.setProperty("hibernate.dialect", "org.hibernate.dialect.HSQLDialect");
	     // Si ponen esto en prod, hay tabla!!!
	     properties.setProperty("hibernate.show_sql", "true");
	     properties.setProperty("format_sql", "true");
	     factoryBean.setJpaProperties(properties);
	     return factoryBean;
	   }
	
	@Bean
	@Autowired
	public DataSource dataSource() {
		final SimpleDriverDataSource ds = new SimpleDriverDataSource();
		ds.setDriverClass(JDBCDriver.class);
		ds.setUrl("jdbc:hsqldb:mem:paw");
		ds.setUsername("ha");
		ds.setPassword("");
		return ds;
	}
	
	 @Bean
	 @Autowired
	 public PlatformTransactionManager transactionManager(final EntityManagerFactory emf) {
	      return new JpaTransactionManager(emf);
	 }
}
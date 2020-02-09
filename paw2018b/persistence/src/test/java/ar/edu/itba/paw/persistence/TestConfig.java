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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@ComponentScan({ "ar.edu.itba.paw.persistence", })
@Configuration
public class TestConfig {

	@Bean
	public DataSource dataSource() {
		final SimpleDriverDataSource ds = new SimpleDriverDataSource();
		ds.setDriverClass(JDBCDriver.class);
		ds.setUrl("jdbc:hsqldb:mem:paw");
		ds.setUsername("ha");
		ds.setPassword("");
		return ds;
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean getEntityManagerFactory() {
		final LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
		factoryBean.setPackagesToScan("ar.edu.itba.paw.models");
		factoryBean.setDataSource(dataSource());
		final JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		factoryBean.setJpaVendorAdapter(vendorAdapter);
		final Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", "update");
		properties.setProperty("hibernate.search.default.directory_provider", "filesystem");
		properties.setProperty("hibernate.search.default.indexBase", "lucene/indexes");
		properties.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
		// properties.setProperty("hibernate.dialect",
		// "org.hibernate.dialect.HSQLDialect");
		// Si ponen esto en prod, hay tabla!!!
		properties.setProperty("hibernate.show_sql", "true");
		properties.setProperty("format_sql", "true");
		factoryBean.setJpaProperties(properties);
		return factoryBean;
	}

	@Bean
	public PlatformTransactionManager transactionManager(final EntityManagerFactory emf) {
		return new JpaTransactionManager(emf);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
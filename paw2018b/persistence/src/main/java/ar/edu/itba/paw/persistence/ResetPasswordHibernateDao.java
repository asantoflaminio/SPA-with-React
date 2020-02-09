package ar.edu.itba.paw.persistence;

import java.util.List;
import java.util.Optional;


import javax.persistence.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.ResetPasswordDao;
import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;

@Repository
public class ResetPasswordHibernateDao implements ResetPasswordDao{


    @PersistenceContext
    private EntityManager em;

    @Transactional
    @Override
    public ResetPassword createRequest(String token, long userId, String date){
        User user = em.find(User.class, userId);
        ResetPassword rp = new ResetPassword(user, date, token);
        em.persist(rp);
        return rp;
    }

    @Override
    public Optional<User> getUser(String token){
        final TypedQuery<User> queryString = em.createQuery("SELECT rp.userRequesting FROM ResetPassword rp " +
                "WHERE rp.token = :token", User.class);

        queryString.setParameter("token", token);
        final List<User> list = queryString.getResultList();
        if(list.isEmpty()) {
        	return Optional.empty();
        } else {
        	return Optional.ofNullable(list.get(0));
        }
    }

    @Override
    public boolean checkToken(String token){
        final TypedQuery<ResetPassword> queryString = em.createQuery("FROM ResetPassword rp " +
                "WHERE rp.token = :token", ResetPassword.class);

        queryString.setParameter("token", token);
        final List<ResetPassword> list = queryString.getResultList();
        
        if(list.isEmpty()) {
        	return true;
        } else {
        	return false;
        }
    }


    @Transactional
    @Override
    public void deleteRequest(Integer id){
    	ResetPassword token = em.find(ResetPassword.class, id);
        if(token != null){
            em.remove(token);         
        } 
    }

    @Override
    public Optional<ResetPassword> getRequest(String token){
        final TypedQuery<ResetPassword> queryString = em.createQuery("FROM ResetPassword rp " +
                "WHERE rp.token = :token", ResetPassword.class);

        queryString.setParameter("token", token);
        final List<ResetPassword> list = queryString.getResultList();
        if(list.isEmpty()) {
        	return Optional.empty();
        } else {
        	return Optional.ofNullable(list.get(0));
        }
    }

	@Override
	@Transactional
	public void deleteOldRequests(long userId) {
		User user = em.find(User.class, userId);
		final TypedQuery<ResetPassword> queryString = em.createQuery("FROM ResetPassword rp " +
                "WHERE rp.userRequesting = :userRequesting", ResetPassword.class);

        queryString.setParameter("userRequesting", user);
        final List<ResetPassword> list = queryString.getResultList();
        
        for(ResetPassword token: list) {
        	em.remove(token);
        }
	}

}

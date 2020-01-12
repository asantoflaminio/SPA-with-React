package ar.edu.itba.paw.persistence;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import javax.persistence.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.interfaces.ChangePasswordDao;
import ar.edu.itba.paw.models.ChangePassword;
import ar.edu.itba.paw.models.User;

@Repository
public class ChangePasswordHibernateDao implements ChangePasswordDao{


    @PersistenceContext
    private EntityManager em;

    @Transactional
    @Override
    public ChangePassword createRequest(String token, long userId, String date){
        User user = em.find(User.class, userId);
        ChangePassword cp = new ChangePassword(user, date, token);
        em.persist(cp);
        return cp;
    }

    @Override
    public Optional<User> getUser(String token){
        final TypedQuery<User> queryString = em.createQuery("SELECT cp.userRequesting FROM ChangePassword cp " +
                "WHERE cp.token = :token", User.class);

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
        final TypedQuery<ChangePassword> queryString = em.createQuery("FROM ChangePassword cp " +
                "WHERE cp.token = :token", ChangePassword.class);

        queryString.setParameter("token", token);
        final List<ChangePassword> list = queryString.getResultList();
        
        if(list.isEmpty()) {
        	return true;
        } else {
        	return false;
        }
    }


    @Transactional
    @Override
    public void deleteRequest(Integer id){
        ChangePassword token = em.find(ChangePassword.class, id);
        if(token != null){
            em.remove(token);         
        } 
    }

    @Override
    public Optional<ChangePassword> getRequest(String token){
        final TypedQuery<ChangePassword> queryString = em.createQuery("FROM ChangePassword cp " +
                "WHERE cp.token = :token", ChangePassword.class);

        queryString.setParameter("token", token);
        final List<ChangePassword> list = queryString.getResultList();
        if(list.isEmpty()) {
        	return Optional.empty();
        } else {
        	return Optional.ofNullable(list.get(0));
        }
    }

}

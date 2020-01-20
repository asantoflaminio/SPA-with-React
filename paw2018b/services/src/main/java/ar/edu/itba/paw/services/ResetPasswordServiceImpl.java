package ar.edu.itba.paw.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ResetPasswordDao;
import ar.edu.itba.paw.interfaces.ResetPasswordService;
import ar.edu.itba.paw.models.ResetPassword;
import ar.edu.itba.paw.models.User;

@Service
public class ResetPasswordServiceImpl implements ResetPasswordService {
	
    @Autowired
    private ResetPasswordDao resetPasswordDao;

    @Autowired
    private MailServiceImpl ms;

    private static final Logger LOGGER = LoggerFactory.getLogger(ResetPasswordServiceImpl.class);

    @Override
    public ResetPassword createRequest(User user) {
        boolean inUse = true;
        String pureToken = "";
        Integer encryptedToken = 0;
    	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        

        do{
            pureToken = UUID.randomUUID().toString();
            encryptedToken = pureToken.hashCode();

            if(resetPasswordDao.checkToken(encryptedToken.toString())) {
            	inUse = false;
            }            
        } while (inUse);

        ResetPassword cp = resetPasswordDao.createRequest(encryptedToken.toString(), user.getUserid(), dtf.format(now));
        ms.sendPasswordRecoveryEmail(user.getEmail(), pureToken);
        
        return cp;
    }
    
    @Override
    public String encrypt(String pure){
        String ans = "";
        String strKey = "MeinHaus";
        try {
            SecretKeySpec skeyspec = new SecretKeySpec(strKey.getBytes(),"Blowfish");
            Cipher cipher = Cipher.getInstance("Blowfish");
            cipher.init(Cipher.ENCRYPT_MODE, skeyspec);
            byte[] encrypted = cipher.doFinal(pure.getBytes());
            ans = new String(encrypted);

        } catch (Exception e) {
            LOGGER.error("Encryption issue");
        }
        return ans;
    }

    @Override
    public Optional<User> getUser(String token) {
        return resetPasswordDao.getUser(token);
    }

    @Override
    public boolean checkToken(String token) {
        return resetPasswordDao.checkToken(token);
    }

    @Override
    public void deleteRequest(Integer id) {
    	resetPasswordDao.deleteRequest(id);
    }

    @Override
    public Optional<ResetPassword> getRequest(String token) {
        return resetPasswordDao.getRequest(token);
    }

    @Override
	public boolean isTokenExpired(Integer token, Optional<ResetPassword> resetPassword) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();           
        LocalDateTime tokenDate = LocalDateTime.parse(resetPassword.get().getDate(), dtf);       
        long minutes = ChronoUnit.MINUTES.between(tokenDate, now);
        
        if(resetPassword.isPresent() && minutes <= 60) {
        	return false;
        }
        
        return true;
	}

}

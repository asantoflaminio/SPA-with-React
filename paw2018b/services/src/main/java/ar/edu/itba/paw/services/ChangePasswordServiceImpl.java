package ar.edu.itba.paw.services;

import java.util.Optional;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ChangePasswordDao;
import ar.edu.itba.paw.interfaces.ChangePasswordService;
import ar.edu.itba.paw.models.ChangePassword;
import ar.edu.itba.paw.models.User;

@Service
public class ChangePasswordServiceImpl implements ChangePasswordService {
	
    @Autowired
    private ChangePasswordDao changePasswordDao;

    @Autowired
    private MailServiceImpl ms;

    private static final Logger LOGGER = LoggerFactory.getLogger(ChangePasswordServiceImpl.class);

    @Override
    public ChangePassword createRequest(User user, String date) {
    	
        boolean inUse = true;
        String pureToken = "";
        Integer encryptedToken = 0;

        do{
            pureToken = UUID.randomUUID().toString();
            encryptedToken = pureToken.hashCode();

            if(changePasswordDao.checkToken(encryptedToken.toString())) {
            	inUse = false;
            }            
        } while (inUse);

        ChangePassword cp = changePasswordDao.createRequest(encryptedToken.toString(), user.getUserid(), date);
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
        return changePasswordDao.getUser(token);
    }

    @Override
    public boolean checkToken(String token) {
        return changePasswordDao.checkToken(token);
    }

    @Override
    public void deleteRequest(Integer id) {
        changePasswordDao.deleteRequest(id);
    }

    @Override
    public Optional<ChangePassword> getRequest(String token) {
        return changePasswordDao.getRequest(token);
    }

}

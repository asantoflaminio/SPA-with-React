package ar.edu.itba.paw.models;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.*;
@Entity
@Table(name = "changepassword")
public class ChangePassword {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "changepassword_requestId_seq")
    @SequenceGenerator(sequenceName = "changepassword_requestId_seq", name = "changepassword_requestId_seq", allocationSize = 1)
    @Column(name = "requestId")
    private Integer requestId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User userRequesting;

    @Column(length = 20)
    private String date;

    @Column(length = 32)
    private String token;

    public ChangePassword(User userRequesting, String date, String token) {
        this.userRequesting = userRequesting;
        this.date = date;
        this.token = token;
    }

    public ChangePassword(){}

    public Integer getRequestId() {
        return requestId;
    }

    public void setRequestId(Integer id) {
        this.requestId = id;
    }

    public User getUserRequesting() {
        return userRequesting;
    }

    public void setUserRequesting(User user) {
        this.userRequesting = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
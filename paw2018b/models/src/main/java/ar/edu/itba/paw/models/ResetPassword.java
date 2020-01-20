package ar.edu.itba.paw.models;

import javax.persistence.*;
@Entity
@Table(name = "resetPassword")
public class ResetPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resetPassword_requestId_seq")
    @SequenceGenerator(sequenceName = "resetPassword_requestId_seq", name = "resetPassword_requestId_seq", allocationSize = 1)
    @Column(name = "requestId")
    private Integer requestId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User userRequesting;

    @Column(length = 20)
    private String date;

    @Column(length = 32)
    private String token;

    public ResetPassword(User userRequesting, String date, String token) {
        this.userRequesting = userRequesting;
        this.date = date;
        this.token = token;
    }

    public ResetPassword(){}

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
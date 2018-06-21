package vip.dummy.tools.model;


/**
 * Created by dummy team
 * 2018-04-07
 *
 * player model
 */
public class Player {

    private int _id;
    private String name;
    private String studentName;
    private String phoneNumber;
    private String verificationCode;
    private String mail;
    private String education;
    private String profession;
    private String university;
    private String graduateDate;
    private String password;
    private String passwordPlain;
    private int role;
    private int status;
    private int mailStatus;
    private int instance;

    public Player(String name, String studentName, String phoneNumber, String verificationCode, String mail,
                  String education, String profession, String university, String graduateDate,
                  String password, String passwordPlain, int role, int status, int mailStatus, int instance) {
        this.name = name;
        this.studentName = studentName;
        this.phoneNumber = phoneNumber;
        this.verificationCode = verificationCode;
        this.mail = mail;
        this.education = education;
        this.profession = profession;
        this.university = university;
        this.graduateDate = graduateDate;
        this.password = password;
        this.passwordPlain = passwordPlain;
        this.role = role;
        this.status = status;
        this.mailStatus = mailStatus;
        this.instance = instance;
    }

    public Player() {

    }

    public int get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getGraduateDate() {
        return graduateDate;
    }

    public void setGraduateDate(String graduateDate) {
        this.graduateDate = graduateDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordPlain() {
        return passwordPlain;
    }

    public void setPasswordPlain(String passwordPlain) {
        this.passwordPlain = passwordPlain;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getMailStatus() {
        return mailStatus;
    }

    public void setMailStatus(int mailStatus) {
        this.mailStatus = mailStatus;
    }

    public int getInstance() {
        return instance;
    }

    public void setInstance(int instance) {
        this.instance = instance;
    }
}

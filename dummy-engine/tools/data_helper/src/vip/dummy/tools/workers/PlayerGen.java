package vip.dummy.tools.workers;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import vip.dummy.tools.model.Player;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

/**
 * Created by dummy team
 * 2018-04-07
 *
 * player generator
 */
public class PlayerGen {
    private String dbHost;
    private String dbPort;
    private String dbUser;
    private String dbPassword;
    private int playerCount;
    private int instanceCount;

    public PlayerGen(String dbHost, String dbPort, String dbUser, String dbPassword, int playerCount, int instanceCount) {
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.dbUser = dbUser;
        this.dbPassword = dbPassword;
        this.playerCount = playerCount;
        this.instanceCount = instanceCount;
    }

    public boolean generatePlayers(boolean dummy) {
        MongoDatabase database;
        MongoCollection<Document> collection;
        try {
            String connectionString = "mongodb://" + dbUser + ":" + dbPassword + "@" +
                    dbHost + ":" + dbPort + "/?authSource=dummy_game";
            System.out.println(connectionString);
            MongoClientURI clientURI = new MongoClientURI(connectionString);
            MongoClient mongoClient = new MongoClient(clientURI);
            database = mongoClient.getDatabase("dummy_game");
            collection = database.getCollection("player");

            // clean virtual players
            System.out.println("deleting virtual players ...");
            collection.deleteMany(eq("role", 2));
            System.out.println("virtual players deleted");

            // insert virtual players
            long basePhoneNumber = 10000000000L;
            List<Document> documents = new ArrayList<Document>();
            for (int i = 0; i < this.playerCount; i++) {
                long phoneNumber = basePhoneNumber + i;
                Player player = new Player();
                player.setName("Player" + i);
                player.setStudentName("Dummy" + i);
                player.setPhoneNumber(Long.toString(phoneNumber));
                player.setVerificationCode("");
                player.setMail(player.getPhoneNumber() + "@dummy.vip");
                player.setEducation("2");
                player.setProfession("计算机科学与技术");
                player.setUniversity("大米大学");
                player.setGraduateDate("2018-04-07");
                player.setPassword("e10adc3949ba59abbe56e057f20f883e");
                player.setPasswordPlain("123456");
                player.setRole(2);
                player.setStatus(1);
                player.setMailStatus(1);
                player.setInstance(9000 + (int)(phoneNumber % this.instanceCount));

                Document playerDoc = new Document();
                if (dummy) {
                    playerDoc.append("name", player.getName())
                            .append("phoneNumber", player.getPhoneNumber())
                            .append("password", player.getPassword())
                            .append("passwordPlain", player.getPasswordPlain())
                            .append("role", player.getRole())
                            .append("status", player.getStatus())
                            .append("instance", player.getInstance());
                } else {
                    playerDoc.append("name", player.getName())
                            .append("studentName", player.getStudentName())
                            .append("phoneNumber", player.getPhoneNumber())
                            .append("verificationCode", player.getVerificationCode())
                            .append("mail", player.getMail())
                            .append("education", player.getEducation())
                            .append("profession", player.getProfession())
                            .append("university", player.getUniversity())
                            .append("graduateDate", player.getGraduateDate())
                            .append("password", player.getPassword())
                            .append("passwordPlain", player.getPasswordPlain())
                            .append("role", player.getRole())
                            .append("status", player.getStatus())
                            .append("mailStatus", player.getMailStatus())
                            .append("instance", player.getInstance());
                }

                System.out.println("player " + player.getName() + ", " + player.getPhoneNumber() +
                        ", " + player.getInstance() + " has been added");
                documents.add(playerDoc);
            }
            System.out.println("inserting virtual players ...");
            collection.insertMany(documents);
            System.out.println(documents.size() + " virtual players has been inserted");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }
}

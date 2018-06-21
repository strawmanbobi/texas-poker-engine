package vip.dummy.tools;

import vip.dummy.tools.workers.PlayerGen;

/**
 * Created by dummy team
 * 2018-04-07
 *
 * tools for dummy
 */
public class DataHelper {

    private final static int FUNCTION_GEN_PLAYER = 0;
    private final static int FUNCTION_GEN_DUMMIES = 1;

    public static void main(String[] args) {
        try {
            int mFunction = Integer.parseInt(args[0]);

            switch(mFunction) {
                case FUNCTION_GEN_PLAYER: {
                    if (7 != args.length) {
                        System.out.println("invalid parameter");
                        System.out.println("Please call this method like DataHelper [function_code = 0] " +
                                "[db_host] [db_port] [db_user] [db_password] [player_count] [instance_count]");
                        return;
                    }
                    String dbHost = args[1];
                    String dbPort = args[2];
                    String dbUser = args[3];
                    String dbPassword = args[4];
                    int playerCount = Integer.parseInt(args[5]);
                    int instanceCount = Integer.parseInt(args[6]);
                    PlayerGen playerGen = new PlayerGen(dbHost, dbPort, dbUser, dbPassword, playerCount, instanceCount);
                    playerGen.generatePlayers(false);
                    break;
                }
                case FUNCTION_GEN_DUMMIES: {
                    if (7 != args.length) {
                        System.out.println("invalid parameter");
                        System.out.println("Please call this method like DataHelper [function_code = 0] " +
                                "[db_host] [db_port] [db_user] [db_password] [player_count] [instance_count]");
                        return;
                    }
                    String dbHost = args[1];
                    String dbPort = args[2];
                    String dbUser = args[3];
                    String dbPassword = args[4];
                    int playerCount = Integer.parseInt(args[5]);
                    int instanceCount = Integer.parseInt(args[6]);
                    PlayerGen playerGen = new PlayerGen(dbHost, dbPort, dbUser, dbPassword, playerCount, instanceCount);
                    playerGen.generatePlayers(true);
                    break;
                }
                default: {
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbCheck {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/wealthdb";
        String user = "postgres";
        String password = "Root";

        System.out.println("Testing connection to: " + url);
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("SUCCESS: Connected to the database!");
            }
        } catch (SQLException e) {
            System.err.println("ERROR: Connection failed!");
            System.err.println("Message: " + e.getMessage());
            System.err.println("SQLState: " + e.getSQLState());
            System.err.println("ErrorCode: " + e.getErrorCode());
            e.printStackTrace();
        }
    }
}

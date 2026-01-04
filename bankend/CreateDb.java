import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class CreateDb {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "Root";

        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("PostgreSQL JDBC Driver not found. Include it in your classpath ");
            e.printStackTrace();
            return;
        }

        try (Connection conn = DriverManager.getConnection(url, user, password);
                Statement stmt = conn.createStatement()) {

            System.out.println("Checking if wealthdb exists...");
            // We'll just try to create it. If it exists, it will throw an exception which
            // we can handle.
            try {
                stmt.executeUpdate("CREATE DATABASE wealthdb");
                System.out.println("SUCCESS: Database 'wealthdb' created successfully!");
            } catch (Exception e) {
                if (e.getMessage().contains("already exists")) {
                    System.out.println("INFO: Database 'wealthdb' already exists.");
                } else {
                    throw e;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package sv.lab8.db;

import sv.lab8.domain.User;

import javax.management.Query;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class DBManager {
    private Connection con;

    public DBManager() {
        connect();
    }

    public void connect(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost/lab8", "root", "");

        } catch (Exception e){
            System.out.println("Error on connecting to database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void disconnect(){
        try{
            con.close();
        }catch (Exception e){
            System.out.println("Error on disconnecting from database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public User authenticate(String username, String password){
        ResultSet rs;
        User user = null;

        try{
            PreparedStatement query = con.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");
            query.setString(1, username);
            query.setString(2, password);

            rs = query.executeQuery();
            if (rs.next()){
                user = new User(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
            }
            query.close();
            rs.close();
        }catch (SQLException e){
            System.out.println("Error on authenticating: " + e.getMessage());
        }

        return user;
    }

    public void resetPuzzle(List<Integer> puzzlePieces, int userId){
        // Clear data from tables
        try{
            // Clear the puzzle locations
            PreparedStatement query = con.prepareStatement("DELETE FROM puzzles WHERE userId=?");
            query.setInt(1, userId);
            query.execute();

            // Clear the score
            query = con.prepareStatement("DELETE FROM scores WHERE userId=?");
            query.setInt(1, userId);
            query.execute();

            // Initialize the score with 0
            query = con.prepareStatement("INSERT INTO scores VALUES (?,10)");
            query.setInt(1, userId);
            query.execute();

            query.close();
        }catch (SQLException e){
            System.out.println("Error on resetting the game: " + e.getMessage());
        }

        // Set the new data to tables - new puzzle pieces locations
        try{
            for (int i=0; i<9; i++){
                PreparedStatement query = con.prepareStatement("INSERT INTO puzzles values (?,?,?)"); //id, pos, userId
                query.setInt(1, i);
                query.setInt(2, puzzlePieces.get(i));
                query.setInt(3, userId);
                query.executeUpdate();
                query.close();
            }
        }catch (SQLException e){
            System.out.println("Error on inserting the new puzzle pieces locations: " + e.getMessage());
        }
    }

    public void swap(int id1, int id2, int userId){
        try{
            PreparedStatement query = con.prepareStatement("SELECT SUM(position) FROM puzzles WHERE id IN (?,?) AND userId=?");
            query.setInt(1, id1); query.setInt(2, id2); query.setInt(3, userId);
            ResultSet rs = query.executeQuery();
            rs.next();
            int sum = Integer.parseInt(rs.getString(1));

            query = con.prepareStatement("UPDATE puzzles SET position = ? - position WHERE id IN (?,?) AND userId=?");
            query.setInt(1, sum);
            query.setInt(2, id1); query.setInt(3, id2); query.setInt(4, userId);
            query.executeUpdate();

            int score = getScore(userId);
            query = con.prepareStatement("UPDATE scores SET score = ? WHERE userId=?");
            query.setInt(1, score-1);
            query.setInt(2, userId);
            query.execute();
            query.close();
        }catch (SQLException e){
            System.out.println("Error on swapping 2 puzzle pieces: " + e.getMessage());
        }
    }

    public int getScore(int userId){
        try{
            PreparedStatement query = con.prepareStatement("SELECT * FROM scores WHERE userId=?");
            query.setInt(1, userId);

            ResultSet rs = query.executeQuery();
            if (rs.next()){
                return rs.getInt("score");
            }else {
                throw new RuntimeException("No rows");
            }
        }catch (SQLException e){
            System.out.println("Error on getting the score: " + e.getMessage());
            return 0;
        }
    }

    public int getEmptyCell(int userId){
        try{
            PreparedStatement query = con.prepareStatement("SELECT * FROM puzzles WHERE userId=? AND id=8");
            query.setInt(1, userId);

            ResultSet rs = query.executeQuery();
            if (rs.next()){
                return rs.getInt("position");
            }else{
                throw new RuntimeException("No rows");
            }
        }catch(SQLException e){
            System.out.println("Error on getting the emptyCell: " + e.getMessage());
            return 0;
        }
    }

    public int getCellForImg(int imgId, int userId){
        try{
            PreparedStatement query = con.prepareStatement("SELECT * FROM puzzles WHERE userId=? AND id=?");
            query.setInt(1, userId);
            query.setInt(2, imgId);

            ResultSet rs = query.executeQuery();
            if (rs.next()){
                return rs.getInt("position");
            }else{
                throw new RuntimeException("No rows");
            }
        }catch(SQLException e){
            System.out.println("Error on getting the emptyCell: " + e.getMessage());
            return 0;
        }
    }

    public List<Integer> getPuzzlePieces(int userId){
        try{
            PreparedStatement query = con.prepareStatement("SELECT * FROM puzzles WHERE id >= 0 AND id <= 8 AND userId=?");
            query.setInt(1, userId);

            ResultSet rs = query.executeQuery();

            List<Integer> puzzlePieces = new ArrayList<>();
            for (int i=0; i<9; i++){
                puzzlePieces.add(-1);
            }
            while (rs.next()){
                puzzlePieces.set(rs.getInt("position"), rs.getInt("id"));
            }
            query.close();
            return puzzlePieces;

        }catch (SQLException e){
            System.out.println("Error on getting the puzzlepieces: " + e.getMessage());
            return null;
        }
    }
}














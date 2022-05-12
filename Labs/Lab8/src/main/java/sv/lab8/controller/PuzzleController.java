package sv.lab8.controller;

import sv.lab8.db.DBManager;
import sv.lab8.domain.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class PuzzleController extends HttpServlet {
    HttpSession session;
    User user;

    public PuzzleController() {super();}

    public void doGet(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        session = req.getSession();
        user = (User) session.getAttribute("user");

        servletResponse.setContentType("text/html");
        writePuzzle(servletResponse.getWriter(), getPuzzleString(user.getId()), getScoreString(user.getId()));
    }

    public void doPost(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        session = req.getSession();
        user = (User) session.getAttribute("user");

        servletResponse.setContentType("text/html");
        DBManager db = new DBManager();
        db.resetPuzzle(shufflePuzzle(), user.getId());
        writePuzzle(servletResponse.getWriter(), getPuzzleString(user.getId()), getScoreString(user.getId()));
        db.disconnect();
    }

    public void doPut(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        DBManager db = new DBManager();
        BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));

        String data = br.readLine();
        System.out.println(data);

        String[] arr = data.split("=");
        int id1 = Integer.parseInt(arr[1]);

        int cell = db.getCellForImg(id1, user.getId());
        int emptyCell = db.getEmptyCell(user.getId());
        if (cell == emptyCell) return;

        int rest = cell %3;
        int topPos = (cell>2) ? cell-3 : -1;
        int bottomPos = (cell<6) ? cell+3 : -1;
        int leftPos = (rest>0) ? cell-1 : -1;
        int rightPos = (rest<2) ? cell+1 : -1;

        if (emptyCell != topPos && emptyCell != bottomPos && emptyCell != leftPos && emptyCell != rightPos)
            return;

        db.swap(id1, 8, user.getId());
        servletResponse.getWriter().println(getScoreString(user.getId()) + getPuzzleString(user.getId()));
        db.disconnect();
    }

    private List<Integer> shufflePuzzle() {
        List<Integer> puzzlePieces = IntStream.rangeClosed(0, 8)
                .boxed()
                .collect(Collectors.toList());

        // shuffle the list
        Collections.shuffle(puzzlePieces);
        return puzzlePieces;
    }

    protected String getPuzzleString(int userId){
        StringBuilder res = new StringBuilder();

        DBManager db = new DBManager();
        List<Integer> puzzlePieces = db.getPuzzlePieces(userId);
        int score = db.getScore(userId);
//
//        res.append("<p>Score: ").append(score).append("</p>");

        boolean solved = true;
        for (int i=0; i<9; i++){
            if (puzzlePieces.get(i) != i) solved = false;
            res.append("<img id = '").append(puzzlePieces.get(i))
                    .append("' class='piece' src='utils/").append(puzzlePieces.get(i))
                    .append(".jpg'/>");
        }
        if (solved){
            res.append("<p>Congratulations, you finished the puzzle in: ").append(score).append("!</p>");
            res.append("<link rel='stylesheet' type='text/css' href='lock.css'>");
        }

        return res.toString();
    }

    protected String getScoreString(int userId){
        StringBuilder res = new StringBuilder();

        DBManager db = new DBManager();
        List<Integer> puzzlePieces = db.getPuzzlePieces(userId);
        int score = db.getScore(userId);

        res.append("<p id='scoreText'>Score: ").append("</p>");
        res.append("<p>").append(score).append("</p>");
        return res.toString();
    }

    protected void writePuzzle(PrintWriter printWriter, String puzzleString, String scoreString){
        printWriter.println("<html>");
        printWriter.println("<head>");
        printWriter.println("<title>Puzzle</title>");
        printWriter.println("<link rel='stylesheet' type='text/css' href='style.css'>");
        printWriter.println("<script src=\"https://code.jquery.com/jquery-3.6.0.min.js\" integrity=\"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=\" crossorigin=\"anonymous\"></script>");
        printWriter.println("<script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.min.js\" integrity=\"sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=\" crossorigin=\"anonymous\"></script>");
        printWriter.println("<script src=\"puzzle.js\" defer></script> ");
        printWriter.println("</head>");
        printWriter.println("<body>");
        printWriter.println("<div class='scoreContainer'>");
        printWriter.println(scoreString);
        printWriter.println("</div>");
        //printWriter.println("<div class=btnContainer>");
        printWriter.println("<form action=\"/puzzle\" method=\"post\">");
        printWriter.println("<input id=\"resetPuzzle\" type=\"submit\" value=\"Reset puzzle\" id=\"reset\"/>");
        printWriter.println("</form>");
        //printWriter.println("</div>");

        if (scoreString.contains("<p>0")){
            printWriter.println("<p>You have no more moves left :( </p>");
            return;
        }

        printWriter.println("<div class='puzzleContainer'>");
        printWriter.println(puzzleString);
        printWriter.println("</div>");
        printWriter.println("<div id='status'>");
        printWriter.println("</div>");
        printWriter.println("</body>");
        printWriter.println("</html>");
    }


}

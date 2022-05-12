package sv.lab8.controller;

import sv.lab8.db.DBManager;
import sv.lab8.domain.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginController extends HttpServlet {

    public LoginController() {super();}

    private User authenticate(String username, String password){
        DBManager db = new DBManager();
        User user = db.authenticate(username, password);
        db.disconnect();
        return user;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //Get username and password from request
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        User user = authenticate(username, password);
        if (user != null){
            HttpSession session = req.getSession();
            session.setAttribute("user", user);
            resp.sendRedirect("puzzle.jsp"); //to modify with page when login succesfull
        } else {
            resp.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
    }
}

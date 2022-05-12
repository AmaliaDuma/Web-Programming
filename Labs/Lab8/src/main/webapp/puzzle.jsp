<%@ page import="sv.lab8.domain.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    //Check session for user
    User user = (User) session.getAttribute("user");
    if (user == null){
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
    %>

<html>
<head>
    <title>Puzzle</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="puzzle.js" defer id="script" contextPath="${pageContext.request.contextPath}"></script>
</head>
<body>
<div class="optionsContainer">
    <form class="options" action="${pageContext.request.contextPath}/puzzle" method="get">
        <input class="optionsInput" type="submit" value="Continue the puzzle" id="continue"/>
    </form>
    <form class="options" action="${pageContext.request.contextPath}/puzzle" method="post">
        <input class="optionsInput" type="submit" value="Reset puzzle" id="reset"/>
    </form>
</div>
</body>
</html>

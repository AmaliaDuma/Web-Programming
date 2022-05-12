<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="loginStyle.css">
</head>
<body>
    <div class="loginContainer">
        <form action="${pageContext.request.contextPath}/login" method="POST">
            <p class="loginText">Enter username:</p>
            <div class="fieldsContainer">
                <label>
                    <input  type="text" name="username" placeholder="username.."/>
                </label><br>
            </div>
            <p class="loginText">Enter password:</p>
            <div class="fieldsContainer">
                <label>
                    <input type="password" name="password" placeholder="password.."/>
                </label><br>
            </div>
            <input type="submit" value="Log In" id="login"/>
        </form>
    </div>
</body>
</html>
<?php

session_start();

$errors= [
    'login' => $_SESSION ['login_error'] ?? '',
    'register' => $_SESSION ['register_error']?? ''

];
$activeForm = $_SESSION ['active_form']?? 'login';
session_unset();

function showError($error)
{
    return !empty($error) ? "<p class = 'error-message> $error </p>" : '';

}
fucntion isActiveForm( $formName, $activeForm){
    return $formName === $activeForm ? 'active' : '' ;
}
?>




<!DOCTYPE html>
<html lang = "en">
<head>
    <link rel="stylesheet" href="frontpage.css">
</head>
<body>
    <div class = "FP-container">


        <div class = "form-box <?= isActiveForm('login',$activeForm); ?>" id = "login-form">
            <form action = "login_register.php" method="post">
                <h2> Login</h2>


<?= showError($errors['login']); ?>


                <div><input type = "email" name="email" placeholder="Email" required> </div> <!-- Type = "email" works the same as type = "text" apparently -->
                <div><input type="password" name="password" placeholder="Password" required></div> <!--Same for password-->
                <div><button id = "LoginButton" class = "pill-btn" type="submit" name = "login"> Login</button></div>
                <p>Don't have an account? <a href = "#" onclick = "showForm('register-form')"> Register </a></p>
            </form>
        </div>


        <!-- Make New Account Stuff -->
        <div class = "form-box  <?= isActiveForm('register',$activeForm); ?>" id = "register-form">
            <form action = "login_register.php" method="post">
                <h2> Register</h2>

<?= showError($errors['register']); ?>

                <div><input type = "text" name="name" placeholder="Email" required> </div>
                <div><input type = "email" name="email" placeholder="Email" required> </div> <!-- Type = "email" works the same as type = "text" apparently -->
                <div><input type="password" name="password" placeholder="Password" required></div> <!--Same for password-->
                <div><input type="password" name="confirm-password" placeholder="Confirm Password" required></div> <!--Same for password-->

                <div>
                <select name ="role" required>
                <option value= "" >  --select role--  </option>
                <option value= "user" >  USER  </option>
                <option value= "admin" >  ADMIN  </option>
                </select>
                </div>


                <div><button id = "Create Account" class = "pill-btn" type="submit" name = "register"> Register</button></div>
                <p>Already have an account? <a href = "#" onclick = "showForm('login-form')"> Login </a></p>
        
                <p>That email is already in use</p>
            </form>
        </div>
    </div>

    <script src="frontpage.js"></script>    
</body>
</html>
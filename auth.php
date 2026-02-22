<?php
session_start();
$access_code = "458580"; // Your specific lock number

if (isset($_POST['login_code'])) {
    if ($_POST['login_code'] === $access_code) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = "Invalid Lock Number!";
    }
}

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Lock</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
        .lock-box { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
        input { padding: 10px; font-size: 18px; width: 150px; text-align: center; margin-bottom: 10px; border: 1px solid #ccc; }
        button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="lock-box">
        <h3>Admin Access</h3>
        <?php if(isset($error)) echo "<p style='color:red'>$error</p>"; ?>
        <form method="POST">
            <input type="password" name="login_code" placeholder="Enter Lock #" maxlength="6" required><br>
            <button type="submit">Unlock</button>
        </form>
    </div>
</body>
</html>
<?php
exit;
}
?>

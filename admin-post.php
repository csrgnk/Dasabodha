<?php include('auth.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Manage Posts</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 40px auto; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .btn { padding: 8px 15px; text-decoration: none; border-radius: 4px; font-size: 14px; }
        .btn-add { background: #28a745; color: white; }
        .btn-edit { background: #007bff; color: white; }
        .logout { color: red; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Post Dashboard</h2>
        <a href="admin-addpost.php" class="btn btn-add">+ New Post</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $json_file = 'Data/Posts.json';
            if (file_exists($json_file)) {
                $posts = json_decode(file_get_contents($json_file), true);
                if ($posts) {
                    foreach ($posts as $post) {
                        echo "<tr>
                                <td><strong>{$post['title']}</strong></td>
                                <td>{$post['date']}</td>
                                <td><a href='admin-editpost.php?id={$post['id']}' class='btn btn-edit'>Edit</a></td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='3'>No posts found.</td></tr>";
                }
            }
            ?>
        </tbody>
    </table>
    <br>
    <a href="?logout=1" class="logout">Logout/Lock System</a>
    <?php if(isset($_GET['logout'])) { session_destroy(); header("Location: admin-post.php"); } ?>
</body>
</html>

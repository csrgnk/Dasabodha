<!DOCTYPE html>
<html lang="te">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading... - Namo Narayanaya</title>
    
    <style>
        body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; color: #333; line-height: 1.6; }
        .site-header { width: 100%; background: #fff9c4; border-bottom: 2px solid #d81b60; }
        .site-top-box { display: flex; align-items: center; justify-content: center; gap: 15px; padding: 15px; }
        .site-logo { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #d81b60; }
        .site-title { text-decoration: none; color: #d81b60; font-weight: bold; font-size: 20px; }

        .post-wrapper { max-width: 850px; margin: 30px auto; padding: 0 15px; }
        .post-content-card { background: #fff; padding: 35px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        
        /* Telugu Devotional Styling */
        h1.post-title { color: #002366; font-size: 30px; margin-bottom: 20px; border-bottom: 3px double #FF69B4; padding-bottom: 10px; text-align: center; }
        .telugu-lyrics { 
            font-size: 22px; 
            color: #222; 
            white-space: pre-wrap; 
            background: #fffdf0; 
            padding: 20px; 
            border-radius: 10px; 
            border: 1px inset #eee;
            font-weight: 500;
        }
        
        .back-nav { margin-bottom: 20px; display: block; color: #FF69B4; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>

    <header class="site-header">
        <div class="site-top-box">
            <img src="https://omnnbc.in/m/iIEkQ5" alt="Logo" class="site-logo">
            <a href="index.html" class="site-title">Namo Narayanaya Bhakthi Channel</a>
        </div>
    </header>

    <div class="post-wrapper">
        <a href="index.html" class="back-nav">← వెనుకకు (Back)</a>
        
        <div class="post-content-card" id="viewer-engine">
            <p style="text-align:center;">Loading content...</p>
        </div>
    </div>

    <script>
        async function loadContent() {
            const container = document.getElementById('viewer-engine');
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('id');

            if (!slug) {
                window.location.href = 'index.html';
                return;
            }

            try {
                const response = await fetch('./data/posts.json');
                const posts = await response.json();
                
                // Find post or page by slug
                const item = posts.find(p => p.slug === slug);

                if (item) {
                    document.title = item.title + " - Namo Narayanaya";
                    container.innerHTML = `
                        <h1 class="post-title">${item.title}</h1>
                        <div class="telugu-lyrics">${item.content}</div>
                    `;
                } else {
                    container.innerHTML = "<h2>క్షమించండి. సమాచారం దొరకలేదు. (Content Not Found)</h2>";
                }
            } catch (err) {
                container.innerHTML = "<h2>Error loading data.</h2>";
            }
        }
        window.onload = loadContent;
    </script>
</body>
</html>

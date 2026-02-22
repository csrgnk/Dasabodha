<?php 
// ================================
// Load Settings
// ================================
$settingsFile = __DIR__ . '/data/settings.json';
$settings = file_exists($settingsFile) ? json_decode(file_get_contents($settingsFile), true) : [];

// ================================
// Basic Site Info
// ================================
$faviconUrl     = "https://omnnbc.in/m/iIEkQ5"; // ðŸ”¹ Your site icon / logo
$siteNameLine1  = "Namo Narayanaya";
$siteNameLine2  = "Bhakthi Channel";
$siteTagline    = $settings['site_tagline'] ?? "Dasabodha Grantha Telugu Lyrics";
$siteURL        = "https://dasabodha.omnnbc.in";

// ================================
// Current Page Info
// ================================
$currentURL  = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$searchQuery = $_GET['q'] ?? '';

// Track views and protect copy
@include __DIR__ . "/track_views.php";
@include __DIR__ . "/post-copy-protect.php";

// ================================
// Auto Title + Description + OG Tags
// ================================
$pageTitle   = "$siteNameLine1 $siteNameLine2";
$description = $siteTagline;
$keywords    = "";

if (!empty($post['title'])) {
    $pageTitle   = $post['title'] . " - " . $siteNameLine2;
        $description = substr(strip_tags($post['content'] ?? ''), 0, 160);
            $keywords    = implode(", ", $post['tags'] ?? []);
            } elseif (!empty($page['title'])) {
                $pageTitle   = $page['title'] . " - " . $siteNameLine2;
                    $description = substr(strip_tags($page['content'] ?? ''), 0, 160);
                    }
                    ?>
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                    <title><?php echo htmlspecialchars($pageTitle); ?></title>
                    <meta name="description" content="<?php echo htmlspecialchars($description); ?>">
                    <?php if(!empty($keywords)): ?>
                    <meta name="keywords" content="<?php echo htmlspecialchars($keywords); ?>">
                    <?php endif; ?>
                    <link rel="canonical" href="<?php echo htmlspecialchars($currentURL); ?>">

                    <!-- ============================
                         Open Graph & Twitter
                              ============================ -->
                              <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
                              <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>">
                              <meta property="og:type" content="article">
                              <meta property="og:url" content="<?php echo htmlspecialchars($currentURL); ?>">
                              <meta property="og:site_name" content="<?php echo htmlspecialchars($siteNameLine2); ?>">
                              <meta property="og:image" content="<?php echo $faviconUrl; ?>">

                              <meta name="twitter:card" content="summary_large_image">
                              <meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
                              <meta name="twitter:description" content="<?php echo htmlspecialchars($description); ?>">
                              <meta name="twitter:image" content="<?php echo $faviconUrl; ?>">

                              <!-- ============================
                                   Favicon (Browser Tab)
                                        ============================ -->
                                        <link rel="icon" href="<?php echo $faviconUrl; ?>" type="image/png">

                                        <!-- ============================
                                             Google Verification & Ads
                                                  ============================ -->
                                                  <meta name="google-site-verification" content="vtmgwR4tvah1Q3r2Fn2gql5KhPowmP6q291jthbykjM" />
                                                  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7573720131021971" crossorigin="anonymous"></script>

                                                  <!-- ============================
                                                       Google Analytics
                                                            ============================ -->
                                                            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-505792160-1"></script>
                                                            <script>
                                                            window.dataLayer = window.dataLayer || [];
                                                            function gtag(){dataLayer.push(arguments);}
                                                            gtag('js', new Date());
                                                            gtag('config', 'UA-505792160-1');
                                                            </script>

                                                            <!-- ============================
                                                                 HEADER STYLE
                                                                      ============================ -->
                                                                      <style>
                                                                      body {
                                                                          margin: 0;
                                                                              font-family: Arial, sans-serif;
                                                                                  background: #f9f9f9;
                                                                                  }

                                                                                  /* Header Layout */
                                                                                  .site-header {
                                                                                      width: 100%;
                                                                                          background: #fff9c4;
                                                                                              box-sizing: border-box;
                                                                                              }

                                                                                              /* Logo + Title in Row */
                                                                                              .site-top-box {
                                                                                                  display: flex;
                                                                                                      align-items: center;
                                                                                                          justify-content: center;
                                                                                                              gap: 15px;
                                                                                                                  padding: 15px;
                                                                                                                      flex-wrap: wrap;
                                                                                                                      }

                                                                                                                      /* Round Logo */
                                                                                                                      .site-logo {
                                                                                                                          width: 60px;
                                                                                                                              height: 60px;
                                                                                                                                  border-radius: 50%;
                                                                                                                                      object-fit: cover;
                                                                                                                                          border: 2px solid #d81b60;
                                                                                                                                          }

                                                                                                                                          /* Two-line Site Title */
                                                                                                                                          .site-title-text h1 {
                                                                                                                                              margin: 0;
                                                                                                                                                  line-height: 1.2;
                                                                                                                                                      text-align: left;
                                                                                                                                                      }
                                                                                                                                                      .site-title-text h1 a {
                                                                                                                                                          text-decoration: none;
                                                                                                                                                              color: #d81b60;
                                                                                                                                                                  display: inline-block;
                                                                                                                                                                  }
                                                                                                                                                                  .site-title-text .line1 {
                                                                                                                                                                      display: block;
                                                                                                                                                                          font-size: clamp(24px, 4.5vw, 36px);
                                                                                                                                                                              font-weight: bold;
                                                                                                                                                                              }
                                                                                                                                                                              .site-title-text .line2 {
                                                                                                                                                                                  display: block;
                                                                                                                                                                                      font-size: clamp(20px, 4vw, 30px);
                                                                                                                                                                                          font-weight: bold;
                                                                                                                                                                                          }

                                                                                                                                                                                          /* Tagline Box */
                                                                                                                                                                                          .tagline-box {
                                                                                                                                                                                              background-color: #007BFF;
                                                                                                                                                                                                  color: white;
                                                                                                                                                                                                      padding: 10px;
                                                                                                                                                                                                          text-align: center;
                                                                                                                                                                                                          }
                                                                                                                                                                                                          .tagline-box p {
                                                                                                                                                                                                              margin: 0;
                                                                                                                                                                                                                  font-size: clamp(16px, 2.5vw, 20px);
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                  /* Menu + Search Container */
                                                                                                                                                                                                                  .header1-wrap {
                                                                                                                                                                                                                      max-width: 1200px;
                                                                                                                                                                                                                          margin: 0 auto;
                                                                                                                                                                                                                              padding: 0 15px;
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                              /* Mobile Responsive */
                                                                                                                                                                                                                              @media (max-width: 600px) {
                                                                                                                                                                                                                                  .site-top-box {
                                                                                                                                                                                                                                          justify-content: center;
                                                                                                                                                                                                                                                  text-align: center;
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                          .site-title-text h1 {
                                                                                                                                                                                                                                                                  text-align: center;
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      </style>
                                                                                                                                                                                                                                                                      </head>
                                                                                                                                                                                                                                                                      <body>

                                                                                                                                                                                                                                                                      <header class="site-header">

                                                                                                                                                                                                                                                                          <!-- ðŸ”¹ Left Logo + Right Two-line Site Name -->
                                                                                                                                                                                                                                                                              <div class="site-top-box">
                                                                                                                                                                                                                                                                                      <a href="/" class="site-logo-link" title="<?php echo htmlspecialchars($siteNameLine1 . ' ' . $siteNameLine2); ?>">
                                                                                                                                                                                                                                                                                                  <img src="<?php echo $faviconUrl; ?>" alt="Site Icon" class="site-logo">
                                                                                                                                                                                                                                                                                                          </a>

                                                                                                                                                                                                                                                                                                                  <div class="site-title-text">
                                                                                                                                                                                                                                                                                                                              <h1>
                                                                                                                                                                                                                                                                                                                                              <a href="/">
                                                                                                                                                                                                                                                                                                                                                                  <span class="line1"><?php echo htmlspecialchars($siteNameLine1); ?></span>
                                                                                                                                                                                                                                                                                                                                                                                      <span class="line2"><?php echo htmlspecialchars($siteNameLine2); ?></span>
                                                                                                                                                                                                                                                                                                                                                                                                      </a>
                                                                                                                                                                                                                                                                                                                                                                                                                  </h1>
                                                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                  <!-- ðŸ”¹ Blue Tagline Box -->
                                                                                                                                                                                                                                                                                                                                                                                                                                      <div class="tagline-box">
                                                                                                                                                                                                                                                                                                                                                                                                                                              <p><?php echo htmlspecialchars($siteTagline); ?></p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                      <!-- ðŸ”¹ Menu + Search -->
                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div class="header1-wrap">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <?php include __DIR__ . '/header-menu.php'; ?>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <?php include __DIR__ . '/header-search.php'; ?>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </header>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

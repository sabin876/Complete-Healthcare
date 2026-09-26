<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | CORx Healthcare Dubai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f8fafc;
            color: #1e293b;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #08709d 0%, #0369a1 100%);
            color: #ffffff;
            border-radius: 20px;
            padding: 36px 32px;
            margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(8, 112, 157, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          .header h1 {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 6px;
          }
          .header p {
            font-size: 14px;
            color: #e0f2fe;
            max-width: 600px;
          }
          .stats-badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 12px 24px;
            border-radius: 14px;
            text-align: center;
          }
          .stats-num {
            font-size: 26px;
            font-weight: 800;
            display: block;
          }
          .stats-lbl {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #bae6fd;
            font-weight: 700;
          }
          .search-bar {
            background: #ffffff;
            border: 1.5px solid #e2e8f0;
            border-radius: 14px;
            padding: 14px 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
            gap: 12px;
            flex-wrap: wrap;
          }
          .search-input {
            flex: 1;
            min-width: 250px;
            border: none;
            outline: none;
            font-size: 14px;
            color: #0f172a;
          }
          .quick-links {
            display: flex;
            gap: 12px;
          }
          .quick-btn {
            font-size: 12.5px;
            font-weight: 600;
            color: #08709d;
            text-decoration: none;
            background: #f0f9ff;
            padding: 6px 14px;
            border-radius: 8px;
            border: 1px solid #bae6fd;
            transition: all 0.2s;
          }
          .quick-btn:hover {
            background: #08709d;
            color: #ffffff;
          }
          .table-card {
            background: #ffffff;
            border: 1.5px solid #e2e8f0;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
          }
          th {
            background: #f1f5f9;
            color: #475569;
            text-transform: uppercase;
            font-size: 11.5px;
            font-weight: 700;
            letter-spacing: 0.5px;
            padding: 14px 18px;
            text-align: left;
            border-bottom: 1.5px solid #e2e8f0;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
          }
          tr:hover td {
            background: #f8fafc;
          }
          .url-link {
            color: #08709d;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          .url-link:hover {
            text-decoration: underline;
            color: #0369a1;
          }
          .badge-prio {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 11px;
            background: #e0f2fe;
            color: #0369a1;
          }
          .badge-freq {
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
          }
          .footer-note {
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            margin-top: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>CORx Healthcare &bull; XML Sitemap</h1>
              <p>Generated for search engine bots (Google, Bing) to index pages, clinical home services, and medical guides.</p>
            </div>
            <div class="stats-badge">
              <span class="stats-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <span class="stats-lbl">Total URLs</span>
            </div>
          </div>

          <div class="search-bar">
            <input type="text" id="filterInput" class="search-input" placeholder="Quick filter URLs in this sitemap..." onkeyup="filterUrls()"/>
            <div class="quick-links">
              <a href="/robots.txt" class="quick-btn">View Robots.txt</a>
              <a href="/sitemap" class="quick-btn">HTML Sitemap</a>
              <a href="/" class="quick-btn">Home Page</a>
            </div>
          </div>

          <div class="table-card">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th style="width: 50px;">#</th>
                  <th>URL Location</th>
                  <th style="width: 110px;">Priority</th>
                  <th style="width: 130px;">Change Freq</th>
                  <th style="width: 140px;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: #94a3b8; font-weight: 700;"><xsl:value-of select="position()"/></td>
                    <td>
                      <a class="url-link">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge-prio"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                    <td>
                      <span class="badge-freq"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td style="color: #64748b; font-size: 12px;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="footer-note">
            CORx Healthcare Dubai &bull; Sitemaps Protocol 0.9 &bull; Designed for search engine crawlers &amp; web accessibility.
          </p>
        </div>

        <script type="text/javascript">
          function filterUrls() {
            var input = document.getElementById("filterInput");
            var filter = input.value.toLowerCase();
            var table = document.getElementById("sitemapTable");
            var tr = table.getElementsByTagName("tr");
            for (var i = 1; i &lt; tr.length; i++) {
              var td = tr[i].getElementsByTagName("td")[1];
              if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) &gt; -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

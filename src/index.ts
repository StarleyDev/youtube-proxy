
import express from 'express';

const app = express();
const port = 2536;

app.get('/', (_req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>YouTube Proxy</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
            }
            .logo {
                font-size: 64px;
                margin-bottom: 20px;
            }
            h1 {
                color: #333;
                font-size: 32px;
                margin-bottom: 10px;
                font-weight: 700;
            }
            .subtitle {
                color: #666;
                font-size: 18px;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            .info-box {
                background: #f8f9fa;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
            }
            .info-box h3 {
                color: #333;
                font-size: 18px;
                margin-bottom: 15px;
                font-weight: 600;
            }
            .info-box p {
                color: #555;
                font-size: 14px;
                line-height: 1.8;
                margin-bottom: 10px;
            }
            .info-box code {
                background: #e9ecef;
                padding: 4px 8px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                color: #d63384;
            }
            .examples {
                margin-top: 25px;
            }
            .example {
                background: #e7f3ff;
                border: 1px solid #b8daff;
                border-radius: 8px;
                padding: 15px;
                margin: 10px 0;
                text-align: left;
            }
            .example strong {
                color: #0056b3;
                display: block;
                margin-bottom: 8px;
            }
            .example code {
                background: #fff;
                padding: 8px 12px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
                color: #333;
                display: block;
                word-break: break-all;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e9ecef;
                color: #888;
                font-size: 14px;
            }
            .footer a {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🎬</div>
            <h1>YouTube Proxy</h1>
            <p class="subtitle">Stream YouTube videos through a secure proxy with transparent embedding</p>

            <div class="info-box">
                <h3>How to Use</h3>
                <p>Use the following URL patterns to watch videos:</p>
                <p><code>/yt-proxy?urlOrVideoId=:videoId</code> - Direct video ID</p>
                <p><code>/yt-proxy?urlOrVideoId=:videoUrl</code> - Full YouTube URL</p>

                <div class="examples">
                    <div class="example">
                        <strong>Using Video ID:</strong>
                        <code>/yt-proxy?urlOrVideoId=dQw4w9WgXcQ</code>
                    </div>
                    <div class="example">
                        <strong>Using Full URL:</strong>
                        <code>/yt-proxy?urlOrVideoId=https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
                    </div>
                    <div class="example">
                        <strong>Using Short URL:</strong>
                        <code>/yt-proxy?urlOrVideoId=https://youtu.be/dQw4w9WgXcQ</code>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p>Created by <a href="https://github.com/starleyDev">Starley Cazorla</a></p>
                <p style="margin-top: 10px;">
                    <a href="https://github.com/StarleyDev/youtube-proxy" target="_blank" rel="noopener noreferrer">
                        📦 View on GitHub
                    </a>
                </p>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    Docker Image: starleydev/youtube-proxy:latest
                </p>

                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    Version: 1.0.6 - 22/05/2026
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.get('/yt-proxy', (req, res) => {
    const { urlOrVideoId } = req.query;

    let videoId = urlOrVideoId as string;

    // If it's a full URL, extract the video ID
    if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
        try {
            const url = new URL(videoId);
            if (url.hostname.includes('youtu.be')) {
                // Handle youtu.be format: /<videoId>
                videoId = url.pathname.split('/').pop() || '';
            } else {
                // Handle youtube.com format: ?v=<videoId> or /watch?v=<videoId>
                videoId = url.searchParams.get('v') || '';
            }
        } catch {
            // If URL parsing fails, use the original value
        }
    }

    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    const videoHtml = `<html style="background-color: transparent;"><body style="background-color: transparent; margin: 0; padding: 0;"><iframe src="${videoUrl}" width="100%" height="100%" style="background-color: transparent; border: none; border-radius: 10px;"></iframe></body></html>`;

    res.send(videoHtml);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

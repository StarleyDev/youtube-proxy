
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send('Welcome to Youtube Proxy! <br><br> Use /yt-proxy/:videoId or /yt-proxy/:videoUrl to watch a video. <br> Example: /yt-proxy/dQw4w9WgXcQ or /yt-proxy/https://www.youtube.com/watch?v=dQw4w9WgXcQ <br><br> Created by Starley Cazorla - <a href="https://github.com/starleyDev">GitHub</a>');
});

app.get('/yt-proxy/:videoIdOrUrl', (req, res) => {
    const { videoIdOrUrl } = req.params;

    let videoId = videoIdOrUrl;

    // If it's a full URL, extract the video ID
    if (videoIdOrUrl.includes('youtube.com') || videoIdOrUrl.includes('youtu.be')) {
        try {
            const url = new URL(videoIdOrUrl);
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

    const videoHtml = `<html><body><iframe src="${videoUrl}" width="100%" height="100%"></iframe></body></html>`;

    res.send(videoHtml);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

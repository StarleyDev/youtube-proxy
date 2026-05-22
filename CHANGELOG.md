# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-05-22

### Changed

- Simplified API to use query parameters instead of path parameters
- Changed route from `/yt-proxy/:videoId` to `/yt-proxy?urlOrVideoId=:value`
- Now accepts both video IDs and full YouTube URLs via query parameter
- Updated landing page with new usage examples

## [1.0.5] - 2026-05-22

### Changed

- Changed route to use query parameters for URL handling
- Route: `/yt-proxy/:videoId?url=:url` to avoid Express routing issues with special characters

## [1.0.4] - 2026-05-22

### Added

- Added GitHub repository link to landing page footer
- Added Docker image information to landing page
- Link: https://github.com/StarleyDev/youtube-proxy

## [1.0.3] - 2026-05-22

### Added

- Created beautiful, modern landing page with gradient background
- Added glassmorphism card design
- Added clear usage instructions with code examples
- Added responsive design for all screen sizes

### Changed

- Updated iframe styling for transparent background
- Changed port from 3000 to 2536

## [1.0.2] - 2026-05-22

### Fixed

- Fixed Docker build to use correct output directory (dist/)
- Changed CMD from `npm start` to `node dist/index.js`
- Resolved MODULE_NOT_FOUND error for compiled JavaScript

## [1.0.1] - 2026-05-22

### Added

- First Docker image pushed to Docker Hub
- Tag: starleydev/youtube-proxy:1.0.1

## [1.0.0] - 2026-05-21

### Added

- Initial release
- Basic YouTube proxy functionality
- Support for video IDs and YouTube URLs
- Express server with TypeScript
- Docker configuration

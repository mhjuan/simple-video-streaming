const player = videojs('video-player', {
  controls: true,
  autoplay: false,
  preload: 'auto',
  playbackRates: [0.75, 1, 1.25, 1.5, 2],
  controlBar: {
    children: [
      'PlayToggle',
      'VolumePanel',
      'CurrentTimeDisplay',
      'TimeDivider',
      'DurationDisplay',
      'ProgressControl',
      'PlaybackRateMenuButton',
      'QualitySelector',
      'FullscreenToggle',
    ],
  },
});

player.src([
  {
    src: '/assets/vasa/1080p.m3u8',
    type: 'application/x-mpegURL',
    label: '1080p',
  },
  {
    src: '/assets/vasa/720p.m3u8',
    type: 'application/x-mpegURL',
    label: '720p',
  },
  {
    src: '/assets/vasa/480p.m3u8',
    type: 'application/x-mpegURL',
    label: '480p',
  },
  {
    src: '/assets/vasa/360p.m3u8',
    type: 'application/x-mpegURL',
    label: '360p',
  },
  {
    src: '/assets/vasa/playlist.m3u8',
    type: 'application/x-mpegURL',
    label: 'Auto',
    selected: true,
  },
]);

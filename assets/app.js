(() => {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const frame = document.querySelector('[data-youtube-id]');
  if (!frame) return;

  const videoId = frame.dataset.youtubeId?.trim();
  if (!videoId || videoId === 'VIDEO_ID_HERE') return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1`;
  iframe.title = frame.dataset.videoTitle || 'Tree video';
  iframe.loading = 'eager';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  frame.replaceChildren(iframe);
})();

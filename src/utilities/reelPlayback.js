export const REEL_PLAY_EVENT = 'adi-reddy:reel-play';
export const REEL_PAUSE_EVENT = 'adi-reddy:reel-pause';

export function requestReelPlayback(video) {
  if (!video) return;

  window.dispatchEvent(new CustomEvent(REEL_PLAY_EVENT, { detail: video }));
  const playRequest = video.play();
  playRequest?.catch(() => {});
  return playRequest;
}

export function pauseAllReels() {
  window.dispatchEvent(new Event(REEL_PAUSE_EVENT));
}

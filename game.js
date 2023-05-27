const audio = document.querySelector('audio');
const audioIcon = document.querySelector('.audioicon');
const audioMuteIcon = document.querySelector('.audiomuteicon');

audio.volume = 0.5; 

audioIcon.addEventListener('click', () => {
  audio.muted = true;
  audioIcon.style.display = 'none';
  audioMuteIcon.style.display = 'block';
});

audioMuteIcon.addEventListener('click', () => {
  audio.muted = false;
  audioIcon.style.display = 'block';
  audioMuteIcon.style.display = 'none';
});

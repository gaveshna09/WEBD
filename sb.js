const moods = {
  "Dance": {
    desc: "Upbeat tunes to get you grooving instantly. Let the rhythm take over and move your feet!",
    songs: ["Levitating - Dua Lipa", "Don't Start Now - Dua Lipa", "Blinding Lights - The Weeknd"]
  },
  "Gym": {
    desc: "Power-packed beats for your workout motivation. Break a sweat with these killer tracks!",
    songs: ["Believer - Imagine Dragons", "Dynamite - BTS", "Thunder - Imagine Dragons"]
  },
  "Meditation": {
    desc: "Calm and serene melodies for deep meditation. Breathe in peace, exhale stress.",
    songs: ["Weightless - Marconi Union", "Clair de Lune - Debussy", "Sunrise Meditation - Anugama"]
  },
  "Study": {
    desc: "Instrumentals to boost focus during study sessions. Get in the zone and let your mind shine.",
    songs: ["Summertime Sadness - Lana Del Rey", "Everything I Wanted - Billie Eilish", "Video Games - Lana Del Rey"]
  }
};

const boxes = document.querySelectorAll('.mood-box');
const descriptionEl = document.querySelector('.description');
const songList = document.querySelector('.song-list');
const nowPlaying = document.querySelector('.now-playing');
const nowPlayingSongName = nowPlaying.querySelector('.song-name');

boxes.forEach(box => {
  box.addEventListener('click', () => {
    boxes.forEach(b => b.classList.remove('selected'));
    box.classList.add('selected');

    const mood = box.getAttribute('data-mood');
    const data = moods[mood];

    descriptionEl.textContent = data.desc;
    songList.style.display = 'block';
    songList.innerHTML = '';

    data.songs.forEach(song => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = song;
      a.href = `https://open.spotify.com/search/${encodeURIComponent(song)}`;
      a.target = '_blank';
      li.appendChild(a);
      songList.appendChild(li);

      a.addEventListener('click', (e) => {
        e.preventDefault();
        nowPlaying.style.display = 'block';
        nowPlayingSongName.textContent = song;
        window.open(a.href, '_blank');
      });
    });

    nowPlaying.style.display = 'none';
    nowPlayingSongName.textContent = '';
  });
});

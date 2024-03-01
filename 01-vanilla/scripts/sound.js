const audioPlayer = document.getElementById("audioPlayer");

const SOUND_PATH = [
  "assets/soundtrack/home.mp3",
  "assets/soundtrack/level1.mp3",
  "assets/soundtrack/level2.mp3",
];

// 播放音频
export function playAudio() {
  audioPlayer.play();
}

// 暂停音频
export function pauseAudio() {
  audioPlayer.pause();
}

export function switchAudio(index) {
  audioPlayer.src = SOUND_PATH[index];
  audioPlayer.load(); // 重新加载音频元素以应用新的源文件
  audioPlayer.play(); // 可选：自动播放新音频
}

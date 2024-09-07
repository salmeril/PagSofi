// audioPlayer.js
function createAudioPlayer(audioSrc, audioId) {
    const audio = new Audio(audioSrc);

    // Botón de Play/Pause con icono
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fas fa-play"></i>'; // Icono de play

    // Botón de Mute/Unmute con icono
    const muteButton = document.createElement('button');
    muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icono de parlante

    // Barra de progreso
    const progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.value = '0';
    progressBar.max = '100';
    progressBar.className = 'progress-bar'; // Añadimos una clase para estilizar

    // Logo de WhatsApp
    const logo = document.createElement('img');
    logo.src = '/infografia-1/src/icons/logomensaje.png'; // Cambia la ruta del logo
    logo.alt = 'Logo';

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Cambia a icono de pausa
        } else {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // Cambia a icono de play
        }
    });

    muteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteButton.innerHTML = audio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    audio.addEventListener('timeupdate', () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    progressBar.addEventListener('input', () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    const audioContainer = document.createElement('div');
    audioContainer.className = 'audio-message';
    audioContainer.id = `audio-${audioId}`; // Asigna un ID único basado en el identificador del audio
    audioContainer.appendChild(logo);
    audioContainer.appendChild(playButton);
    audioContainer.appendChild(progressBar);
    audioContainer.appendChild(muteButton);

    return audioContainer;
}

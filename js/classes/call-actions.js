class CallActions {
    constructor() {
        this.audio = false; // Propiedad para almacenar el estado del audio
    }

    toggleAudio() {
        this.audio = !this.audio; // Cambiar el estado del audio
        return this.audio; // Devolver el nuevo estado del audio
    }

    toggleVideo() {
        return Math.random() < 0.5;
    }

    leaveConversation(message) {
        alert(message || "To be implemented");
    }
}

// Crear una instancia de CallActions
const callActions = new CallActions();

// Obtener el botón de audio por su id
const audioButton = document.getElementById('audioButton');

// Agregar un event listener para el evento "click" al botón de audio
audioButton.addEventListener('click', function() {
    // Llamar al método toggleAudio de CallActions y asignar el resultado a la propiedad audio
    callActions.audio = callActions.toggleAudio();
    console.log("Audio activado:", callActions.audio);
});
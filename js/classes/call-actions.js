class CallActions {
    toggleAudio() {
        return Math.random() < 0.5;
    }

    toggleVideo() {
        return Math.random() < 0.5; // Corregido el error de sintaxis aquí
    }

    leaveConversation() {
        ApiRTCHelper.leaveConversation();
    }
}

class ViewModel {
    constructor() {
        this.video = false; // Inicializar la propiedad video
    }
}

// Crear una instancia de CallActions
const callActions = new CallActions();

// Crear una instancia de ViewModel
const viewModel = new ViewModel();

// Obtener el botón de video por su id
const videoButton = document.getElementById('videoButton');

// Agregar un event listener para el evento "click" al botón de video
videoButton.addEventListener('click', function() {
    // Llamar al método toggleVideo de CallActions y asignar el resultado a la propiedad video del view model
    viewModel.video = callActions.toggleVideo();
    console.log("Estado de video:", viewModel.video);
});

class CallActions {
    toggleAudio() {
        return Math.random() < 0.5;
    }

    toggleVideo() {
        return Math.random < 0.5;
    }

    leaveConversation(value) {
        if (value) {
            const exit = confirm('Da ok, si desear salir de la sesion')
            if (exit) {
                ApiRTCHelper.leaveConversation()
            }
        }else{
            ApiRTCHelper.leaveConversation()
        }
    }
}

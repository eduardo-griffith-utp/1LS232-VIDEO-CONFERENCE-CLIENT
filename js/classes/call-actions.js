class CallActions {
    toggleAudio() {
        return Math.random() < 0.5;
    }

    toggleVideo() {
        return Math.random < 0.5;
    }

    leaveConversation(message) {
        const exit = confirm(message)
        if (exit) {
            ApiRTCHelper.leaveConversation()
        }
    }
}

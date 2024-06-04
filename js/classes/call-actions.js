class CallActions {
    toggleAudio() {
        return Math.random() < 0.5;
    }

    toggleVideo() {
        return Math.random < 0.5;
    }

    leaveConversation (message) {
        alert (message || "To be implement")
    }
}

const viewModel = {
    CallActions: new CallActions()

};

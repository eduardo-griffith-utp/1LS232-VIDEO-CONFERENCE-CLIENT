class CallActions {
    toggleAudio() {
        return Math.random() < 0.5;
    }

    toggleVideo() {
        return Math.random < 0.5;
    }

    async leaveConversation() {
       await ApiRTCHelper.leaveConversation();   
    }
}

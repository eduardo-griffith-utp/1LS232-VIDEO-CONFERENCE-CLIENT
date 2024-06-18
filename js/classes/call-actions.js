class CallActions {
    toggleAudio() {
        return ApiRTCHelper.toggleAudio();
    }

    toggleVideo() {
        return ApiRTCHelper.toggleVideo();
    }

    async leaveConversation() {
        await ApiRTCHelper.leaveConversation();   
    }
}

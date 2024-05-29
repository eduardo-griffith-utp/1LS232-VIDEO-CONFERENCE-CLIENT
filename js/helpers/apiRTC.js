class ApiRTCHelper {
    static API_KEY = CONFIG.apiRTC.apiKey;
    static userAgent = undefined;
    static session = undefined;
    static conversation = undefined;
    static streamList = [];
    static localStream = null;

    static async connect(room, onStreamAdded, onStreamRemoved) {
        let self = this;
        this.room = room;
        
        try {
            this.userAgent = new apiRTC.UserAgent({ uri: 'apiKey:' + CONFIG.apiRTC.apiKey })

            this.session = await this.userAgent.register({
                cloudUrl: CONFIG.apiRTC.cloudUrl
            });
                
            // Preparar conexión a la conversación
            this.conversation = this.session.getOrCreateConversation(this.room);

            // Cada vez que se desencadena el evento streamListChanged
            this.conversation.on('streamListChanged', (streamInfo) => {
                // Cuando se agrega un nuevo stream Y el stream agregado no es local
                if (streamInfo.listEventType === 'added' && streamInfo.isRemote === true) {
                    onStreamAdded(streamInfo);

                    // Suscribirse a los eventos del nuevo stream (desencadenados por el objeto conversación)
                    self.conversation.subscribeToMedia(streamInfo.streamId).then((stream) => {
                        console.log("Suscrito a " + stream.streamId);
                    });
                }
            });

            // Cada vez que se agrega un stream (suscrito) a la conversación
            this.conversation.on('streamAdded', (stream) => {
                console.log(stream);
                // Agregar un elemento de video en el div 'remote', con el streamId en su atributo id
                stream.addInDiv('remote-' + stream.streamId, 'remote-media-' + stream.streamId, {}, false);
            });

            // Cada vez que se elimina un stream (suscrito) de la conversación
            this.conversation.on('streamRemoved', (stream) => {
                // Eliminar un elemento de video con el streamId en su atributo id
                // stream.removeFromDiv('remote-' + stream.streamId, 'remote-media-' + stream.streamId)
                onStreamRemoved(stream);
            });

            // Definir la configuración del stream local
            let streamOptions = {
                constraints: {
                    audio: true,
                    video: true
                }
            };

            // Obtener el stream de la cámara local
            this.localStream = await this.userAgent.createStream(streamOptions);
            
            // Mostrar el stream (audio+video) en el elemento <video> con id 'publisher-video'
            var element = document.getElementById('publisher-video');
            this.localStream.attachToElement(element);
            
            // Unirse a la conversación
            await this.conversation.join();
            
            // Publicar el stream local en la conversación
            await this.conversation.publish(this.localStream);
        
        } catch (error) {
            console.error('Error durante la conexión:', error);
        }
    }

    static toggleAudio() {
        if (this.localStream) {
            if (this.localStream.isAudioEnabled()) {
                this.localStream.disableAudio();
            } else {
                this.localStream.enableAudio();
            }
        } else {
            console.error('No local stream available to toggle audio.');
        }
    }

    static toggleVideo() {
        if (this.localStream) {
            if (this.localStream.isVideoEnabled()) {
                this.localStream.disableVideo();
            } else {
                this.localStream.enableVideo();
            }
        } else {
            console.error('No local stream available to toggle video.');
        }
    }

    static isAudioEnabled() {
        if (this.localStream) {
            return this.localStream.isAudioEnabled();
        } else {
            console.error('No hay stream local disponible para verificar el estado del audio.');
            return false;
        }
    }

    static isVideoEnabled() {
        if (this.localStream) {
            return this.localStream.isVideoEnabled();
        } else {
            console.error('No hay stream local disponible para verificar el estado del video.');
            return false;
        }
    }
}

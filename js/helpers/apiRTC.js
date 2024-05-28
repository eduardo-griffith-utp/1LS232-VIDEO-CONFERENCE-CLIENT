class ApiRTCHelper {
    static API_KEY = CONFIG.apiRTC.apiKey;
    static userAgent = new apiRTC.UserAgent({ uri: 'apiKey:' + this.API_KEY });
    static conversation = undefined;
    static streamList = [];
    static localStream = null;

    static async connect(room, onStreamAdded, onStreamRemoved) {
        let self = this;
        this.room = room;
        
        try {
            var userAgent = new apiRTC.UserAgent({ uri: 'apiKey:' + CONFIG.apiRTC.apiKey })
            let conversation = undefined;

            userAgent.register({
                cloudUrl: 'https://cloud.apirtc.com'
            }).then( (session) => {    
                conversation = session.getOrCreateConversation(self.room);
                    
                // Define the way the local stream will be configured
                let streamOptions = {
                    constraints: {
                        audio: true,
                        video: true
                    }
                }
    
                //Get the stream for the local camera
                userAgent.createStream(streamOptions).then(function (stream) {
                    self.localStream = stream;
    
                    //Display the stream (audio+video) in the <video> element with id 'local'
                    var element = document.getElementById('publisher-video');
                    console.log(element);
                    stream.attachToElement(element)
                    
                    //Join the conversation
                    conversation.join().then(() => {
                    
                        //Publish the local stream in the conversation
                        conversation.publish(stream)
                    });
                });  
                
                //Any time the streamListChanged is triggered
                conversation.on('streamListChanged', (streamInfo) => {
    
                    // when a new stream is added AND the added stream is not 
                    if (streamInfo.listEventType === 'added' && streamInfo.isRemote === true) {
                        onStreamAdded(streamInfo);

                        //Subscribe to the new stream's events (triggered by the conversation object)
                        conversation.subscribeToMedia(streamInfo.streamId).then((stream) => {
                            console.log("Subscribed to " + stream.streamId)
                        })
                    }
                });
    
                //Any time a (subscribed) stream is added to the conversation
                conversation.on('streamAdded', (stream) => {
                    
                    //Add a video element in the 'remote' div element,  with the streamId in its id attribute
                    stream.addInDiv('remote-' + stream.streamId, 'remote-media-' + stream.streamId, {}, false)
    
                });
    
                //Any time a (subscribed) stream is removed from the conversation
                conversation.on('streamRemoved', (stream) => {
                    
                    //Remove a video element with the streamId in its id attribute
                    // stream.removeFromDiv('remote', 'remote-media-' + stream.streamId)
                    onStreamRemoved(stream);
                }); 
            });
 
            /*
            const session = await this.userAgent.register({
                cloudUrl: CONFIG.apiRTC.cloudUrl
            });
                
            // Preparar conexión a la conversación
            // this.conversation = session.getOrCreateConversation(this.room);

            // Cada vez que se desencadena el evento streamListChanged
            this.conversation.on('streamListChanged', (streamInfo) => {
                // Cuando se agrega un nuevo stream Y el stream agregado no es local
                if (streamInfo.listEventType === 'added' && streamInfo.isRemote === true) {
                    onStreamAdded(streamInfo);

                    // Suscribirse a los eventos del nuevo stream (desencadenados por el objeto conversación)
                    this.conversation.subscribeToMedia(streamInfo.streamId).then((stream) => {
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
            const stream = await this.userAgent.createStream(streamOptions);
            
            // Mostrar el stream (audio+video) en el elemento <video> con id 'publisher-video'
            var element = document.getElementById('publisher-video');
            stream.attachToElement(element);
            
            // Unirse a la conversación
            await this.conversation.join();
            
            // Publicar el stream local en la conversación
            await this.conversation.publish(stream);
            */
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

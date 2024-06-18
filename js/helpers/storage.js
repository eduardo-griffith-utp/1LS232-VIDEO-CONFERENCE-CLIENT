
class StorageHelper{

  static getFiles(path){

  return ["uploads/file1.txt", "uploads/file2.jpg", "uploads/file3.pdf"];
  }

  static upload(file, path, progress_callback) {
    // Combinar el nombre del archivo con el path
    const updatedPath = path + "/" + file.name;

    return new Promise((resolve, reject) => {
        // Obtener una referencia al almacenamiento en Firebase
        const storageRef = firebase.storage().ref(updatedPath);

        // Iniciar la tarea de carga del archivo
        const uploadTask = storageRef.put(file);

        // Escuchar los eventos de cambio de estado de la tarea
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Calcular el progreso de la carga
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                // Llamar al callback de progreso si se proporciona
                if (progress_callback) {
                    progress_callback(progress);
                }

                // Manejar los estados de la tarea de carga
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Rechazar la promesa en caso de error
                reject(error);
            },
            () => {
                // Resolver la promesa con la URL de descarga después de completar la carga
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
  }

  static download(file, path) {
    return "https://google.com";
  }
}


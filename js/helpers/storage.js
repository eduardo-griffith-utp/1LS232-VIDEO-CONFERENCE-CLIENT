
class StorageHelper{

  static getFiles(path){

  return ["uploads/file1.txt", "uploads/file2.jpg", "uploads/file3.pdf"];
  }

  static upload(file, path, progress_callback) {
    path = path + "/" + file.name; 
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(updatedPath);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progress_callback) {
            progress_callback(progress);
          }

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
          reject(error);
        },
        () => {
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




class StorageHelper{

  static getFiles(path){
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(path);
      storageRef.listAll()
        .then((res) => {
          const files = res.items.map(itemRef => itemRef.fullPath);
          resolve(files);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static upload(file, path, progress_callback) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(path);
      const uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          if (progress_callback)
            progress_callback(progress);
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  static download (path) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(path);
      storageRef.getDownloadURL().then((url) => {
        resolve(url);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
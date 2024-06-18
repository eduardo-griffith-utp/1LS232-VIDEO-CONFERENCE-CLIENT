
class StorageHelper {

  static getFiles(path) {
    return new Promise((resolve, reject) => {

      const storageRef = firebase.storage().ref(path);

      storageRef.listAll()
        .then(res => {

          const files = res.items.map(itemRef => itemRef.fullPath);
          resolve(files);
        })
        .catch(error => {

          reject(error);
        });
    });
  }

  static upload(file, path, progress_callback) {
    return true
  }


  static download(file, path) {

    return new Promise((resolve, reject) => {

      const storageRef = firebase.storage().ref(path);

      storageRef.getDownloadURL()
        .then((url) => {

          resolve(url);
        })
        .catch((error) => {

          reject(error);
        });
    });

  }


}



class StorageHelper {

  static getFiles(path) {

    return ["uploads/file1.txt", "uploads/file2.jpg", "uploads/file3.pdf"];
  }

  static upload(file, path, progress_callback) {

    return true
  }

  // Método download
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


import { Injectable, ɵConsole } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// const config = {
//   apiKey: "AIzaSyCpF7yjQa8CL8TMYXe6QxXbIXaBj2yv-ec",
//   authDomain: "event-system-2041f.firebaseapp.com",
//   databaseURL: "https://event-system-2041f.firebaseio.com",
//   projectId: "event-system-2041f",
//   storageBucket: "event-system-2041f.appspot.com",
//   messagingSenderId: "286459753933"
// };

const config = {
  apiKey: "AIzaSyCQ0s5qszhJJl9A33jmbt2tmC8C57dFbCQ",
  authDomain: "event-system-49b35.firebaseapp.com",
  databaseURL: "https://event-system-49b35.firebaseio.com",
  projectId: "event-system-49b35",
  storageBucket: "event-system-49b35.appspot.com",
  messagingSenderId: "399763809330",
  appId: "1:399763809330:web:4a99a1bdc8ada64546482b",
  measurementId: "G-DC0JMDFHX6"
};

firebase.initializeApp(config);

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  FDB: any;
  FS: any;
  AUTH: any;

  private checkIfAllGivenFilesAreDeleted: any;

  constructor() {
    this.FDB = firebase.firestore();
    this.FS = firebase.storage();
    this.AUTH = firebase.auth();
  }

  // AUTH:
  getAuthReference() {
    return this.AUTH;
  }

  sendPasswordResetEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.AUTH.sendPasswordResetEmail(email).then(function(success) {
        resolve(success);
      }).catch(function(error) {
        console.log('Error with code -> ' + error.code + ' message -> ' + error.message);
          reject(error);
      });
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      let self = this;
      this.AUTH.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        self.AUTH.signInWithEmailAndPassword(email, password).then(function(success) {
          resolve(success);
        }).catch(function(error) {
            console.log('Error with code -> ' + error.code + ' message -> ' + error.message);
            reject(error);
        });
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }

  signUpUser(email: string, password: string, firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      let self = this;
      this.AUTH.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        self.AUTH.createUserWithEmailAndPassword(email, password).then(function(data) {
          self.addNewUserInUsersListOnRegister(data.user.uid, firstName, lastName).then(function(success) {
            resolve(success);
          }).catch(function(error) {
              console.log('Error with code -> ' + error.code + ' message -> ' + error.message);
              reject(error);
          });
        }).catch(function(error) {
            console.log('Error with code -> ' + error.code + ' message -> ' + error.message);
            reject(error);
        });
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }

  signOutUser() {
    return new Promise((resolve, reject) => {
      this.AUTH.signOut().then(function(success) {
        resolve(success);
      }).catch(function(error) {
          console.log('Error with code -> ' + error.code + ' message -> ' + error.message);
          reject(error);
      });
    });
  }

  // USERS
  addNewUserInUsersListOnRegister(userId: string, firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("users").doc(userId).set({
        first_name: firstName,
        last_name: lastName
      }, { merge: true }).then(function(success) {
          resolve(success);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  checkIfEventExists(eventCode: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .get()
        .then(function(doc: any) {
          console.log('doc', doc);
          if (doc.exists) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(function(error: any) {
          console.log('error', error);
          reject("Something went Wrong!");
        });
    });
  }

  createNewEvent(eventData) {
    return new Promise((resolve, reject) => {
      this.checkIfEventExists(eventData.event_code).then(
        (isExist: boolean) => {
          if (isExist) {
            reject(
              "Event code has already exist. Please enter another event code."
            );
          } else {
            // Get a new write batch
            let batch = this.FDB.batch();

            let eventConfigurationsRef = this.FDB.collection("events_data")
              .doc(eventData.event_code)
              .collection("settings")
              .doc("configurations");
            batch.set(eventConfigurationsRef, eventData);

            let eventFieldsRef = this.FDB.collection("events_data").doc(
              eventData.event_code
            );
            batch.set(eventFieldsRef, {
              date_created: new Date(new Date().toUTCString()).getTime(),
              event_code: eventData.event_code
            });

            // Commit the batch
            batch.commit().then(function() {
              resolve(true);
            });
          }
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  getAllEvents(startEvent = null, limit = 20) {
    return new Promise((resolve, reject) => {
      if (startEvent !== null) {
        this.FDB.collection("events_data")
          .startAfter(startEvent)
          .orderBy("date_created", "desc")
          .limit(limit)
          .get()
          .then(
            function(events: any) {
              resolve(events.docs);
            },
            function(error: any) {
              reject(error);
            }
          );
      } else {
        this.FDB.collection("events_data")
          .orderBy("date_created", "desc")
          .limit(limit)
          .get()
          .then(
            function(events: any) {
              resolve(events.docs);
            },
            function(error: any) {
              reject(error);
            }
          );
      }
    });
  }

  deleteEvent(eventId: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventId)
        .delete()
        .then(function() {
          resolve(true);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  getEventData(eventCode: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("configurations")
        .get()
        .then(function(doc: any) {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            reject("No such document!");
          }
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventDataSettings(eventData) {
    return new Promise((resolve, reject) => {
      const eventDataRef = this.FDB.collection("events_data")
        .doc(eventData.event_code)
        .collection("settings")
        .doc("configurations");
      eventDataRef
        .set(eventData, { merge: true })
        .then(function() {
          resolve(true);
        })
        .catch(function(error: any) {
          reject(false);
        });
    });
  }

  getEventFeatures(eventCode: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("features")
        .get()
        .then(function(doc: any) {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            resolve(false);
          }
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventFeatures(eventCode, features) {
    return new Promise((resolve, reject) => {
      const eventDataRef = firebase
        .firestore()
        .collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("features");

      eventDataRef
        .set(
          {
            selected: features.selected,
            premium: features.premium
          },
          { merge: false }
        )
        .then(function() {
          resolve(true);
        })
        .catch(function(error: any) {
          reject(false);
        });
    });
  }

  getEventDesign(eventCode: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("design")
        .get()
        .then(function(doc: any) {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            resolve(false);
          }
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventDesign(eventCode, data) {
    return new Promise((resolve, reject) => {
      const eventDataRef = firebase
        .firestore()
        .collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("design");

      eventDataRef
        .set(data, { merge: false })
        .then(function() {
          resolve(true);
        })
        .catch(function(error: any) {
          reject(false);
        });
    });
  }

  uploadImage(eventCode, fullPath, imgFile) {
    return new Promise((resolve, reject) => {
      let metadata = {
        contentType: imgFile.type
      };

      let uploadTask = this.FS.ref()
        .child(eventCode)
        .child(fullPath)
        .put(imgFile, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed", // or firebase.storage.TaskEvent.STATE_CHANGED
        function(snapshot) {
          switch (snapshot.state) {
            case "paused": // or firebase.storage.TaskState.PAUSED
              break;
            case "running": // or firebase.storage.TaskState.RUNNING
              break;
          }
        },
        function(error) {
          reject(error);
        },
        function(done) {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  deleteFileFremStorage(filePath) {
    return new Promise((resolve, reject) => {
      // Create a reference to the file to delete
      var fileRef = this.FS.ref().child(filePath);

      // Delete the file
      fileRef
        .delete()
        .then(function() {
          // File deleted successfully
          resolve(true);
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          reject(error);
        });
    });
  }

  deleteOldEventIconAndCoverImages(eventCode, images = []) {
    return new Promise((resolve, reject) => {
      if (images.length) {
        let numberOfDeletedImages = 0;

        this.checkIfAllGivenFilesAreDeleted = (
          numverOFAll,
          numberOfDeleted
        ) => {
          if (numverOFAll === numberOfDeleted) {
            resolve(true);
          }
        };

        for (let i = 0; i < images.length; i++) {
          this.deleteFileFremStorage(images[i])
            .then((result: any) => {
              numberOfDeletedImages++;
              this.checkIfAllGivenFilesAreDeleted(
                images.length,
                numberOfDeletedImages
              );
            })
            .catch(function(error: any) {
              reject(error);
            });
        }
      } else {
        resolve(true);
      }
    });
  }

  saveEventHomePageDesign(eventCode, data) {
    return new Promise((resolve, reject) => {
      const eventDataRef = firebase
        .firestore()
        .collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("home_design");

      eventDataRef
        .set(data, { merge: false })
        .then(function() {
          resolve(true);
        })
        .catch(function(error: any) {
          reject(false);
        });
    });
  }

  getEventHomePageDesign(eventCode: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("home_design")
        .get()
        .then(function(doc: any) {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            resolve(false);
          }
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  getEventTranslations(eventCode: string, lang: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("translations")
        .collection(lang)
        .get()
        .then(function(translations) {
          let translationsArray = [];

          if (translations.size) {
            translations.forEach(function(doc) {
              translationsArray.push(doc.data());
            });
          }

          resolve(translationsArray);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventTranslations(eventCode, lang, translations) {
    return new Promise((resolve, reject) => {
      // Get a new write batch
      let batch = firebase.firestore().batch();

      for (let i = 0; i < translations.length; i++) {
        const traDoc = translations[i];
        
        let traDocRef = firebase
        .firestore()
        .collection("events_data")
        .doc(eventCode)
        .collection("settings")
        .doc("translations")
        .collection(lang)
        .doc(traDoc.key);
        batch.set(traDocRef, traDoc);
      }

      // Commit the batch
      batch.commit().then(function () {
        resolve(true);
      });
    });
  }
}

import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  FDB: any;
  FS: any;
  AUTH: any;
  private checkIfAllGivenFilesAreDeleted: any;

  constructor(private http: HttpClient) {
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
    
    this.FDB = firebase.firestore();
    this.FS = firebase.storage();
    this.AUTH = firebase.auth();
  }

  // AUTH:
  getAuthReference() {
    return this.AUTH;
  }

  getFirestoreEventConfigurationsReference(eventCode: string) {
    return this.FDB.collection("events_data").doc(eventCode).collection("settings").doc("configurations");
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

  signUpUser(email: string, password: string, firstName: string, lastName: string, userImage: string) {
    return new Promise((resolve, reject) => {
      let self = this;
      this.AUTH.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        self.AUTH.createUserWithEmailAndPassword(email, password).then(function(data) {
          self.addNewUserInUsersListOnRegister(data.user.uid, firstName, lastName, userImage).then(function(success) {
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

  signUpUserWithNODEJS(email: string, password: string, firstName: string, lastName: string, role: string, userImage: string) {
    return new Promise((resolve, reject) => {
      const headers = {};
      const body = { 
        userEmail: email,
        userPassword: password,
        userFirstName: firstName.toLowerCase(),
        userLastName: lastName.toLowerCase(),
        userRole: role.toLowerCase(),
        userImageUrl: userImage,
        searchTerms: [firstName.toLowerCase(), lastName.toLowerCase(), email.toLowerCase(), email.split('@')[0].toLowerCase(), role.toLowerCase()]
      };
      this.http.post('https://us-central1-event-system-49b35.cloudfunctions.net/signUpUser', body, { headers }).subscribe({
          next: (data: any) => {
            if(data.data.code === 'auth/email-already-exists') {
              reject(data.data.code);
            } else {
              resolve(true);
            }
          },
          error: error => {
            console.error('There was an error!', error);
            reject(false);
          }
      });
    });
  }

  signUpUserWithNODEJSV2(user: any) {
    return new Promise((resolve, reject) => {
      const headers = {};
      const body = {
        email: user.email,
        password: user.password,
        role: user.role.toLowerCase(),
        firstName: user.firstName.toLowerCase(),
        lastName: user.lastName.toLowerCase(),
        photo: user.photo,
        companyName: user.companyName.toLowerCase(),
        userSponsorLevel: user.userSponsorLevel.toLowerCase(),
        boothNumber: user.boothNumber.toLowerCase(),
        company: user.company.toLowerCase(),
        position: user.position.toLowerCase(),
        description: user.description.toLowerCase(),
        searchTerms: [
          user.email.toLowerCase(), 
          user.email.split('@')[0].toLowerCase(), 
          user.role.toLowerCase(),
          user.firstName.toLowerCase(), 
          user.lastName.toLowerCase(), 
          user.companyName.toLowerCase(), 
          user.userSponsorLevel.toLowerCase(), 
          user.boothNumber.toLowerCase(), 
          user.company.toLowerCase(),
          user.position.toLowerCase(),
          user.description.toLowerCase()
        ]
      };
      let service_this = this;

      if(body.photo === '') {
        console.log('No photo');
        signUpRequest()
      } else {
        console.log('Upload Photo');
        // Save image:
        this.uploadImageFile("users/images/" + (new Date().getTime() + "_" + body.photo.name), body.photo).then((result: any) => {
          console.log('result', result);
          body.photo = result;
          signUpRequest();
        }).catch(function(error: any) {
          console.log('error', error);
          reject(false);
        });
      }


      function signUpRequest() {
        service_this.http.post('https://us-central1-event-system-49b35.cloudfunctions.net/signUpUserV2', body, { headers }).subscribe({
          next: (data: any) => {
            if(data.data.code === 'auth/email-already-exists') {
              reject(data.data.code);
            } else {
              resolve(true);
            }
          },
          error: error => {
            console.error('There was an error!', error);
            reject(false);
          }
        });
      }

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
  addNewUserInUsersListOnRegister(userId: string, firstName: string, lastName: string, userImage: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("users").doc(userId).set({
        first_name: firstName,
        last_name: lastName,
        user_image: userImage
      }, { merge: true }).then(function(success) {
          resolve(success);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  getUserFields(uid: string) {
    return new Promise((resolve, reject) => {
      this.FDB.collection("users").doc(uid).get().then(function(doc: any) {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("No such document!");
        }
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  getSystemUsers(startDoc: any = null, limit: number = 12) {
    return new Promise((resolve, reject) => {
      let query = this.FDB.collection("users").orderBy("first_name").orderBy("last_name").limit(limit);
      if(startDoc !== null) {
        query = this.FDB.collection("users").orderBy("first_name").orderBy("last_name").startAfter(startDoc).limit(limit);
      }

      query.get().then(function(collection: any) {
        resolve(collection.docs);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  getSystemUsersV2(startDoc: any = null, searchWord: string = '', limit: number = 12) {
    return new Promise((resolve, reject) => {
      let query = this.FDB.collection("users").orderBy("first_name").orderBy("last_name").limit(limit);
      if(startDoc !== null && searchWord.length) {
        query = this.FDB.collection("users").where("searchTerms", "array-contains", searchWord.toLowerCase()).orderBy("first_name").orderBy("last_name").startAfter(startDoc).limit(limit);
      } else if(startDoc !== null) {
        query = this.FDB.collection("users").orderBy("first_name").orderBy("last_name").startAfter(startDoc).limit(limit);
      } else if(searchWord.length) {
        query = this.FDB.collection("users").where("searchTerms", "array-contains", searchWord.toLowerCase()).orderBy("first_name").orderBy("last_name").limit(limit);
      } else {}

      query.get().then(function(collection: any) {
        resolve(collection.docs);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  getEventUsers(eventCode: string, startDoc: any = null, limit: number = 12) {
    return new Promise((resolve, reject) => {
      let query = this.FDB.collection("users").where("events", "array-contains", eventCode).orderBy("first_name").orderBy("last_name").limit(limit);
      if(startDoc !== null) {
        query = this.FDB.collection("users").where("events", "array-contains", eventCode).orderBy("first_name").orderBy("last_name").startAfter(startDoc).limit(limit);
      }

      query.get().then(function(collection: any) {
        resolve(collection.docs);
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
            eventData["date_created"] = new Date(new Date().toUTCString()).getTime();
            // Get a new write batch
            let batch = this.FDB.batch();

            let eventConfigurationsRef = this.FDB.collection("events_data").doc(eventData.event_code).collection("settings").doc("configurations");
            batch.set(eventConfigurationsRef, eventData);

            let eventFieldsRef = this.FDB.collection("events_data").doc(eventData.event_code);
            batch.set(eventFieldsRef, eventData);

            // Commit the batch
            batch.commit().then(function() { resolve(true); });
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
        this.FDB.collection("events_data").startAfter(startEvent).orderBy("date_created", "desc").limit(limit).get().then(
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
      this.FDB.collection("events_data").doc(eventCode).collection("settings").doc("configurations").get().then(function(doc: any) {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("No such document!");
        }
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  saveEventDataSettings(eventData) {
    return new Promise((resolve, reject) => {
      // Get a new write batch
      let batch = this.FDB.batch();

      let eventConfigurationsRef = this.FDB.collection("events_data").doc(eventData.event_code).collection("settings").doc("configurations");
      batch.update(eventConfigurationsRef, eventData);

      let eventFieldsRef = this.FDB.collection("events_data").doc(eventData.event_code);
      batch.update(eventFieldsRef, eventData);

      // Commit the batch
      batch.commit().then(function() { resolve(true); });
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
      let metadata = { contentType: imgFile.type };

      let uploadTask = this.FS.ref().child(eventCode).child(fullPath).put(imgFile, metadata);
      uploadTask.on("state_changed", function(snapshot) {
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        }, function(error) {
          reject(error);
        }, function(done) {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  uploadImageFile(fullPath, imgFile) {
    return new Promise((resolve, reject) => {
      let metadata = { contentType: imgFile.type };

      let uploadTask = this.FS.ref().child(fullPath).put(imgFile, metadata);
      uploadTask.on("state_changed", function(snapshot) {
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        }, function(error) {
          reject(error);
        }, function(done) {
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

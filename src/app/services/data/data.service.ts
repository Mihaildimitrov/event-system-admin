import { HttpClient } from '@angular/common/http';
import { FirebaseService } from "./../firebase/firebase.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private database: any;

  constructor(private http: HttpClient) {
    this.database = new FirebaseService(this.http);
  }

  // ========================================================================
  // AUTH:
  getAuthReference() {
    return this.database.getAuthReference();
  }

  getFirestoreEventConfigurationsReference(eventCode: string) {
    return this.database.getFirestoreEventConfigurationsReference(eventCode);
  }

  sendPasswordResetEmail(email: string) {
    return new Promise((resolve, reject) => {
      return this.database.sendPasswordResetEmail(email).then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      return this.database.signInUser(email, password).then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  signUpUser(email: string, password: string, firstName: string, lastName: string, userImage: string) {
    return new Promise((resolve, reject) => {
      return this.database.signUpUser(email, password, firstName, lastName, userImage).then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  signUpUserWithNODEJS(email: string, password: string, firstName: string, lastName: string, role: string, userImage: string) {
    return new Promise((resolve, reject) => {
      return this.database.signUpUserWithNODEJS(email, password, firstName, lastName, role, userImage).then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  signOutUser() {
    return new Promise((resolve, reject) => {
      return this.database.signOutUser().then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  getUserFields(uid: string) {
    return new Promise((resolve, reject) => {
      return this.database.getUserFields(uid).then((result: any) => {
          resolve(result);
        }).catch(function(error: any) {
          reject(error);
        });
    });
  }

  // ========================================================================
  // Event CRUD:
  checkIfEventExists(eventCode: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .checkIfEventExists(eventCode)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  createNewEvent(eventData) {
    return new Promise((resolve, reject) => {
      return this.database
        .createNewEvent(eventData)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  getAllEvents(startEvent = null, limit = 20) {
    return new Promise((resolve, reject) => {
      return this.database
        .getAllEvents(startEvent, limit)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  deleteEvent(eventId: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .deleteEvent(eventId)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  // ========================================================================
  // Event Settings:
  getEventData(eventCode: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .getEventData(eventCode)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventData(eventData: object) {
    return new Promise((resolve, reject) => {
      return this.database
        .saveEventDataSettings(eventData)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  // ========================================================================
  // Event Features:
  getEventFeatures(eventCode: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .getEventFeatures(eventCode)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventFeatures(eventCode: string, eventFeatures: object) {
    return new Promise((resolve, reject) => {
      return this.database
        .saveEventFeatures(eventCode, eventFeatures)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  // ========================================================================
  // Event Design:
  getEventDesign(eventCode: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .getEventDesign(eventCode)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventDesign(
    eventCode: string,
    data: any,
    newIcon = null,
    newCover = null
  ) {
    return new Promise((resolve, reject) => {
      let module_this = this;
      let numberToLoad = 0;
      let allLoadedModules = 0;

      if (newIcon !== null) {
        numberToLoad++;

        // Delete old icon image:

        // Save new icon image:
        this.database
          .uploadImage(
            eventCode,
            "settings/design/" + (new Date().getTime() + "_" + newIcon.name),
            newIcon
          )
          .then((result: any) => {
            data.iconImg = result;

            allLoadedModules++;
            if (allLoadedModules === numberToLoad) {
              module_this
                .saveEventDesignData(eventCode, data)
                .then((result: any) => {
                  resolve(result);
                })
                .catch(function(error: any) {
                  reject(error);
                });
            }
          })
          .catch(function(error: any) {
            reject(error);
          });
      }

      if (newCover !== null) {
        numberToLoad++;
        // Delete old icon image:

        // Save new icon image:
        this.database
          .uploadImage(
            eventCode,
            "settings/design/" + (new Date().getTime() + "_" + newCover.name),
            newCover
          )
          .then((result: any) => {
            data.coverImg = result;
            allLoadedModules++;

            if (allLoadedModules === numberToLoad) {
              module_this
                .saveEventDesignData(eventCode, data)
                .then((result: any) => {
                  resolve(result);
                })
                .catch(function(error: any) {
                  reject(error);
                });
            }
          })
          .catch(function(error: any) {
            reject(error);
          });
      }

      if (!newIcon && !newCover) {
        module_this
          .saveEventDesignData(eventCode, data)
          .then((result: any) => {
            resolve(result);
          })
          .catch(function(error: any) {
            reject(error);
          });
      }
    });
  }

  private saveEventDesignData(eventCode, data) {
    return new Promise((resolve, reject) => {
      return this.database
        .saveEventDesign(eventCode, data)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  deleteOldEventIconAndCoverImages(eventCode: string, images: Array<any>) {
    return new Promise((resolve, reject) => {
      return this.database
        .deleteOldEventIconAndCoverImages(eventCode, images)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  deleteImage(imagePath: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .deleteFileFremStorage(imagePath)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventHomePageDesign(eventCode: string, data: any, newCover = null) {
    return new Promise((resolve, reject) => {
      if (newCover !== null) {
        let module_this = this;

        // Save new icon image:
        this.database
          .uploadImage(
            eventCode,
            "settings/design/home/" +
              (new Date().getTime() + "_" + newCover.name),
            newCover
          )
          .then((result: any) => {
            data.cover_img = result;

            // TODO: save data
            module_this.database
              .saveEventHomePageDesign(eventCode, data)
              .then((result: any) => {
                resolve(result);
              })
              .catch(function(error: any) {
                reject(error);
              });
          })
          .catch(function(error: any) {
            reject(error);
          });
      } else {
        this.database
          .saveEventHomePageDesign(eventCode, data)
          .then((result: any) => {
            resolve(result);
          })
          .catch(function(error: any) {
            reject(error);
          });
      }
    });
  }

  getEventHomePageDesign(eventCode: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .getEventHomePageDesign(eventCode)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  // ========================================================================
  // Event Translations:

  getEventTranslations(eventCode: string, lang: string) {
    return new Promise((resolve, reject) => {
      return this.database
        .getEventTranslations(eventCode, lang)
        .then((result: any) => {
          resolve(result);
        })
        .catch(function(error: any) {
          reject(error);
        });
    });
  }

  saveEventTranslations(
    eventCode: string,
    eventTranslations: object,
    numberOfLangs: number
  ) {
    return new Promise((resolve, reject) => {
      let numberOfSaved = 0;

      for (const currentLang in eventTranslations) {
        if (eventTranslations.hasOwnProperty(currentLang)) {
          const currentLangTranslations = eventTranslations[currentLang];

          if (currentLangTranslations.length) {
            this.database
              .saveEventTranslations(
                eventCode,
                currentLang,
                currentLangTranslations
              )
              .then((result: any) => {
                checkIfAllLangsSaved(result);
              })
              .catch(function(error: any) {
                reject(error);
              });
          } else {
            checkIfAllLangsSaved(true);
          }
        }
      }

      function checkIfAllLangsSaved(result) {
        numberOfSaved++;

        if (numberOfSaved === numberOfLangs) {
          resolve(result);
        }
      }
    });
  }

  // ========================================================================
  // Event:

}

import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details-design',
  templateUrl: './event-details-design.component.html',
  styleUrls: ['./event-details-design.component.scss']
})
export class EventDetailsDesignComponent implements OnInit {

  // ==============================
  // DESIGN TAB:
  design: {
    primaryTextColor: string,
    primaryBackgroundColor: string,
    pageTextColor: string,
    pageBackgroundColor: string,
    iconImg: any,
    coverImg: any
  } = {
    primaryTextColor: '#ffffff',
    primaryBackgroundColor: '#0c3e5e',
    pageTextColor: '#ffffff',
    pageBackgroundColor: '#0c3e5e',
    iconImg: '../../../../assets/img/no_img.png',
    coverImg: '../../../../assets/img/no_img.png'
  };

  stillLoadingContent: Boolean = true;
  isSavingEventDesign: Boolean = false;
  saveDesignShowSuccessMsg: Boolean = false;
  imgObject = {
    newIcon: null,
    oldIconUrl: null,
    newCover: null,
    oldCoverUrl: null
  };
  uploadingNewIconImage: Boolean = false;
  uploadingNewCoverImage: Boolean = false;

  private currentEventCode;
  private clearEventImagesStatus() {
    this.imgObject = {
      newIcon: null,
      oldIconUrl: null,
      newCover: null,
      oldCoverUrl: null
    };
  }

  // ==============================
  // HOME PAGE TAB:
  eventSettings;
  stillLoadingHomePageContent: Boolean = true;
  isSavingEventHomePage: Boolean = false;
  saveHomePageShowSuccessMsg: Boolean = false;
  homePageData: {
    title_tra: any,
    description_tra: any,
    customHtml_tra: any,
    cover_img: any,
    hideTitle: any,
    hideDescription: any,
    hideCoverImage: any,
    hideGridIcon: any,
    useCustomHtml: any
  } = {
    title_tra: {},
    description_tra: {},
    customHtml_tra: {},
    cover_img: '../../../../assets/img/no_img.png',
    hideTitle: false,
    hideDescription: false,
    hideCoverImage: false,
    hideGridIcon: false,
    useCustomHtml: false
  };
  uploadingNewHomePageCoverImage: Boolean = false;
  homePageCoverImageObject = {
    newCover: null,
    oldCover: null
  };


  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {

    this.currentEventCode = this.route.snapshot.parent.params['id'];
    this.dataService.getEventDesign(this.currentEventCode).then((result: any) => {
      this.stillLoadingContent = false;

      if(result) {
        this.design = result;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  onIconImageSelected(event) {
    this.uploadingNewIconImage = true;

    if(event.target.files.length) {
      this.imgObject.newIcon = event.target.files[0];
      this.imgObject.oldIconUrl = this.design.iconImg;

      let component_this = this;
      let reader = new FileReader();
      
      if (/^image\//i.test(event.target.files[0].type)) {
          reader.onloadend = function(e) {
            component_this.design.iconImg = reader.result;
            component_this.uploadingNewIconImage = false;
          }
          reader.onerror = function(error) {
            console.log(error);
            component_this.uploadingNewIconImage = false;
          }
          reader.readAsDataURL(event.target.files[0]);
      } 
    } else {
      // console.log('Cancel ICON file upload!');
    }
  }

  onCoverImageSelected(event) {
    this.uploadingNewCoverImage = true

    if(event.target.files.length) {
      this.imgObject.newCover = event.target.files[0];
      this.imgObject.oldCoverUrl = this.design.coverImg;

      let component_this = this;
      let reader = new FileReader();
      if (/^image\//i.test(event.target.files[0].type)) {
          reader.onloadend = function(e) {
            component_this.design.coverImg = reader.result;
            component_this.uploadingNewCoverImage = false;
          }
          reader.onerror = function(error) {
            console.log(error);
            component_this.uploadingNewCoverImage = false;
          }
          reader.readAsDataURL(event.target.files[0]);
      } 
    } else {
      // console.log('Cancel COVER file upload!');
    }
  }

  saveEventDesign() {
    this.isSavingEventDesign = true;
    let component_this = this;

    this.dataService.saveEventDesign(this.currentEventCode, this.design, this.imgObject.newIcon, this.imgObject.newCover).then((result: any) => {
      this.isSavingEventDesign = false;
      this.saveDesignShowSuccessMsg = true;
      setTimeout(() => {
        this.saveDesignShowSuccessMsg = false;
      }, 1000);

      // TODO: Delete old images from Firebase;
      let urlsToDelete = [];
      if(this.imgObject.oldIconUrl && this.imgObject.oldIconUrl !== '../../../../assets/img/no_img.png') {
        urlsToDelete.push(this.imgObject.oldIconUrl.split('?alt')[0].split('o/')[1].replace(/%2F/g, '/'));
      }

      if(this.imgObject.oldCoverUrl && this.imgObject.oldCoverUrl !== '../../../../assets/img/no_img.png') {
        urlsToDelete.push(this.imgObject.oldCoverUrl.split('?alt')[0].split('o/')[1].replace(/%2F/g, '/'));
      }

      component_this.dataService.deleteOldEventIconAndCoverImages(this.currentEventCode, urlsToDelete).then((result: any) => {

      }, (error: any) => {
        console.log(error);
      });

      this.clearEventImagesStatus();
    }, (error: any) => {
      console.log(error);
      this.isSavingEventDesign = false;
      this.saveDesignShowSuccessMsg = true;
      setTimeout(() => {
        this.saveDesignShowSuccessMsg = false;
      }, 1000);
    });
  }

  // ============================
  // HOME PAGE METHODS
  tabChanged(event) {
    
    if(event.index === 1) {
      this.dataService.getEventData(this.currentEventCode).then((resultSettings: any) => {
        this.eventSettings = resultSettings;

        this.dataService.getEventHomePageDesign(this.currentEventCode).then((resultHomeData: any) => {

          if(resultHomeData) {
            this.homePageData = resultHomeData;
          }
          this.stillLoadingHomePageContent = false;
        }, (error: any) => {
          console.log(error);
        });
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  saveHomePageData() {
    this.isSavingEventHomePage = true;
    let component_this = this;

    this.dataService.saveEventHomePageDesign(this.currentEventCode, this.homePageData, this.homePageCoverImageObject.newCover).then((result: any) => {

      this.isSavingEventHomePage = false;
      this.saveHomePageShowSuccessMsg = true;
      setTimeout(() => {
        this.saveHomePageShowSuccessMsg = false;
      }, 1000);
      
      if(this.homePageCoverImageObject.oldCover && this.homePageCoverImageObject.oldCover !== '../../../../assets/img/no_img.png') {
        let imgPath = this.homePageCoverImageObject.oldCover.split('?alt')[0].split('o/')[1].replace(/%2F/g, '/');
        
        component_this.dataService.deleteImage(imgPath).then((result: any) => {

        }, (error: any) => {
          console.log(error);
        });
      }

      // TODO: clear img obj variable
      this.homePageCoverImageObject = {
        newCover: null,
        oldCover: null
      };
    }, (error: any) => {
      console.log(error);
      this.isSavingEventHomePage = false;
      this.saveHomePageShowSuccessMsg = true;
      setTimeout(() => {
        this.saveHomePageShowSuccessMsg = false;
      }, 1000);
    });

  }

  getHomePageTitleForCurrentLang(lang) {

    if(typeof this.homePageData['title_tra'][lang] === 'undefined') {
      this.homePageData['title_tra'][lang] = '';
    }
    return this.homePageData['title_tra'][lang];
  }

  setHomePageTitleForCurrentLang(lang, value) {
    this.homePageData['title_tra'][lang] = value;
  }

  getHomePageDescriptionForCurrentLang(lang) {

    if(typeof this.homePageData['description_tra'][lang] === 'undefined') {
      this.homePageData['description_tra'][lang] = '';
    }
    return this.homePageData['description_tra'][lang];
  }

  setHomePageDescriptionForCurrentLang(lang, value) {
    this.homePageData['description_tra'][lang] = value;
  }

  getHomePageCustomHTMLForCurrentLang(lang) {

    if(typeof this.homePageData['customHtml_tra'][lang] === 'undefined') {
      this.homePageData['customHtml_tra'][lang] = '';
    }
    return this.homePageData['customHtml_tra'][lang];
  }

  setHomePageCustomHTMLForCurrentLang(lang, value) {
    this.homePageData['customHtml_tra'][lang] = value;
  }

  onHomePageCoverImageSelected(event) {
    this.uploadingNewHomePageCoverImage = true;

    if(event.target.files.length) {
      this.homePageCoverImageObject.newCover = event.target.files[0];
      this.homePageCoverImageObject.oldCover = this.homePageData.cover_img;

      let component_this = this;
      let reader = new FileReader();
      
      if (/^image\//i.test(event.target.files[0].type)) {
          reader.onloadend = function(e) {
            component_this.homePageData.cover_img = reader.result;
            component_this.uploadingNewHomePageCoverImage = false;
          }
          reader.onerror = function(error) {
            console.log(error);
            component_this.uploadingNewHomePageCoverImage = false;
          }
          reader.readAsDataURL(event.target.files[0]);
      } 
    } else {
      // console.log('Cancel HOME PAGE COVER IMG file upload!');
    }
  }



}


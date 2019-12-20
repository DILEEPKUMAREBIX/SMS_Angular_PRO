import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StrategyService } from './strategy-list.service';
// import { OrganisationService } from 'app/table-list/organisation.service';
// import { LoginService } from 'app/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganisationService } from '../organisation/organisation.service';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss']
})
export class StrategyListComponent implements OnInit {

  strategyObj: any = {};
  isNew
  manageStrategyHeading;
  animal: string;
  name: string;
  closeResult;
  strategies: any = [];
  organisations: any = [];

  @ViewChild('myInput', { static: false }) myInputVariable: any;

  constructor(public dialog: MatDialog, private modalService: NgbModal, private translate: TranslateService,
    private strategyService: StrategyService, private sanitizer: DomSanitizer, private organisationService: OrganisationService
    //, private loginService: LoginService
  ) {
    translate.setDefaultLang('en');

  }

  loadOrganisations() {
    this.organisationService.getAllOrganisations().subscribe(
      data => {
        this.organisations = data;
      },
      error => { }
    );
  }

  open(content, type: boolean, organisation?) {
    this.isNew = type;
    this.manageStrategyHeading = this.isNew
      ? "Create SMS Strategy"
      : "Update SMS Strategy";
    if (this.isNew) {
      this.clearOrganisation();
    } else {
      this.updateOrganisationFields(organisation);
    }
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "my-class"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnInit() {
    this.loadStrategies();
    this.loadOrganisations();
  }

  getimageBlobUrl(image) {
    let objectURL = 'data:image/png;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  base64data: any
  updateOrganisationFields(organisation) {
    let objectURL = 'data:image/png;base64,' + organisation.image;
    this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    console.log(this.imageBlobUrl)

    this.strategyObj["id"] = organisation.id;
    this.strategyObj["strNameEng"] = organisation.strNameEng;
    this.strategyObj["strNameAr"] = organisation.strNameAr;
    this.strategyObj["recordStatus"] = organisation.recordStatus;
    this.strategyObj["image"] = organisation.image;
    this.strategyObj["organisationId"] = organisation.organisationId;
  }

  clearOrganisation() {
    this.strategyObj["id"] = '';
    this.strategyObj["strNameEng"] = "";
    this.strategyObj["strNameAr"] = "";
    this.strategyObj["recordStatus"] = "";
  }

  deletionStr: any;
  openDelete(deleteConfirm, org) {
    this.deletionStr = org;
    this.modalService
      .open(deleteConfirm, {
        ariaLabelledBy: "modal-basic-title"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onDeleteConfirmation() {
    this.strategyService.deleteStrategy(this.deletionStr.id).subscribe(
      (data: any) => {
        this.loadStrategies();
        this.modalService.dismissAll("on fail");
      },
      error => { }
    );
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadStrategies() {
    this.strategyService.getAllStrategies().subscribe(
      data => {
        this.strategies = data;
        // this.filteredProfiles = this.profiles;
      },
      error => { }
    );
  }

  fileName = '';
  newProfileImage
  supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];
  setImage(files: FileList) {
    this.fileName = '';
    this.newProfileImage = null;
    let file = files.item(0);
    if (file && file.type) {
      if (0 > this.supportedFormats.indexOf(file.type)) {
        this.myInputVariable.nativeElement.value = "";
        // this.setMessage("Unsupported format trying to add. Supported formats are : .pdf, .jpg, .jpeg, .png", 'danger');
      }
      // else if (file.size >= 1048576) {
      //   this.myInputVariable.nativeElement.value = "";
      //   // this.setMessage("Maximum supported size is 1MB", 'danger');
      // }
      else {
        this.newProfileImage = file;
        this.fileName = file.name;
      }
    }
  }

  imageBlobUrl: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  saveOrUpdate() {
    // this.strategyService.createStrategy(this.strategyObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.modalService.dismissAll("on success");
    //     this.loadStrategies();
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     this.modalService.dismissAll("on fail");
    //   }
    // );

    // this.strategyObj['user'] = this.loginService.loggedInUser.id;
    this.strategyService.saveStrategyWithFile(this.strategyObj, this.newProfileImage).subscribe(
      (res: any) => {
        this.modalService.dismissAll("on success");
        this.loadStrategies();
      },
      err => {
        console.log("Error Adding the user: " + err.message);
      }
    );
  }

}

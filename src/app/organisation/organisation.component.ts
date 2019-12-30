import {
  Component, Inject,
  OnInit
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { UpgradeComponent } from '../upgrade/upgrade.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OrganisationService } from './organisation.service';
import { LoginService } from '../login/login.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
// import { LoginService } from '../login/login.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css'],
  entryComponents: [DialogueComponent]
})
export class OrganisationComponent implements OnInit {
  organisationObj: any = {};
  isNew
  manageOrganisationHeading
  animal: string;
  name: string;
  closeResult;
  organisations: any = [];

  constructor(public dialog: MatDialog, private modalService: NgbModal, private translate: TranslateService,
    private organisationService: OrganisationService
    , private loginService: LoginService
  ) {
    translate.setDefaultLang('en');

  }

  open(content, type: boolean, organisation?) {
    this.isNew = type;
    this.manageOrganisationHeading = this.isNew
      ? "Create SMS Organisation"
      : "Update SMS Organisation";
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
    this.loadOrganisations();
  }

  updateOrganisationFields(organisation) {
    this.organisationObj["id"] = organisation.id;
    this.organisationObj["orgNameEng"] = organisation.orgNameEng;
    this.organisationObj["orgNameAr"] = organisation.orgNameAr;
    this.organisationObj["recordStatus"] = organisation.recordStatus;
  }

  clearOrganisation() {
    this.organisationObj["id"] = '';
    this.organisationObj["orgNameEng"] = "";
    this.organisationObj["orgNameAr"] = "";
    this.organisationObj["recordStatus"] = "";
  }

  deletionOrg: any;
  openDelete(deleteConfirm, org) {
    this.deletionOrg = org;
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
    this.organisationService.deleteOrganisation(this.deletionOrg.id).subscribe(
      (data: any) => {
        this.loadOrganisations();
        this.modalService.dismissAll("on fail");
      },
      error => { }
    );
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOrganisations() {
    this.organisationService.getAllOrganisations().subscribe(
      data => {
        this.organisations = data;
        // this.filteredProfiles = this.profiles;
      },
      error => { }
    );
  }

  saveOrUpdate() {
    this.organisationObj['user'] = this.loginService.loggedInUser.id;
    this.organisationService.createOrganisation(this.organisationObj).subscribe(
      (data: any) => {
        console.log(data);
        this.modalService.dismissAll("on success");
        this.loadOrganisations();
      },
      (error: any) => {
        console.log(error);
        this.modalService.dismissAll("on fail");
      }
    );
  }
}

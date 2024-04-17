import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {Resume} from "../models/resume.model";
import {ResumeService} from "../services/resume.service";


@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {

  @Input() resumes: Resume[] = [];

  protected selectedIcon: string = "";
  protected iconOptions: string[] = ['fa fa-address-book', 'fa fa-briefcase', 'fa fa-graduation-cap', 'fa fa-user', 'fa fa-file-text', 'fa fa-globe', 'fa fa-rocket', 'fa fa-star', 'fa fa-heart'];


  constructor(private resumeService: ResumeService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getResumes().subscribe(resumes => {
      this.resumes = resumes;
    });
  }

  deleteResume(resume: Resume): void {
    if (resume.id) {
      this.resumeService.deleteResume(resume.id).subscribe(() => {
        // Remove resume with deleted id
        this.loadResumes();
      }, err => {
        console.log("Failed to delete", err);
      });
    }
  }

  createResume(): void {
    const newResume: Resume = {
      name: 'New Resume',
      icon: this.selectedIcon,
      page: []
    };
    this.resumeService.saveResume(newResume).subscribe((resumes) => {
      // Refresh the list after creation/update
      this.resumes = resumes;
    });
  }
}

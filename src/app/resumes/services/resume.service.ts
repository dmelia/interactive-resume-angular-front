import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Resume} from "../models/resume.model";

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:8080/api/resumes';

  constructor(private http: HttpClient) { }

  // Method to create/update a resume
  saveResume(resume: Resume): Observable<Resume[]> {
    return this.http.post<Resume[]>(this.apiUrl, resume);
  }

  // Method to get a list of resumes
  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.apiUrl);
  }

  // Method to get a single resume by ID
  getResumeById(resumeId: number): Observable<Resume> {
    const url = `${this.apiUrl}/${resumeId}`;
    return this.http.get<Resume>(url);
  }

  // Method to delete a resume by ID
  deleteResume(resumeId: number): Observable<any> {
    const url = `${this.apiUrl}/${resumeId}`;
    return this.http.delete<Object>(url);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Planning} from '../model/planning';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {OralDefense} from '../model/oral-defense';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


export class FileResponse {
  data: OralDefense[];
  errors;
}

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private readonly baseUrl = environment.app_url + '/plannings';

  private mPlanningSelected = new BehaviorSubject<Planning>(null);
  private mRevisionSelected = new BehaviorSubject<Planning>(null);

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>( environment.app_url + '/persons/' + this.authService.user.uid + '/plannings');
  }

  create(planning: Planning): Observable<Planning> {
    return this.httpClient.post<Planning>(this.baseUrl, planning);
  }

  update(planning: Planning): Observable<Planning> {
    return this.httpClient.put<Planning>(this.baseUrl, planning);
  }

  updateOralDefenses(id: number, oralDefenses: OralDefense[]): Observable<Planning> {
    return this.httpClient.put<Planning>(this.baseUrl + '/' + id + '/oraldefenses', oralDefenses);
  }

  findById(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/' + id);
  }

  findByName(planningName: string): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/find/' + planningName);
  }

  delete(id: number) {
    return this.httpClient.delete<any>(this.baseUrl + '/' + id);
  }

  uploadFile(file): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileResponse>(environment.app_url + '/upload/participants', formData);
  }

  getPlanningSelected(): Observable<Planning> {
    return this.mPlanningSelected.asObservable();
  }
  getRevisionSelected(): Observable<Planning> {
    return this.mRevisionSelected.asObservable();
  }

  setPlanningSelected(planning: Planning) {
    this.mPlanningSelected.next(planning);
  }

  setRevisionSelected(planning: Planning) {
    this.mRevisionSelected.next(planning);
  }

  exportToCsv() {
    const planning = this.mRevisionSelected.value;
    let csv = 'etudiant;email_etudiant;enseignant_referent;email_enseignant_referent;enseignant_second;email_enseignant_second;tuteur_entreprise;entreprise;date;heure_debut;heure_fin;salle\n';
    planning.oralDefenses.sort((a, b) => a.number < b.number ? -1 : 1);
    planning.oralDefenses.forEach(o => {
      let line = `${o.student.firstName} ${o.student.lastName.toUpperCase()};${o.student.email};` +
        `${o.followingTeacher.firstName} ${o.followingTeacher.lastName.toUpperCase()};${o.followingTeacher.email};`;
      if (o.secondTeacher) {
        line = line.concat(`${o.secondTeacher.firstName} ${o.secondTeacher.lastName.toUpperCase()};${o.secondTeacher.email};`);
      } else {
        line = line.concat(';;');
      }
      line = line.concat(
        `${o.tutorFullName};` +
        `${o.company};` +
        `${moment(o.timeBox.from).format('DD/MM/YYYY')};` +
        `${moment(o.timeBox.from).format('HH:mm')};` +
        `${moment(o.timeBox.to).format('HH:mm')};` +
        `${o.room.name}\n`);
      csv = csv.concat(line);
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    saveAs(blob, planning.name + '.csv');
  }

  exportToPdf() {
    const planning = this.mRevisionSelected.value;
    const doc = new jsPDF();
    const col = ['N°','Etudiant', 'Enseignant Référent', 'Enseignant en second', 'Tuteur entreprise', 'Entreprise', 'Date', 'Heure début', 'Heure fin', 'Salle'];
    const rows = [];

    planning.oralDefenses.sort((a, b) => a.number < b.number ? -1 : 1);

    planning.oralDefenses.forEach(o => {
      const line = [];
      line.push(o.number + 1);
      line.push(`${o.student.firstName} ${o.student.lastName.toUpperCase()}`);
      line.push(`${o.followingTeacher.firstName} ${o.followingTeacher.lastName.toUpperCase()}`);
      if (o.secondTeacher) {
        line.push(`${o.secondTeacher.firstName} ${o.secondTeacher.lastName.toUpperCase()}`);
      } else {
        line.push('Aucun');
      }
      line.push(o.tutorFullName);
      line.push(o.company);
      line.push(moment(o.timeBox.from).format('DD/MM/YYYY'));
      line.push(moment(o.timeBox.from).format('HH:mm'));
      line.push(moment(o.timeBox.to).format('HH:mm'));
      line.push(o.room.name);
      rows.push(line);
    });

    doc.autoTable(col, rows);
    doc.save(planning.name + '.pdf');
  }

  generate(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/' + id + '/generate');
  }

  getRevisions(id: number): Observable<Planning[]> {
    return this.httpClient.get<Planning[]>(this.baseUrl + '/' + id + '/revisions');
  }

  createRevision(id: number): Observable<Planning> {
    return this.httpClient.get<Planning>(this.baseUrl + '/' + id + '/createrevision');
  }

  updateDefaultRevision(id: number, revisionSelectedId: number | string): Observable<Planning> {
    return this.httpClient.put<Planning>(this.baseUrl + '/' + id + '/defaultrevision', revisionSelectedId);
  }
}

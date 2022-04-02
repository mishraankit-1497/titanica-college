import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../api/endpoints';
import { Student } from '../student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(ENDPOINTS.GET_ALL_STUDENTS);
  }

  addStudent(student: Student) {
    return this.http.post(ENDPOINTS.ADD_STUDENT, student);
  }

  updateStudent(id: any, data: any) {
    return this.http.put(ENDPOINTS.UPDATE_STUDENT + `/${id}`, data);
  }

  deleteStudent(id: Number) {
    return this.http.delete(ENDPOINTS.DELETE_STUDENT + `/${id}`);
  }
}

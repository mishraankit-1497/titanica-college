import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  lastNameValidation1,
  nameValidation1,
  rollNumberValidation,
} from 'src/app/inputValidation';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/student.model';
import { toastAlert } from '../toaster/toaster.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  studentForm!: FormGroup;
  semesters: any[] = [1, 2, 3, 4, 5, 6, 7, 8];
  branches: any[] = ['CSE', 'EEE', 'ECE', 'ME', 'CV', 'IT', 'AE'];
  activeBtn: string = 'Add';
  heading: string = 'Add Student';
  roll: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      rollNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      dob: ['', Validators.required],
    });
    console.log(this.studentForm);

    if (this.editData) {
      this.activeBtn = 'Update';
      this.heading = 'Update Details';
      this.studentForm.controls['rollNo'].setValue(this.editData.rollNo);
      this.studentForm.controls['firstName'].setValue(this.editData.firstName);
      this.studentForm.controls['lastName'].setValue(this.editData.lastName);
      this.studentForm.controls['branch'].setValue(this.editData.branch);
      this.studentForm.controls['semester'].setValue(this.editData.semester);
      this.studentForm.controls['dob'].setValue(this.editData.dob);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (!this.editData) {
        this.addStudent(this.studentForm.value);
      } else {
        this.updateStudent(this.editData.id, this.studentForm.value);
      }
    } else {
      toastAlert('error', 'Invalid form');
    }
  }

  addStudent(student: Student) {
    this.studentService.addStudent(student).subscribe(
      (data: any) => {
        this.studentForm.reset();
        toastAlert('success', 'Student added successfully');
        this.dialogRef.close('add');
      },
      (err) => {
        toastAlert('error', 'Something went wrong');
      }
    );
  }

  updateStudent(id: any, data: any) {
    this.studentService.updateStudent(id, data).subscribe(
      (data) => {
        this.studentForm.reset();
        toastAlert('success', 'Record has been updated');
        this.dialogRef.close('update');
      },
      (err) => {
        toastAlert('error', 'Something went wrong');
      }
    );
  }

  rollChange() {
    let returnedValue = rollNumberValidation(this.studentForm.value.rollNo);
    this.roll = returnedValue.res ? '' : returnedValue.error;
  }

  firstNameChange() {
    let returnedValue = nameValidation1(this.studentForm.value.firstName);
    this.firstName = returnedValue.res ? '' : returnedValue.error;
  }

  lastNameChange() {
    let returnedValue = lastNameValidation1(this.studentForm.value.lastName);
    this.lastName = returnedValue.res ? '' : returnedValue.error;
  }
}

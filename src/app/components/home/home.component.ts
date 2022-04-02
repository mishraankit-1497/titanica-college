import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from 'src/app/student.model';
import { Sort } from '@angular/material/sort';
import { toastAlert } from '../toaster/toaster.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  studentList: any[] = [];
  p: number = 1;
  studentSub!: Subscription;
  searchForm!: FormGroup;
  sortedData: Student[] = [];

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchRollNumber: [''],
      searchBranch: [''],
      searchSemester: [''],
    });
    this.getAllStudents();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'add') {
        this.getAllStudents();
      }
    });
  }

  openEditDialog(row: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'update') {
        this.getAllStudents();
      }
    });
  }

  getAllStudents(searchText?: any): any {
    this.studentSub = this.studentService.getAllStudents().subscribe(
      (data: any) => {
        if (!searchText) {
          this.studentList = data;
        } else {
          if (this.searchForm.value.search) {
            this.searchName(searchText, data);
          } else if (this.searchForm.value.searchRollNumber) {
            this.searchRollNo(searchText, data);
          } else if (this.searchForm.value.searchBranch) {
            this.searchBranch(searchText, data);
          } else {
            this.searchSemester(searchText, data);
          }
        }
      },
      (err) => toastAlert('error', 'Something went wrong!!')
    );
  }

  deleteStudent(id: Number) {
    this.studentService.deleteStudent(id).subscribe(
      (data) => {
        toastAlert('success', 'Record has been deleted');
        this.getAllStudents();
      },
      (err) => {
        toastAlert('error', 'Something went wrong');
      }
    );
  }

  onSubmit(searchText: string) {
    this.getAllStudents(searchText);
  }

  searchName(searchText: string, data: any) {
    searchText = searchText.toLocaleLowerCase();
    this.studentList = data.filter(
      (item: any) =>
        item.firstName.toLocaleLowerCase().includes(searchText) ||
        item.lastName.toLocaleLowerCase().includes(searchText)
    );
  }

  searchRollNo(searchText: string, data: any) {
    searchText = searchText.toLocaleLowerCase();
    console.log(searchText);
    this.studentList = data.filter((item: any) =>
      item.rollNo.toLocaleLowerCase().includes(searchText)
    );
  }

  searchBranch(searchText: string, data: any) {
    searchText = searchText.toLocaleLowerCase();
    this.studentList = data.filter((item: any) =>
      item.branch.toLocaleLowerCase().includes(searchText)
    );
  }

  searchSemester(searchText: Number, data: any) {
    searchText = Number(searchText);
    this.studentList = data.filter((item: any) => item.semester === searchText);
  }

  sortData(sort: Sort) {
    const data = this.studentList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.getAllStudents();
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'rollno':
          return this.compare(a.rollNo, b.rollNo, isAsc);
        case 'name':
          return this.compare(a.firstName, b.firstName, isAsc);
        case 'branch':
          return this.compare(a.branch, b.branch, isAsc);
        case 'semester':
          return this.compare(a.semester, b.semester, isAsc);
        case 'dob':
          return this.compare(a.dob, b.dob, isAsc);
        default:
          return 0;
      }
    });

    this.studentList = this.sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  logOut() {
    const isConfirmed = confirm('Do you want to log out?');
    if (isConfirmed) {
      this.router.navigate(['/login']);
      toastAlert('success', 'Logged out successfully')
    }
  }
  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Deparment {
  isEditable: boolean;
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

interface DepartmentsMap {
  [key: number]: Deparment;
}

@Component({
  selector: 'app-inline-editing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inline-editing.component.html',
  styleUrl: './inline-editing.component.css',
})
export class InlineEditingComponent implements OnInit {
  departments: Deparment[] = [];
  oldDepartments: DepartmentsMap = {};

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.http
      .get('https://projectapi.gerasim.in/api/Complaint/GetParentDepartment')
      .subscribe((res: any) => {
        this.departments = res?.data?.map((department: any) => ({
          ...department,
          isEditable: false,
        }));
        console.log(this.departments);
      });
  }
  cancelEdit(dept: Deparment, index: number) {
    if (dept.departmentId !== 0) {
      console.log('sjdfsdkjfsjkfjkshivam');
      console.log(this.oldDepartments, '---------->');
      dept.departmentName =
        this.oldDepartments[dept.departmentId].departmentName;
      dept.departmentLogo =
        this.oldDepartments[dept.departmentId].departmentLogo;
      dept.isEditable = false;
    } else {
      this.departments.splice(index, 1);
      // this.departments.shift();
    }
  }

  editDept(dept: Deparment) {
    this.oldDepartments[dept.departmentId] = structuredClone(dept);
    // this.oldDepartments = structuredClone(this.departments);
    console.log('DLKFGKLDKLGFKLDGLKDFLKGKLDKLGLKDF', dept);
    dept.isEditable = true;
  }

  deleteDept(dept: Deparment) {
    this.http
      .delete(
        'https://projectapi.gerasim.in/api/Complaint/DeletedepartmentByDepartmentId?departmentId=' +
          dept.departmentId
      )
      .subscribe((res: any) => {
        if (res?.result) {
          this.getData();
          confirm('Deleted Successfully!');
        } else {
          confirm('Failed to delete!' + res?.message);
        }
      });
  }

  updateDept(dept: Deparment) {
    if (dept.departmentId == 0) {
      this.http
        .post(
          'https://projectapi.gerasim.in/api/Complaint/AddNewDepartment',
          dept
        )
        .subscribe((res: any) => {
          if (res?.result) {
            this.getData();
            confirm('Added Successfully!');
          } else {
            confirm('Failed to add!' + res?.message);
          }
        });
    } else {
      this.http
        .post(
          'https://projectapi.gerasim.in/api/Complaint/UpdateDepartment',
          dept
        )
        .subscribe((res: any) => {
          if (res?.result) {
            this.getData();
            confirm('Updated Successfully!');
          } else {
            confirm('Failed to update!' + res?.message);
          }
        });
    }
  }

  addNew() {
    this.departments.unshift({
      departmentId: 0,
      departmentName: '',
      departmentLogo: '',
      isEditable: true,
    });
  }
}

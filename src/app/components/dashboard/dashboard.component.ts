import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  current = null
  allData: Employee[] = []
  option = 0
  field = 'id'
  searchInput = null
  searchInputMax = null
  fnameInput = ''

  toggle = [true, false, false, false, false, false]

  empForm: FormGroup
  editMode = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.allData = data;
    });
  }

  setFilter(filter?) {
    // for (let i = 0; i < 6; i++) {
    //   this.toggle[i] = false
    // }
    // this.toggle[this.option] = true
    // this.searchInput = null
    // switch (this.option) {
    //   case '0':
    //     this.field = 'id'; 
    //     break;
    //   case '1': this.field = 'firstName'; break;
    //   case '2': this.field = 'designation'; break;
    //   case '3': this.field = 'doj'; break;
    //   case '4': this.field = 'salary'; break;
    //   case '5': this.field = 'skills'; break;
    //   default: console.log('asdf')
    // }
    this.searchInput = null
    this.searchInputMax = null
    this.field = filter
}

  convertToArray(str) {
    return str.split(',')
  }

  initForm(user) {
    if (user) {
      this.empForm = new FormGroup({
        firstName: new FormControl(user.firstName, [Validators.required]),
        lastName: new FormControl(user.lastName, [Validators.required]),
        designation: new FormControl(user.designation, [Validators.required]),
        salary: new FormControl(user.salary, [Validators.required]),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        password: new FormControl(user.password, [Validators.required]),
        doj: new FormControl(user.doj, [Validators.required]),
        skills: new FormControl(user.skills, [Validators.required])
      })
    } else {
      this.empForm = new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        designation: new FormControl(null, [Validators.required]),
        salary: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        doj: new FormControl(null, [Validators.required]),
        skills: new FormControl(null, [Validators.required])
      })
    }
    console.log(this.empForm.value)
  }

  getRandom() {
    return (Math.random()*1000).toFixed(0)
  }

  setPassword(e) {
    this.empForm.controls['password'].setValue(`${e.target.value.toLocaleLowerCase()}#${this.getRandom()}`)
  }

  setMaxInput() {
    this.searchInputMax = this.searchInput
  }

  addEmp() {
    this.empForm.controls['skills'].setValue(this.convertToArray(this.empForm.controls.skills.value));
    if (this.empForm.valid) {
      this.employeeService.addEmployee(this.empForm.value).subscribe(res => {
        alert('New User Added')
        this.editMode = false
      })
    }
  }

  editEmp(user) {
    console.log(user)
    this.current = user
    this.initForm(user)
    this.editMode = true
  }

  saveEdit() {
    this.empForm.controls['skills'].setValue(this.convertToArray(this.empForm.controls.skills.value.toString()));
    if (this.empForm.valid) {
      this.employeeService.updateEmployee({ ...this.empForm.value, id: this.current.id }).subscribe(res => {
        alert('Employee Updated!!')
        this.editMode = false
      })
    }
  }

  deleteEmp(user) {
    if (confirm(`Are you sure to delete -\nId: ${user.id}\nName: ${user.firstName} ${user.lastName}`)) {
      this.employeeService.deleteEmployee(user.id).subscribe(res => {
        alert('Employee Deleted')
      })
    } else { }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = null;
  editForm: FormGroup

  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.isUser.subscribe(val => {
      if (val) {
        this.empService.getSingleUser(JSON.parse(localStorage.getItem('presentUser')).id).subscribe(data => {
          this.user = data
        })
      } else {
        this.user = null
      }
    })
    this.empService.getSingleUser(JSON.parse(localStorage.getItem('presentUser')).id).subscribe(data => {
      this.user = data
    })
  }

  convertToArray(str) {
    return str.split(',')
  }

  editUser() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      skills: new FormControl(this.user.skills.toString(), [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required])
    })
  }

  editInfo() {
    if (this.editForm.valid) {
      this.editForm.controls['skills'].setValue(this.convertToArray(this.editForm.controls.skills.value));
      this.empService.updateEmployee({
        ...this.user, 
        skills: this.editForm.controls.skills.value,
        password: this.editForm.controls.password.value
      }).subscribe(res => {
        alert('Profile Updated!!')
      })
    }
  }

  logout() {
    this.empService.logout()
  }

}

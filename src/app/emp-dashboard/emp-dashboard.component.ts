import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

  constructor(private empService: EmployeeService) { }

  allData = null
  option = 0
  field = 'id'
  searchInput = null

  toggle = [true, false, false, false, false]

  user = null

  ngOnInit(): void {
    this.empService.getPresentUser().subscribe(data => {
      this.user = data
    });
    this.empService.getAllEmployees().subscribe(data => {
      this.allData = data;
    });
  }

  setFilter(filter) {
    // for (let i = 0; i < 5; i++) {
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
    //   default: console.log('asdf')
    // }
    this.searchInput = null
    this.field = filter
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
employeeForm: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    /// with form group and form control
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl,
    //   email: new FormControl,
    //   skills: new FormGroup({
    //     skillName: new FormControl,
    //     experience: new FormControl,
    //     rating: new FormControl 
    //   })
    // }) 
    //with form builder class
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experience: [''],
        rating: ['']
      })
    }) 
  }
 onSubmit(): void {
   console.log(this.employeeForm);
}
 onLoadClick(): void {
  this.employeeForm.setValue({
   fullName: 'Ankur',
   email: 'amkur@gmail.com',
   skills: {
    skillName: 'C++',
    experience: '5',
    rating: 'beginner'
  }
 });
 }
}

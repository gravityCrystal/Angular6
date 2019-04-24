import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.scss"]
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    /// First way of creating forms

    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName : new FormControl(),
    //     proficiency: new FormControl(),
    //     experienceInYears : new FormControl()
    //   })
    // })

    // USing formbuilder to create froms
    this.employeeForm = this.formBuilder.group({
      fullName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ],
      email: ["", [Validators.email, Validators.maxLength(30)]],
      skills: this.formBuilder.group({
        skillName: ["", [Validators.required]],
        experienceInYears: ["7", [Validators.required]],
        proficiency: ["beginner", [Validators.required]]
      })
    });

    // subscribing to chnage s\i values of input boxees
    // this.employeeForm.valueChanges.subscribe(value =>{
    //   console.log(JSON.stringify(value));
    // })
  }

  intializeErrors () {
    let formErrors= {
      'fullName':'',
      'email':'',
      'skillName':'',
      'experienceInYears': '',
      'proficiency': ''
    }
    let validationMessages ={
      'fullName': {
        'required': 'Enter fullName',
        'minLength':'6',
        'maxLength':'10'
      },
      'email': {
        'required': 'Enter email'
      },
      'skillName': {
        'required': 'Enter skill'
      },
      'proficiency': {
        'required': 'Enter proficiemncy'
      },
      'experienceInYears': {
        'required':'Enter experince'
      }
    }
  }

  onSubmit() {
    // console.log(this.employeeForm.get('fullName').value, this.employeeForm.controls.fullName.value);
    console.log(this.employeeForm.value,
      this.employeeForm.get('fullName').errors);
  }
  loadData() {
    this.employeeForm.setValue({
      fullName: "Ankur",
      email: "sharma@gmail.com",
      skills: {
        experienceInYears: 5,
        proficiency: "beginner",
        skillName: "C++"
      }
    });
  }


  checkData (){
    this.employeeForm.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

  logAllData(group:FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logAllData(abstractControl);
        // console.log('Key' +key, 'Value--', abstractControl.value)
      }else {
        console.log('Key--' +key, 'Value--', abstractControl.value)
      }
    });
  }

}

import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { CustomEmailvalidator } from '../../custom.validator'

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.scss"]
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  validationMessages = {
    fullName: {
      required: "Enter fullName",
      minlength: "Enter at least 3 characters",
      maxlength: "Max 10 characters accepted"
    },
    email: {
      required: "Enter email",
      email: "Enter a valid email",
      emailDomain: "Domain should dell.com"
    },

    skillName: {
      required: "Enter skill"
    },
    proficiency: {
      required: "Enter proficiemncy"
    },
    experienceInYears: {
      required: "Enter experince"
    }
  };
  formErrors = {
    fullName: "",
    email: "",
    skillName: "",
    experienceInYears: "",
    proficiency: ""
  };
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
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(30),
          CustomEmailvalidator.emailDomain('dell.com')
        ]
      ],
      skills: this.formBuilder.array([
        this.addSkillGroup()      
      ])
    });

    // subscribing to chnage s\i values of input boxees
    this.employeeForm.valueChanges.subscribe(value => {
      // console.log(JSON.stringify(value));
      this.logValidationData(this.employeeForm);
    });
  }
  addSkillGroup(): FormGroup {
    return this.formBuilder.group({
      skillName: ["", [Validators.required]],
      experienceInYears: ["", [Validators.required]],
      proficiency: ["", [Validators.required]]
    });
  }
  addSkill( ): void {
  (<FormArray>this.employeeForm.get('skills')).push(this.addSkillGroup());
  }
  onSubmit() {
    // console.log(this.employeeForm.get('fullName').value, this.employeeForm.controls.fullName.value);
    // console.log(this.employeeForm.value,
    //   this.employeeForm.get('fullName').errors);
  }
  loadData() {
    // this.employeeForm.setValue({
    //   fullName: "Ankur",
    //   email: "sharma@gmail.com",
    //   skills: {
    //     experienceInYears: 5,
    //     proficiency: "beginner",
    //     skillName: "C++"
    //   }
    // });
    this.employeeForm.setValue({
      fullName: "",
      email: "",
      skills: {
        experienceInYears: "",
        proficiency: "",
        skillName: ""
      }
    });
  }

  checkData() {
    this.employeeForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  logValidationData(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
     
        this.formErrors[key] = "";
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const validationMessages = this.validationMessages[key];
          // console.log(validationMessages);
          // console.log(abstractControl.errors);
          for (const errorKey in abstractControl.errors) {
            this.formErrors[key] += validationMessages[errorKey] + "  ";
          }
        }


        if (abstractControl instanceof FormGroup) {
          this.logValidationData(abstractControl);
          // console.log('Key' +key, 'Value--', abstractControl.value)
        }

        if (abstractControl instanceof FormArray) {
          for (const control of abstractControl.controls) {
            if (control instanceof FormGroup) {
              this.logValidationData(control); 
            }
          }
          // console.log('Key' +key, 'Value--', abstractControl.value)
        }
      
    });
    console.log(this.formErrors, "----");
  }
}


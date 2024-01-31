import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  public mainForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {

    this.mainForm = this.fb.group({
      firstname: ['', [ Validators.required, Validators.maxLength(20)]],
      lastname: ['', [ Validators.required, Validators.maxLength(20)]],
      middlename: ['', [Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(50)]],
      gender: ['', Validators.required],
      addressForm: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(20)]],
        landmark: ['', [Validators.maxLength(20)]],
        state: ['', [Validators.required, Validators.maxLength(20)]],
        city: ['', [Validators.maxLength(20)]],
        zipcode: ['', [Validators.required, Validators.maxLength(20)]],
        country: ['', [Validators.required, Validators.maxLength(20)]]
      }),
      hobbies: this.fb.array([ this.createHobbyGroup() ])
    })
  }

  public get hobbies() : FormArray {
    return this.mainForm.get('hobbies') as FormArray;
  }

  public onSubmit() : void {
    if (this.mainForm.valid) {
      window.alert(
        JSON.stringify(
          this.mainForm.value,
          null,
          2));
    } else {
      window.alert('Form is invalid');
    }
  }

  public createHobbyGroup() : FormGroup {
    return this.fb.group({ 
      name: ['', Validators.maxLength(20)]
    })
  }

  public addHobbyField() : void {
    this.hobbies.push(this.createHobbyGroup());
  }

}

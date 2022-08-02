import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-emploees',
  templateUrl: './emploees.component.html',
  styleUrls: ['./emploees.component.scss'],
})
export class emploeesComponent implements OnInit {
  emploeeData: Array<any> = [];
  editUser: boolean = false;
  userId = '';
  tech_stack:any = [
    { name: 'HTML', value: 'HTML' },
    { name: 'Css', value: 'Css' },
    { name: 'Java Script', value: 'Java Script' },
    { name: 'Type Script', value: 'Type Script' },
    { name: 'React.JS', value: 'React.JS' },
    { name: 'Gatsby.JS', value: 'Gatsby.JS' },
    { name: 'Angular', value: 'Angular' },
  ];
  emploeeForm = new FormGroup({
    id: new FormControl(''),
    full_name: new FormControl(''),
    company_name: new FormControl(''),
    timing: new FormControl(''),
    tech_stack: this.formBuilder.array([]),
  });

  constructor(
    public HttpApiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  onChange = (e: any) => {
    const techFormArray: FormArray = this.emploeeForm.get('tech_stack') as FormArray;
    if (e.target.checked) {
      techFormArray.push(new FormControl(e.target.value));
    } else {
      let index = techFormArray.controls.findIndex((x) => x.value == e.target.value);
      techFormArray.removeAt(index);
    }
    this.getApi();
  };

  getApi() {
    this.HttpApiService.getUser().subscribe((data: any) => {
      this.emploeeData = data;
    });
  }

  adduser() {
    this.HttpApiService.addUser(this.emploeeForm.value).subscribe(() => {
      this.getApi();
      this.emploeeForm.reset();
    });
  }

  getOneUser(id: any) {
    this.editUser = true;
    this.HttpApiService.getOneUser(id).subscribe((data: any) => {
      this.userId = data.id;
      this.emploeeForm.setValue({
        title: data.title,
        description: data.description,
        published: data.published.toString(),
      });
    });
  }

  updateUser(id: any) {
    this.HttpApiService.updateUser(id, this.emploeeForm.value).subscribe(() => {
      this.getApi();
      this.emploeeForm.reset();
    });
    this.editUser = false;
  }

  deleteUser(id: any) {
    this.HttpApiService.deleteUser(id).subscribe(() => {
      this.getApi();
    });
  }

  ngOnInit(): void {}
}

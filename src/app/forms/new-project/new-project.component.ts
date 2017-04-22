import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  form: FormGroup;
  nameCtrl: FormControl;
  repoCtrl: FormControl;
  i18ndirCtrl: FormControl;
  sourceCtrl: FormControl;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  onAdd() {

  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private createForm() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.repoCtrl = new FormControl('', Validators.required);
    this.i18ndirCtrl = new FormControl('', Validators.required);
    this.sourceCtrl = new FormControl('', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl,
      repo: this.repoCtrl,
      i18ndir: this.i18ndirCtrl,
      source: this.sourceCtrl
    });
  }
}

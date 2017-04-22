import { ProjectsService } from './../../services/projects.service';
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
  iconCtrl: FormControl;
  nameCtrl: FormControl;
  repoCtrl: FormControl;
  i18ndirCtrl: FormControl;
  sourceCtrl: FormControl;

  defaultIcon = 'favorite';
  defaultName = 'SimmageUI';
  defaultRepo = 'actimeo/simmage-ui';
  defaultI18ndir = 'src/i18n';
  defaultSource = 'messages.xlf';

  constructor(private fb: FormBuilder, private router: Router, private projects: ProjectsService) { }

  ngOnInit() {
    this.createForm();
  }

  onAdd() {
    this.projects.add({
      icon: this.iconCtrl.value,
      name: this.nameCtrl.value,
      repo: this.repoCtrl.value,
      i18ndir: this.i18ndirCtrl.value,
      source: this.sourceCtrl.value
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private createForm() {
    this.iconCtrl = new FormControl(this.defaultIcon, Validators.required);
    this.nameCtrl = new FormControl(this.defaultName, Validators.required);
    this.repoCtrl = new FormControl(this.defaultRepo, Validators.required);
    this.i18ndirCtrl = new FormControl(this.defaultI18ndir, Validators.required);
    this.sourceCtrl = new FormControl(this.defaultSource, Validators.required);
    this.form = this.fb.group({
      icon: this.iconCtrl,
      name: this.nameCtrl,
      repo: this.repoCtrl,
      i18ndir: this.i18ndirCtrl,
      source: this.sourceCtrl
    });
  }
}

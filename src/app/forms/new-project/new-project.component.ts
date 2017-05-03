import { Translation } from './../../models/translation';
import { Project } from './../../models/project';
import { ProjectsService } from './../../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  public project: Project;

  form: FormGroup;
  iconCtrl: FormControl;
  nameCtrl: FormControl;
  repoCtrl: FormControl;
  i18ndirCtrl: FormControl;
  sourceCtrl: FormControl;
  translationsCtrl: FormControl;

  defaultIcon = 'favorite';
  defaultName = 'translator';
  defaultRepo = 'feloy/angular-translator';
  defaultI18ndir = 'src/i18n-xmb';
  defaultSource = 'messages.xmb';
  defaultTranslations = `messages.fr.xmb
messages.en.xmb`;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private projects: ProjectsService) { }

  ngOnInit() {
    this.route.data.pluck('project').subscribe((p: Project) => {
      this.project = p;
      this.createForm(p);
    });
  }

  onAdd() {
    const id = this.projects.add({
      icon: this.iconCtrl.value,
      name: this.nameCtrl.value,
      repo: this.repoCtrl.value,
      i18ndir: this.i18ndirCtrl.value,
      source: this.sourceCtrl.value,
      translations: this.translationsCtrl.value.split('\n')
    });
    this.router.navigate(['/project', id]);
  }

  onSave() {
    console.log(this.translationsCtrl.value);
    this.projects.update(this.project.id, {
      icon: this.iconCtrl.value,
      name: this.nameCtrl.value,
      repo: this.repoCtrl.value,
      i18ndir: this.i18ndirCtrl.value,
      source: this.sourceCtrl.value,
      translations: this.translationsCtrl.value.split('\n')
    });
    this.router.navigate(['/project', this.project.id]);
  }

  onCancel() {
    if (this.project) {
      this.router.navigate(['/project', this.project.id]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onDelete() {
    this.projects.delete(this.project.id);
    this.router.navigate(['/']);
  }

  private createForm(p: Project) {
    this.iconCtrl = new FormControl(p ? p.icon : this.defaultIcon, Validators.required);
    this.nameCtrl = new FormControl(p ? p.name : this.defaultName, Validators.required);
    this.repoCtrl = new FormControl(p ? p.repo : this.defaultRepo, Validators.required);
    this.i18ndirCtrl = new FormControl(p ? p.i18ndir : this.defaultI18ndir, Validators.required);
    this.sourceCtrl = new FormControl(p ? p.source : this.defaultSource, Validators.required);
    this.translationsCtrl = new FormControl(p ? p.translations.join('\n') : this.defaultTranslations, Validators.required);
    this.form = this.fb.group({
      icon: this.iconCtrl,
      name: this.nameCtrl,
      repo: this.repoCtrl,
      i18ndir: this.i18ndirCtrl,
      source: this.sourceCtrl,
      translations: this.translationsCtrl
    });
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent {

  usuario: any = {
    nome: 'loiane',
    email: 'loiane@email.com'
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }
}

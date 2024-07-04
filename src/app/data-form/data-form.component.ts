import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
})
export class DataFormComponent {
  public formulario: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    //construtor de formulário
    this.formulario = this.formBuilder.group({
      nome: [''],
      email: [''],
    });
  }

  public onSubmit() {
    console.log(this.formulario);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.formulario.value)) //emular sem ter um servidor pronto
      .subscribe((dados) => {
        console.log(dados);
        this.formulario.reset({
          nome: '',
          email: '',
        });
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services//person.service';
import { AlertService } from '../../services//alert.service';

@Component({
  selector: 'app-craete',
  templateUrl: './craete.component.html',
  styleUrls: ['./craete.component.css']
})
export class CraeteComponent implements OnInit {

  errorMsg: string;
  form: FormGroup;
  personID: any;
  itemPerson: any;
  constructor(private builder: FormBuilder,
    private router: Router,
    private productSV: PersonService,
    private activatedRouter: ActivatedRoute,
    private alertSV: AlertService) {
    this.initialCreateFromDate()
  }

  ngOnInit() {
  }
  private initialCreateFromDate() {
    this.form = this.builder.group({
      INITIAL_CODE: ['', [Validators.required]],
      NAME: ['', [Validators.required]],
      LASTNAME: ['', [Validators.required]],
      GENDER: ['', [Validators.required]],
      AGE: ['', [Validators.required]],
      PERSION_NUMBER: ['']
    });
  }

  onSubmit() {

    console.log(this.form.value);
    const patt = /^[a-zA-Z ก-ฮ]{2,3000}$/;
    const chk = /^[1-9]{1,100}$/;
    if (this.form.invalid) {
      console.log('ข้อมูลไม่ครบ');
      alert('ข้อมูลไม่ครบ');
    } else if (patt.test(this.form.get('NAME').value) === false) {
      console.log('NAME ผิดพลาด');
      alert('NAME ผิดพลาด');
    } else if (patt.test(this.form.get('LASTNAME').value) === false) {
      console.log('LASTNAME ผิดพลาด');
      alert('LASTNAME ผิดพลาด');
    } else if (chk.test(this.form.get('AGE').value) === false) {
      console.log('AGE ผิดพลาด');
      alert('AGE ผิดพลาด');
    }
    else {
      this.productSV
        .CreatePersonl(JSON.stringify(this.form.value))
        .then(res => {
          this.alertSV.notify('เพิ่มข้อมูลเรียบร้อยแล้ว', 'success')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);

    }
  }
}

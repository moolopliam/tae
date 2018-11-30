import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BMIService } from '../Services/bmi.service';
import { AlertService } from '../Services/alert.service';
import { PersonService } from '../Services/person.service';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BMIComponent implements OnInit {

  errorMsg: string;
  form: FormGroup;
  personID: any;
  itemBMI: any;
  itemPerson: any;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private BmiSV: BMIService,
    private alertS: AlertService,
    private activatedRouter: ActivatedRoute,
    private productSV: PersonService
  ) {
    this.initialCreateFromDate(),
      this.activatedRouter.params.forEach(
        params => {
          this.personID = params.id;
          this.form.controls['PERSION_CODE'].setValue(this.personID);
          console.log(this.personID);
        })
  }

  ngOnInit() {
  }

  private initialCreateFromDate() {
    this.form = this.builder.group({
      PERSION_CODE: ['', [Validators.required]],
      WAIST: '',
      HEIGHT: ['', [Validators.required]],
      WEIGHT: ['', [Validators.required]],
      RESULT: '',
      CODE: ['']
    });
  }


  onSubmit() {
    const chk = /^[0-9]{1,300}$/;
    if (this.form.invalid) {
      console.log(this.form.value);
      this.alertS.notify('ข้อมูลไม่ครบ', 'error');
    } else if (Number(this.form.get('WEIGHT').value) <= 0
      || Number(this.form.get('WEIGHT')) === NaN) {
      this.alertS.notify('น้ำหนักไม่ถูกต้อง', 'error');
    } else if (Number(this.form.get('HEIGHT').value) <= 0
      || Number(this.form.get('HEIGHT')) === NaN) {
      this.alertS.notify('ส่วนสูงไม่ถูกต้อง', 'error');
    } else if (chk.test(this.form.get('HEIGHT').value) === false) {
      this.alertS.notify('ส่วนสูงไม่ถูกต้อง', 'error');
    } else if (chk.test(this.form.get('WEIGHT').value) === false) {
      this.alertS.notify('น้ำหนักไม่ถูกต้อง', 'error');
    }
    else {
      const weigth = Number(this.form.get('WEIGHT').value);
      const heigth = Number(this.form.get('HEIGHT').value);
      this.form.controls['RESULT'].setValue(Math.round(weigth / Math.pow(heigth * 0.01, 2)));
      console.log(this.form.value);
      this.BmiSV
        .CreateBMI(JSON.stringify(this.form.value))
        .then(res => {
          this.router.navigate(['/', 'home']);
          this.alertS.notify('เพิ่มข้อมูลสำเร็จ', 'success');
        })
        .catch(err => this.errorMsg = err);
    }
  }
}









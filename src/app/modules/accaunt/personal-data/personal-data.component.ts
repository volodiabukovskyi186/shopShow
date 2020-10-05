import {Component, OnInit} from '@angular/core';
import {AccauntService} from '../accaunt.service';
import jwt_decode from "jwt-decode";
import { PersonalDataService } from '../personal-data/services/personal-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
    personStatus = false;
    public userId: number;
    public personalDataForm: FormGroup;
    public isSaveClickedBtn: boolean = true;
    public userPersonalDataToUpdate: any;
    public isCancelClickedBtn: boolean = true;

    constructor(
        public accaunt: AccauntService,
        public personalDataService: PersonalDataService
    ) {}

    ngOnInit(): void {
        this.getUserAccauntData();
        this.generatepersonalDataForm();
    }

    public getUserAccauntData(): void {
        this.accaunt.getUser().subscribe((data) => {
            this.userId = data.data.user.id;

            this.accaunt.current = data.data;
            this.accaunt.onCurrent();
        });
    }

    public generatepersonalDataForm(): void {
        this.personalDataForm = new FormGroup({
            firstName: new FormControl('', []),
            lastName: new FormControl('', []),
            email: new FormControl('', []),
            phone: new FormControl('', []),
            country: new FormControl('', []),
            city: new FormControl('', []),
            detailsForTheCourierOne: new FormControl('', []),
            detailsForTheCourierTwo: new FormControl('', [])
        });
    }

    changeStatus() {
        const data = this.personalDataForm.value;

        this.userPersonalDataToUpdate = {
            role_id: 3,
            id: this.userId,
            email: data.email,
            permissions: [],
            first_name: data.firstName,
            last_name: data.lastName,
            tel: data.phone,
            city: data.city,
            country: data.country,
            delivery_adress: `${data.detailsForTheCourierOne} ${data.detailsForTheCourierTwo}`
        }

        // console.log(data);
        // console.log(this.userPersonalDataToUpdate);

        if (this.personStatus) {
            console.log('this.personStatus', this.personStatus);

            this.personalDataService.updateUserPersonalDataByUserId(this.userId, this.userPersonalDataToUpdate).subscribe((res) => {
                console.log(res);
                this.getUserAccauntData();
            })
        }
  
        this.personStatus == false ? this.personStatus = true : this.personStatus = false;
    }

}

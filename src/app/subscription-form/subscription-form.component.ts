import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubsrcibersService } from '../services/subsrcibers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  isDuplicateEmail: boolean = false;
  isSub: boolean = false;
  constructor(private subService: SubsrcibersService) {}

  handleSubscriptionFormSubmit(subForm: any) {
    const subData: Sub = {
      name: subForm.value.name,
      email: subForm.value.email,
    };
    this.isDuplicateEmail = this.subService.addSubs(subData);
    if (this.isDuplicateEmail) {
      this.isSub = false;
    } else {
      this.isSub = true;
    }
    subForm.reset();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalAbcComponent } from '../modal-abc/modal-abc.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router,public modalController: ModalController) {}
  login() {
    this.router.navigateByUrl('login');
  }

  music() {
    this.router.navigateByUrl('music');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalAbcComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  
  
}

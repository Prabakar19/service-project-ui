import { NgModule } from '@angular/core';
import { FooterComponent } from 'src/app/components/nav-bar/footer/footer.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { AppMaterialModule } from '../../app-material/app-material.module';

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [AppMaterialModule],
  exports: [],
})
export class NavBarModule {}

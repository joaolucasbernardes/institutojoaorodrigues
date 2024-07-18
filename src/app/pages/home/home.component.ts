import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { OInstitutoComponent } from '../../components/o-instituto/o-instituto.component';
import { MetodologiaComponent } from '../../components/metodologia/metodologia.component';
import { ParceirosComponent } from '../../components/parceiros/parceiros.component';
import { SejaDoadorComponent } from '../../components/seja-doador/seja-doador.component';
import { SobreJoaoComponent } from '../../components/sobre-joao/sobre-joao.component';
import { SobreOProjetoComponent } from '../../components/sobre-oprojeto/sobre-oprojeto.component';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent, 
    OInstitutoComponent,
    MetodologiaComponent, 
    ParceirosComponent, 
    SejaDoadorComponent, 
    SobreJoaoComponent,
    SobreOProjetoComponent,
    TracadoBackgroundComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // DIRECIONADOR DE SEÇÃO
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

}

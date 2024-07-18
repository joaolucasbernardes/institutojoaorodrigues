import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { ScrollToTopService } from '../../services/scroll-to-top.service';
import { SharedDataService } from '../../services/valor-doacao.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-escolher-valor',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './escolher-valor.component.html',
  styleUrls: ['./escolher-valor.component.css'],
  providers: [provideNgxMask()]
})
export class EscolherValorComponent implements OnInit {
  valor: number | null = null;
  inputValue: number | null = null;
  radioSelected: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
    private scrollService: ScrollToTopService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}

  onInputChange(event: any) {
    if (event.target && event.target.value !== '') {
      const rawValue = event.target.value.replace('R$ ', '').replace(',00', '').replace('.', '');
      this.inputValue = parseFloat(rawValue);
      this.sharedDataService.changeInputValue(this.inputValue);
      this.radioSelected = true;
    }
  }

  onRadioChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'custom') {
      this.valor = null;
      this.inputValue = null;
      this.radioSelected = true;
    } else {
      this.valor = parseFloat(selectedValue);
      this.inputValue = null;
      this.radioSelected = true;
    }
  }

  validarEscolha() {
    if (this.radioSelected && (this.valor !== null || (this.inputValue !== null && this.inputValue > 0))) {
      const valorFinal = this.valor !== null ? this.valor : this.inputValue;
      this.sharedDataService.changeInputValue(valorFinal!);

      if (valorFinal! >= 0 && valorFinal! <= 0) {
        this.radioSelected = false;
      }
    } else {
      alert('Por favor, selecione um valor ou insira um valor válido.');
      return;
    }

    if (this.inputValue! >= 0) {
      this.authGuard.setAccessAllowed(true);
      this.router.navigate(['/pf']);
    } 
  }

  ngOnInit() {
    this.scrollService.initialize();
  }
}
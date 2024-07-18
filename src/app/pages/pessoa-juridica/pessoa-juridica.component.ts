import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SharedDataService } from '../../services/valor-doacao.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyPipe, CommonModule } from '@angular/common';

declare var bootstrap: any; // Declaração do objeto bootstrap

@Component({
  selector: 'app-pessoa-juridica',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TracadoBackgroundComponent,
    CarouselComponent,
    CommonModule,
    NgxMaskDirective,
  ],
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css'],
  providers: [provideNgxMask(), CurrencyPipe],
})
export class PessoaJuridicaComponent implements OnInit, AfterViewInit {
  nome: string = '';
  email: string = '';
  telefone: string = '';
  cnpj: string = '';
  nomeFantasia: string = '';
  razaoSocial: string = '';
  inscricaoEstadual: string = '';

  inputValue: number = 0;
  valorDaDoacao: number = 0;
  totalDaDoacao: number = 0;
  incluirTaxas: boolean | null = null;

  aceitoReceberInformacoes: boolean = false;
  aceitoPoliticaPrivacidade: boolean = false;
  isentoInscricaoEstadual: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedDataService.currentInputValue.subscribe((value) => (this.inputValue = value));
    this.calcularValores();
  }

  ngAfterViewInit() {
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
      toastContainer.addEventListener('hidden.bs.toast', function (event) {
        if (event.target) {
          toastContainer.removeChild(event.target as HTMLElement);
        }
      });
    }
  }

  calcularValores() {
    this.valorDaDoacao = this.inputValue;
    if (this.incluirTaxas === true) {
      this.totalDaDoacao = this.valorDaDoacao * 1.0099; // 0.99% de taxa
    } else {
      this.totalDaDoacao = this.valorDaDoacao;
    }
  }

  continuar() {
    if (!this.nome || !this.email || !this.cnpj || !this.telefone || !this.nomeFantasia || !this.razaoSocial) {
      this.showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (this.incluirTaxas === null) {
      this.showToast('Por favor, selecione uma opção para as taxas de transação.');
      return;
    }

    if (!this.aceitoPoliticaPrivacidade) {
      this.showToast('Por favor, marque a caixa dos termos de políticas de privacidade, se concordar.');
      return;
    }
    this.showToast('Doação concluída com sucesso!', 'success');
    setTimeout(() => {
      this.router.navigate(['/comprovante']); // Redireciona para a página inicial após 2 segundos
    }, 3000);
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') ?? '';
  }

  showToast(message: string, type: string = 'danger') {
    const toastContainer = document.getElementById('toastContainer');

    if (toastContainer) {
      const toastElement = document.createElement('div');
      toastElement.className = `toast align-items-center text-bg-${type} border-0`;
      toastElement.role = 'alert';
      toastElement.ariaLive = 'assertive';
      toastElement.ariaAtomic = 'true';

      toastElement.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

      toastContainer.appendChild(toastElement);

      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}

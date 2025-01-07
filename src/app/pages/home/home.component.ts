import { Component, HostListener, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  companies: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  isMobile: boolean = false;

  constructor(
    private empresaService: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  /**
   * Método para carregar empresas da API
   */
  loadCompanies(): void {
    this.isLoading = true;

    this.empresaService.getEmpresas().subscribe({
      next: (data) => {
        this.companies = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar empresas. Tente novamente mais tarde.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

   /**
   * Detecta se a tela é de um dispositivo móvel
   */
   @HostListener('window:resize', [])
   detectScreenSize(): void {
     this.isMobile = window.innerWidth <= 576; // Tamanho de tela <= 576px é considerado mobile
   }

  // Método para agrupar empresas em lotes para o carrossel
  groupCompanies(companies: any[], groupSize: number): any[][] {
    const groups = [];
    for (let i = 0; i < companies.length; i += groupSize) {
      groups.push(companies.slice(i, i + groupSize));
    }
    return groups;
  }

  // Redirecionar para a página da empresa
  goToCompany(companyId: number): void {
    this.router.navigate(['/company', companyId]);
  }

}

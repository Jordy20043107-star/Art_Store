import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  // Cambiamos selectores ID frágiles por roles accesibles
  private readonly createAccountLink = () => this.page.getByText('No account? Create one here');
  private readonly emailInput = () => this.page.getByRole('textbox', { name: 'Email', exact: true });
  private readonly createAccountButton = () => this.page.getByRole('button', { name: 'Create an account' });
  private readonly saveButton = () => this.page.getByRole('button', { name: 'Save' });

  constructor(page: Page) {
    super(page);
  }

  async goToCreateAccount() {
    await this.createAccountLink().click();
  }

  async enterEmailForAccountCreation(email: string) {
    await this.emailInput().fill(email);
    await this.createAccountButton().click();
  }

  async fillRegistrationForm(userData: any) {
    // Usamos los nombres que aparecen en el formulario
    await this.page.getByLabel('Mr.').check();
    await this.page.getByLabel('First name').fill(userData.firstName);
    await this.page.getByLabel('Last name').fill(userData.lastName);
    await this.emailInput().fill(userData.email);
    await this.page.getByLabel('Password').fill(userData.password);
    
    // Checkboxes de términos
    await this.page.locator('input[name="psgdpr"]').check();
    
    // Haz click en Save
    await this.saveButton().click();
    
    // Espera a que se cargue la página siguiente (espera a un elemento que indique que el registro fue exitoso)
    // Puede ser un mensaje de bienvenida o que la URL cambie
    try {
      await this.page.waitForLoadState('networkidle');
    } catch (e) {
      console.log('⚠️ Network idle timeout after registration');
    }
  }
}
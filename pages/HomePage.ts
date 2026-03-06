import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Limitamos el alcance al contenedor del encabezado
  private readonly signInLink = () => this.page.locator('nav').getByRole('link', { name: 'Sign in' });

  constructor(page: Page) {
    super(page);
  }

  async goToSignIn() {
    await this.signInLink().click();
  }
}
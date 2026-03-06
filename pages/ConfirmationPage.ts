import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  // Cambiamos selector de clase frágil por role accesible
  private readonly confirmationMessage = () => this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async getConfirmationMessage(): Promise<string | null> {
    return await this.confirmationMessage().textContent();
  }
}
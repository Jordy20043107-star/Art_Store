import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Corregimos el rol a button para que coincida con la interfaz
  private readonly proceedToCheckoutButton = () => this.page.getByRole('button', { name: /checkout/i });
  private readonly quantityDisplay = () => this.page.locator('.cart_quantity_input');
  private readonly totalPrice = () => this.page.locator('#total_price');

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    // Espera a que el botón sea visible y esté habilitado antes de hacer clic
    const button = this.proceedToCheckoutButton();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.isEnabled({ timeout: 5000 });
    await button.click();
  }

  async getQuantity(): Promise<number> {
    // Espera a que la entrada sea visible antes de obtener su valor
    const input = this.quantityDisplay().first();
    await input.waitFor({ state: 'visible', timeout: 5000 });
    const quantity = await input.inputValue();
    return parseInt(quantity);
  }

  async getTotalPrice(): Promise<string | null> {
    // Espera a que el elemento sea visible antes de obtener el contenido
    const price = this.totalPrice();
    await price.waitFor({ state: 'visible', timeout: 5000 });
    return await price.textContent();
  }
}
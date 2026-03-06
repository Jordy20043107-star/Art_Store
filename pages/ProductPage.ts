import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Cambiamos selectores por locators orientados al usuario
  private readonly accessoriesLink = () => this.page.getByRole('link', { name: 'Accessories' });
  // Opción más robusta: Clic en el título dentro del article
  private readonly firstProductLink = () => this.page.locator('article').first().getByRole('heading', { level: 2 }).locator('a');
  private readonly quantityInput = () => this.page.getByLabel('Quantity');
  private readonly addToCartButton = () => this.page.getByRole('button', { name: 'Add to cart' });

  constructor(page: Page) {
    super(page);
  }

  async goToAccessories() {
    await this.accessoriesLink().click();
  }

  async selectFirstProduct() {
    await this.firstProductLink().click();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput().fill(quantity.toString());
  }

  async addToCart() {
    // Hace clic en el botón "Add to cart"
    const button = this.addToCartButton();
    await button.waitFor({ state: 'visible', timeout: 5000 });
    await button.click();
    
    // Espera a que la red esté idle para asegurar que la petición se envió
    await this.page.waitForLoadState('networkidle').catch(() => {
      console.log('⚠️ Network did not reach idle state');
    });
    
    // Pequeña pausa adicional para asegurar actualización del DOM
    await this.page.waitForTimeout(500);
  }
}
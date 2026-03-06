import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Usamos getByLabel para campos de formulario
  private readonly addressFirstName = () => this.page.getByLabel('First name');
  private readonly addressLastName = () => this.page.getByLabel('Last name');
  private readonly addressLine1 = () => this.page.getByLabel('Address');
  private readonly city = () => this.page.getByLabel('City');
  private readonly state = () => this.page.getByLabel('State');
  private readonly zip = () => this.page.getByLabel('Zip/Postal Code');
  private readonly country = () => this.page.getByLabel('Country');
  private readonly proceedAddressButton = () => this.page.getByRole('button', { name: 'Proceed to checkout' });
  private readonly shippingTerms = () => this.page.getByLabel('I agree to the terms of service');
  private readonly proceedShippingButton = () => this.page.getByRole('button', { name: 'Proceed to checkout' });
  private readonly payByCheckOption = () => this.page.getByRole('link', { name: 'Pay by check' });
  private readonly confirmOrderButton = () => this.page.getByRole('button', { name: 'I confirm my order' });

  constructor(page: Page) {
    super(page);
  }

  async fillAddressForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }) {
    await this.addressFirstName().fill(data.firstName);
    await this.addressLastName().fill(data.lastName);
    await this.addressLine1().fill(data.address);
    await this.city().fill(data.city);
    await this.state().selectOption(data.state);
    await this.zip().fill(data.zip);
    await this.country().selectOption(data.country);
    await this.proceedAddressButton().click();
  }

  async selectShipping() {
    await this.shippingTerms().check();
    await this.proceedShippingButton().click();
  }

  async selectPayment() {
    await this.payByCheckOption().click();
  }

  async confirmOrder() {
    await this.confirmOrderButton().click();
  }
}
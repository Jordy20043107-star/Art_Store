import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  private firstNameInput = '#customer_firstname';
  private lastNameInput = '#customer_lastname';
  private passwordInput = '#passwd';
  private addressInput = '#address1';
  private cityInput = '#city';
  private stateSelect = '#id_state';
  private zipInput = '#postcode';
  private countrySelect = '#id_country';
  private mobileInput = '#phone_mobile';
  private termsCheckbox = '#cgv';
  private registerButton = '#submitAccount';

  constructor(page: Page) {
    super(page);
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    mobile: string;
  }) {
    await this.page.fill(this.firstNameInput, data.firstName);
    await this.page.fill(this.lastNameInput, data.lastName);
    await this.page.fill(this.passwordInput, data.password);
    await this.page.fill(this.addressInput, data.address);
    await this.page.fill(this.cityInput, data.city);
    await this.page.selectOption(this.stateSelect, data.state);
    await this.page.fill(this.zipInput, data.zip);
    await this.page.selectOption(this.countrySelect, data.country);
    await this.page.fill(this.mobileInput, data.mobile);
    await this.page.check(this.termsCheckbox);
    await this.page.click(this.registerButton);
  }
}
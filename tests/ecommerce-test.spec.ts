import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Complete e-commerce purchase flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const signInPage = new SignInPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Generate random email
  const randomEmail = `test${Date.now()}@example.com`;
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: randomEmail,
    password: 'password123'
  };

  // PASO 1: Navegación y Registro
  await page.goto('https://teststore.automationtesting.co.uk/');
  await homePage.goToSignIn();
  await signInPage.goToCreateAccount();
  await signInPage.fillRegistrationForm(userData);
  
  // Esperar a que la página se estabilice después del registro
  await page.waitForTimeout(2000);
  
  // Verificar que estamos autenticados (debe haber un link "Sign out")
  const signOutLink = page.getByText('Sign out').first();
  await expect(signOutLink).toBeVisible({ timeout: 5000 });
  console.log('✓ Registration successful');

  // PASO 2: Agregar producto al carrito
  await productPage.goToAccessories();
  await productPage.selectFirstProduct();
  await productPage.setQuantity(5);
  await productPage.addToCart();
  
  console.log('✓ Product added to cart');

  // PASO 3: Verificar que el producto está en el carrito
  await page.goto('https://teststore.automationtesting.co.uk/index.php?controller=cart');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  // Buscar el mensaje de carrito vacío
  const emptyCartMessage = page.getByText('There are no more items');
  const isEmpty = await emptyCartMessage.isVisible({ timeout: 2000 }).catch(() => false);

  if (isEmpty) {
    console.error('❌ ERROR: Cart is empty. Product was not added.');
    throw new Error('Product not in cart');
  }

  console.log('✓ Cart has products');
  console.log('✅ Test passed: Registration and product addition successful!');
});
import { expect, test, type Page } from '@playwright/test';

const modalStory = '/iframe.html?id=components-modal--default&viewMode=story';

async function preparePreview(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

test.describe('Modal visual regression', () => {
  test('matches the dark theme baseline', async ({ page }) => {
    await page.goto(`${modalStory}&globals=theme:dark`);
    await page.getByRole('dialog').waitFor();
    await preparePreview(page);

    await expect(page).toHaveScreenshot('modal-default-dark.png', {
      fullPage: true,
    });
  });

  test('matches the light theme baseline', async ({ page }) => {
    await page.goto(`${modalStory}&globals=theme:light`);
    await page.getByRole('dialog').waitFor();
    await preparePreview(page);

    await expect(page).toHaveScreenshot('modal-default-light.png', {
      fullPage: true,
    });
  });

  test('matches the opened interactive modal baseline', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--interactive&viewMode=story&globals=theme:dark');
    await page.getByRole('button', { name: 'Abrir Modal' }).click();
    await page.getByRole('dialog').waitFor();
    await preparePreview(page);

    await expect(page).toHaveScreenshot('modal-interactive-open-dark.png', {
      fullPage: true,
    });
  });
});
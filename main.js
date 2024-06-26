import {Builder, By} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/firefox.js';
import {question} from 'readline-sync';

// Function initBot, initialize the bot
async function initBot() {
  // Start the browser
  const driver = await new Builder()
    .setFirefoxOptions(new Options().headless())
    .forBrowser('firefox')
    .build();

  while (true) {
    // Asks the user what they want to search for
    let search = '';
    while (true) {
      search = question('\nPesquisar por: ');

      if (search === '') {
        console.error('\x1b[31mValor para pesquisa vazio, digite algo.\x1b[0m');
        continue;
      }
      console.log('');
      break;
    }

    // Start search
    await driver.get(`https://www.google.com/search?q=${search}`);
    const elementsLink = await driver.findElements(By.className('yuRUbf'));
    const links = [];

    // Get the links
    for (let counter = 0; counter < 5 && counter < elementsLink.length; counter += 1) {
      const link = await elementsLink[counter].findElement(By.css('a'));
      links.push(await link.getAttribute('href'));
    }

    // Enter the sites and get the informations
    for (let counter = 0; counter < 5 && counter < elementsLink.length; counter += 1) {
      await driver.get(links[counter]);
      const elementText = await driver.findElement(By.css('body'));
      const text = await elementText.getText();
      const textCharacters = text.split('');

      // Start the consonant and vowels quantity verification
      let vowels = 0;
      let consonants = 0;

      textCharacters.forEach(element => {
        switch (element) {
          case 'a' || 'e' || 'i' || 'o' || 'u':
            vowels += 1;
            break;

          default:
            consonants += 1;
        }
      });

      // Print the results
      console.log(`Nome do Site: ${await driver.getTitle()}`);
      console.log(`URL: ${links[counter]}`);
      console.log(`Contagem de letras: ${vowels + consonants}`)
      console.log(`Contagem de vogais: ${vowels}`);
      console.log(`Contagem de consoantes: ${consonants}\n`);
    }

    // Ask the user if he wants to do another search
    let searchAgain = '';
    while (true) {
      searchAgain = question('Fazer outra pesquisa [S/N]: ')
        .trim()
        .toUpperCase();
      if (searchAgain !== 'N' && searchAgain !== 'S') {
        console.error(
          '\x1b[31mOpção inválida! Digite S para sim ou N para não.\x1b[0m'
        );
        continue;
      }
      break;
    }
    if (searchAgain === 'N') {
      break;
    } else {
      continue;
    }
  }
}
initBot();

import {BotSelenium} from './bot.js';
import {question} from 'readline-sync';

async function initBot() {
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

    const Bot = new BotSelenium(search, 'firefox', false)
    await Bot.search()
    const links = await Bot.getLinks()
    await Bot.enterLinks(links)

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
    } 
    else {
      continue;
    }

  }
}

/*// Function initBot, initialize the bot
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
    for (let counter = 0; counter < 5; counter += 1) {
      const link = await elementsLink[counter].findElement(By.css('a'));
      links.push(await link.getAttribute('href'));
    }

      // Print the results
      console.log(`Nome do Site: ${await driver.getTitle()}`);
      console.log(`URL: ${links[counter]}`);
      console.log(`Contagem de letras: ${vowels + consonants}`)
      console.log(`Contagem de vogais: ${vowels}`);
      console.log(`Contagem de consoantes: ${consonants}\n`);

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
}*/
initBot();

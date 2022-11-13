import {Builder, By} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/firefox.js';

export class BotSelenium {

    #driver
    #search
    #browser
    #headless

    constructor(search, browser, headless) {
        
        if (headless === true) {
            this.#driver = new Builder()
            .setFirefoxOptions(new Options().headless())
            .forBrowser(browser)
            .build();
        }
        else {
            this.#driver = new Builder()
            .forBrowser(browser)
            .build();
        }
        
        this.#search = search
        this.#browser = browser
        this.#headless = headless
    }

    get driver() {
        return this.#driver
    }

    async search() {
        // Start search
        await this.#driver.get(`https://www.google.com/search?q=${this.#search}`);
    }

    async getLinks() {
        const elementsLink = await this.#driver.findElements(By.className('yuRUbf'));
        const links = [];

        // Get the links
        for (let counter = 0; counter < 5; counter += 1) {
            const link = await elementsLink[counter].findElement(By.css('a'));
            links.push(await link.getAttribute('href'));
        }

        return links
    }

    async enterLinks(links) {
        // Enter the sites and get the informations
        for (let counter = 0; counter < 5; counter += 1) {
            await this.#driver.get(links[counter]);
            const [vowelsQuantity, consonantsQuantity] = await this.getVogalCosonantQuantity()
            console.log(`Nome do Site: ${await this.#driver.getTitle()}`);
            console.log(`URL: ${links[counter]}`);
            console.log(`Contagem de letras: ${vowelsQuantity + consonantsQuantity}`)
            console.log(`Contagem de vogais: ${vowelsQuantity}`);
            console.log(`Contagem de consoantes: ${consonantsQuantity}\n`);
        }
    }

    async getVogalCosonantQuantity() {
        const elementText = await this.driver.findElement(By.css('body'));
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
        return [vowels, consonants];
    }
}

import { ListHTML } from './html-elements/list-html'
import { TableHTML } from './html-elements/table-html'
/**
 * main.ts
 * @author Aélion <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 * 
 * Entry point of our frontend application
 */
class Main {
    constructor() {
        let myName: string
        myName = 'Jean-Luc'

        /**
        * Récupère dans le DOM (Document Object Model) le premier Objet (élément HTML)
        * qui dispose d'un attribut "app"
        */
        const app: Element = document.querySelector('[app]')
        app.innerHTML = myName

        // New instance of ListHTML
        const listHTML = new ListHTML()
        app.appendChild(listHTML.build())

        const tableHTML = new TableHTML()
        app.appendChild(tableHTML.build())
    }
}

/**
 * Launch app
 */
const main = new Main()


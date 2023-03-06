/**
 * main.ts
 * @author Aélion <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 * 
 * Entry point of our frontend application
 */
let myName: string
myName = 'Jean-Luc'

const myLastName: string = 'Aubert'

const myArray: Array<string> = ['Aubert', 'Casper', 'Tartempion']
myArray.push('Talut')
console.table(myArray)

console.log(myName)

/**
 * Récupère dans le DOM (Document Object Model) le premier Objet (élément HTML)
 * qui dispose d'un attribut "app"
 */
const app: Element = document.querySelector('[app]')
app.innerHTML = myName
import { openStudio, saveStudio, verifyCommandLog } from '../support'

const isTextTerminal = Cypress.config('isTextTerminal')

describe('extends test', () => {
  openStudio()

  it('tracks each type of event and appends to existing test', () => {
    Cypress.config('isTextTerminal', isTextTerminal)

    cy.visit('/index.html').then(() => {
      Cypress.emit('run:end')
    })

    cy.get('.link', { log: false }).click({ log: false })
    cy.get('.input-text', { log: false }).type('testing', { log: false })
    cy.get('.input-radio', { log: false }).click({ log: false })
    cy.get('.input-checkbox', { log: false }).click({ log: false })
    cy.get('.input-checkbox', { log: false }).click({ log: false })
    cy.get('.select', { log: false }).select('1', { log: false })

    verifyCommandLog(1, {
      selector: '.link',
      name: 'click',
    })

    verifyCommandLog(2, {
      selector: '.input-text',
      name: 'type',
      message: 'testing',
    })

    verifyCommandLog(3, {
      selector: '.input-radio',
      name: 'check',
    })

    verifyCommandLog(4, {
      selector: '.input-checkbox',
      name: 'check',
    })

    verifyCommandLog(5, {
      selector: '.input-checkbox',
      name: 'uncheck',
    })

    verifyCommandLog(6, {
      selector: '.select',
      name: 'click',
    })

    verifyCommandLog(7, {
      selector: '[value="1"]',
      name: 'click',
    })

    verifyCommandLog(8, {
      selector: '.select',
      name: 'select',
      message: '1',
    })

    saveStudio()
  })
})

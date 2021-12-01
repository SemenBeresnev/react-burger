import { apiURL } from "../../../src/utils/constants";

describe('service is available', function () {
    const bunId = "60d3b41abdacab0026a733c6";
    const ingredientId = '60d3b41abdacab0026a733c8';
    before(function () {
        cy.intercept('GET', `${apiURL}/ingredients`).as('getDATA')
        cy.visit('http://localhost:3000');
    });
    it('should open ingredient modal', function () {
        cy.wait('@getDATA')
        cy.get(`[class^="ingredient_product"]`).first().click();
        cy.get('[class^="modal_modal"]').should('exist');
        cy.get('[class^="modal_modal"] h5').should('have.text', 'Краторная булка N-200i');
    });
    it('should close ingredient modal', () => {
        cy.get('[class^="modal_modal"] svg').click();
        cy.get('[class^="modal_modal"]').should('not.exist');
    })
    it('should create order', () => {
        cy.intercept('POST', `${apiURL}/auth/login`).as('postLogin');
        cy.visit('http://localhost:3000/login');
        cy.get('.form input[type=email]').type('semen@logycom.kz');
        cy.get('.form input[type=password]').type('123456');
        cy.get('.form').trigger("submit");
        cy.wait('@postLogin');
        cy.get(`[class^="ingredient_product"]`).first().trigger('dragstart');
        cy.get('[class^="burger-constructor_constructor"]').trigger('drop');
        cy.get(`[class^="counter_counter__num"]`).first().should('have.text', 2);
        cy.get('.constructor-element_pos_top .constructor-element__text').should('have.text', 'Краторная булка N-200i (верх)');
        cy.get('.constructor-element_pos_bottom .constructor-element__text').should('have.text', 'Краторная булка N-200i (низ)');
        cy.get(`[class^="ingredient_product"]`).last().trigger('dragstart');
        cy.get('[class^="burger-constructor_constructor"]').trigger('drop');
        cy.get(`[class^="counter_counter__num"]`).last().should('have.text', 1);
        cy.get(`[class^="burger-constructor_constructor"]`).contains('Сыр с астероидной плесенью');
        cy.intercept('POST', `${apiURL}/orders`).as('postData')
        cy.contains('Оформить заказ').trigger('click');
        cy.wait('@postData');
        cy.get('[class^="modal_modal"]').should('exist');
        cy.contains('идентификатор заказа');
        cy.get('[class^="modal_modal"] [class^="modal_close"] svg').trigger('click');
    })
});
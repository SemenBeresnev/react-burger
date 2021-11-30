import { apiURL } from "../../../src/utils/constants";

describe('service is available', function () {
    const bunId = "60d3b41abdacab0026a733c6";
    const ingredientId = '60d3b41abdacab0026a733c8';
    before(function () {
        cy.visit('http://localhost:3000');
    });
    it('should open ingredient modal', function () {
        cy.get(`[class^="ingredient_product"]`).first().click();
        cy.get('#modal').should('exist');
        cy.get('#modal h5').should('have.text', 'Краторная булка N-200i');
    });
    it('should close ingredient modal', () => {
        cy.get('#modal svg').click();
        cy.get('#modal').should('not.exist');
    })
    it('should create order', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('.form input[type=email]').type('semen@logycom.kz');
        cy.get('.form input[type=password]').type('123456');
        cy.get('.form').trigger("submit");
        cy.get(`[class^="ingredient_product"]`).first().trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get(`[class^="counter_counter__num"]`).first().should('have.text', 2);
        cy.get('.constructor-element_pos_top .constructor-element__text').should('have.text', 'Краторная булка N-200i (верх)');
        cy.get('.constructor-element_pos_bottom .constructor-element__text').should('have.text', 'Краторная булка N-200i (низ)');
        cy.get(`[class^="ingredient_product"]`).last().trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get(`[class^="counter_counter__num"]`).last().should('have.text', 1);
        cy.get(`#constructorList`).contains('Сыр с астероидной плесенью');
        cy.intercept('POST', `${apiURL}/orders`).as('postData')
        cy.contains('Оформить заказ').trigger('click');
        cy.wait('@postData');
        cy.get('#modal').should('exist');
        cy.contains('идентификатор заказа');
        cy.get('#modal [class^="modal_close"] svg').trigger('click');
    })
});
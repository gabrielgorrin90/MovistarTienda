import PageObjet from "../support/PageObjet";


describe('Busqueda Movistar', ()=>{
    beforeEach(function(){
        cy.visit('https://tienda.movistar.com.ar/');
        cy.viewport(1024, 768);
       
    })

    it('CP001', ()=>{
        cy.get('.waves-effect > .icon-search').click();
        cy.get('#myInput').type('A52').type('{enter}');
        cy.get('h1').should('contain','A52');
        cy.get('.button').click();
        cy.wait(2000);
        cy.location('pathname').should('eq','/samsung-galaxy-a52.html');
        cy.get('.product-name.desktop > .h1').should('contain','Samsung Galaxy A52')
        cy.get('#installments-text').should('contain','12 cuotas ');//verificar que se puede comprar en 12 cuotas
        cy.screenshot();
    })
    it('CP002', ()=>{
        PageObjet.search();//filtrado de productos
        cy.get(':nth-child(4) > .filter-group > .filter-data-section > :nth-child(3) > a > .filter-info-label').click();
        PageObjet.search();//filtrado de productos
        cy.get(':nth-child(3) > .filter-group > .filter-data-section > :nth-child(2) > a > .filter-info-label').click();
        cy.get('.count-container').should('contain','2 Artículo(s)');
        cy.screenshot();
    })
    it('CP003', ()=>{
        cy.get('.product-image').eq(2).click();
        cy.get('#open-modal-installments').click();
        cy.get('#selectBank').select('Credicoop');
        cy.get('#selectCardByBank').select('Visa');
        cy.wait(2000);
        cy.get('#bodyTable > :nth-child(1) > :nth-child(1)').should('not.contain','60');
        cy.get('#bodyTable > :nth-child(2) > :nth-child(1)').should('not.contain','60');
        cy.get('#bodyTable > :nth-child(3) > :nth-child(1)').should('not.contain','60');
        cy.get('#bodyTable > :nth-child(4) > :nth-child(1)').should('not.contain','60');
        cy.get('#bodyTable > :nth-child(5) > :nth-child(1)').should('not.contain','60');
        cy.screenshot();
    })
    it('CP004', ()=>{
        cy.get('.product-image').eq(1).click();
        cy.get('#open-modal-buycall').click();
        cy.get('#modal-buycall > .modal-dialog > .modal-content > .modal-body > h2').should('contain', 'Pago en tu Factura')
        cy.get('#modal-buycall > .modal-dialog > .modal-content > .modal-body > .btn-center > .btn-success').click();
        cy.get('#movistar-sameline-button').check();
        cy.get('.pdp-buttons-wrapper > #movistar-pdp-addtocart-button').click();
        cy.fixture("date").then((date)=>{
            cy.wait(2000);
            cy.get('#ani-phoenix').type(date.numberPhonefail);//prueba_usuario_incorrecto
            cy.get('#buttonContinuar').click();
            cy.get('.no-offer-msg > h3 > strong').should('contain', 'Actualmente tu línea no cuenta con el beneficio de pago en factura').type('{esc}');
            cy.get('.pdp-buttons-wrapper > #movistar-pdp-addtocart-button').click();
            cy.wait(2000);
            cy.get('#ani-phoenix').clear().type(date.numberPhoneTrue);//prueba_usuario_correcto
            cy.get('#buttonContinuar').click();
            cy.wait(2000);
            cy.get('.text-center > .d-inline-block').click();
            cy.get('.modal-body > .title').should('include.text','Condiciones');
            cy.screenshot();

        })
        
        
    })
})
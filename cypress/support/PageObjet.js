class buscadorPage{
    constructor(){
        this.searchInput = 'li > .btn-group > .btn-filter > [data-label-placement=""] > .icon';
    }

        search = (element) =>{
            
            cy.get(this.searchInput).click();

        
    }
}
export default new buscadorPage();
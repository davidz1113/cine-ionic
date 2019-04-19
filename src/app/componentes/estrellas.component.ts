import { Component, Output, Input, AfterViewInit } from "@angular/core";


@Component({
    selector: 'app-estrellas',
    templateUrl: 'estrellas.component.html'
})
export class EstrellasComponent implements AfterViewInit {

    @Input() numero;
    array: any;

    constructor() {
        this.array = new Array(this.numero);
        // console.log(this.array);
    }
    
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
     
    }

}
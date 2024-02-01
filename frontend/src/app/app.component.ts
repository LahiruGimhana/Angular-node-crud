import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentcrudComponent } from "./studentcrud/studentcrud.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StudentcrudComponent]
})
export class AppComponent {
  title = 'frontend';
}

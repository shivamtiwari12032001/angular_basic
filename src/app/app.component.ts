import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InlineEditingComponent } from './components/inline-editing/inline-editing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InlineEditingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inline_editing';
}

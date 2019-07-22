import { Component } from '@angular/core';
import { UrlTree, UrlSerializer, DefaultUrlSerializer } from '@angular/router';


// export default class CustomUrlSerializer extends DefaultUrlSerializer {
//   // private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

//   parse(url: string): UrlTree {
//     // Encode "+" to "%2B"
//     url = url.replace(/\+/gi, '%2B');
//     // Use the default serializer.
//     return super.parse(url);
//   }

//   serialize(tree: UrlTree): string {
//     return super.serialize(tree).replace(/\+/gi, '%2B');
//   }
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [
  //   { provide: UrlSerializer, useClass: CustomUrlSerializer }
  // ],
})
export class AppComponent {
  title = 'Smart Interview Processing';

}

import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    // this.loadJsFile("../../assets/js/script.js");
    this.loadJsFile("../../assets/js/jquery.min.js");
    this.loadJsFile("../../assets/js/bootstrap.bundle.min.js");
  }
  public loadJsFile(url :string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  } 
}

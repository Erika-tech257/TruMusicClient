import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayName = localStorage.getItem("name")

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }


  
  logout(){
    this.auth.loggedOut()
    console.log("clicked")
    alert("You are now logging out " + this.displayName)
  }
}

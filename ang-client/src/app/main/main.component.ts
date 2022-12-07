import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
myObservable = new Observable((observer) =>{
  console.log('obserable starts')
  setTimeout(() => {observer.next("1")}, 1000)
  setTimeout(() => {  observer.next("2")}, 2000)
  setTimeout(() => {observer.next("3")}, 3000)
  setTimeout(() => {observer.next("4")}, 4000)
  setTimeout(() => {observer.next("5")}, 5000)

  
});

ngOnInit(){
  this.myObservable.subscribe((val)=>{
    console.log(val);
  })
}
}

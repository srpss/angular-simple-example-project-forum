import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardService } from '../APIService';

interface IThread {

  "_id": string,
  "originalPoster": string,
  "image": string,
  "owner": string,
  "date": string,
  "description": string[],
  "__v": number

}






@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})


export class ThreadComponent implements OnInit {
  _id: string = ""
  originalPoster: string = "";
  image: string = "";
  owner: string = "";
  date: string = "";
  description: string[] = [];
  __v: number = 0;


  thread: IThread = {
    "_id": "",
    "originalPoster": "",
    "image": "",
    "owner": "",
    "date": "",
    "description": [],
    "__v": 0
  };
  public thread$: Observable<string>;

  constructor(private route: ActivatedRoute,
    private BoardService: BoardService) {
    const id = this.route.snapshot.params["id"];
    this.thread$ = this.BoardService.getThread(id);

  }


  ngOnInit(): void {



    this.thread$.subscribe((data) => {
      let conv = JSON.stringify(data);
      let json = JSON.parse(conv)
      console.log(conv)
      console.log(data)
      this._id = json._id;
      this.originalPoster = json.originalPoster;
      this.image =json.image;
      this.owner = json.owner;
      this.date = json.date;
      this.description = json.description;
      __v: 0;
    })
  }
}

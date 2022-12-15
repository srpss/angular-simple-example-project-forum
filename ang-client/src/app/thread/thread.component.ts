import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardService } from '../APIService';
import { UserStore } from '../store/user-store';

interface IThread {

  "_id": string,
  "originalPoster": string,
  "image": string,
  "owner": string,
  "date": string,
  "description": string[],
  "__v": number

}

interface IComment {
  "_id": string,
  "comment": string,
  "image": string,
  "owner": string
}




@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})


export class ThreadComponent implements OnInit {
  thrId: string = "";
  _id: string = ""
  originalPoster: string = "";
  image: string = "";
  owner: string = "";
  date: string = "";
  description: IComment[] = [];
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
  public user$: Observable<string>;

  constructor(private route: ActivatedRoute,
    private BoardService: BoardService,
    public userStore: UserStore) {
    const id = this.route.snapshot.params["id"];
    this.thread$ = this.BoardService.getThread(id);
    this.user$ = this.userStore.selectUser();
  }


  ngOnInit(): void {

    this.thrId = this._id
    console.log(this.thrId)


    this.thread$.subscribe((data) => {
      let conv = JSON.stringify(data);
      let json = JSON.parse(conv)
      console.log(conv)
      console.log(data)
      this._id = json._id;
      this.originalPoster = json.originalPoster;
      this.image = json.image;
      this.owner = json.owner;
      this.date = json.date;
      this.description = json.description;
      __v: 0;
    })
  }

  public onUpdate() {
    this.ngOnInit()
  }

  onDelete(id: string) {

    this.BoardService.deleteThread(id).subscribe((response) => {
      this.onUpdate()
    });
  }
  onDeleteComment(id: string, _id: string) {
    this.BoardService.deleteComment(id, _id).subscribe((response) => {
      this.onUpdate()
    });
  }
}
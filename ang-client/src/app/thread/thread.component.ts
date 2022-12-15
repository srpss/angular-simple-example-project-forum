import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardService } from '../APIService';
import { UserStore } from '../store/user-store';
import { TokenStorageService } from '../_services/token-storage.service';

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
  form: any = {
    comment: null,
    image: null
  };

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
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private BoardService: BoardService,
    public userStore: UserStore,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) {
    const id = this.route.snapshot.params["id"];
    this.thread$ = this.BoardService.getThread(id);
    this.user$ = this.userStore.selectUser();
   
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value)
    if (this.form.invalid) {

      return;
    }
    const { comment, image } = this.form.value;

    const USER_KEY = 'auth-user';
    const user = (window.sessionStorage.getItem(USER_KEY));
    let currentUser = user !== null ? JSON.parse(user) : "";
 
    this.addComment(this.thrId, currentUser.username, comment, image)
  }

  ngOnInit(): void {


    this.form = this.formBuilder.group(
      {

        comment: [
          ''
        ],

        image: [
          'Add image link here',
          [
            Validators.required,
          ]
        ],


      }
    );

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

    }

  

    this.thread$.subscribe((data) => {
      let conv = JSON.stringify(data);
      let json = JSON.parse(conv)

      this._id = json._id;
      this.originalPoster = json.originalPoster;
      this.image = json.image;
      this.owner = json.owner;
      this.date = json.date;
      this.description = json.description;
      this.thrId = this._id
      __v: 0;
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
  addComment(id: string, owner: string, comment: string, image: string) {
    this.BoardService.addComment(id, owner, comment, image).subscribe((response) => {
      this.onUpdate()
    });
  }

  isItLogged() {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    return this.isLoggedIn
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
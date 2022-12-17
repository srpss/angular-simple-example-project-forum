import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardService } from '../APIService';
import { repos } from '../repos';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../main/main.component.scss']
})


export class SearchComponent implements OnInit {
  form: any = {
    search: null
  };
  submitted = false;
  repos: repos[] = [];
  loading: boolean = false;
  errorMessage: string = "";
  data = Observable<any>

  constructor(
    private formBuilder: FormBuilder,
    private BoardService: BoardService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {

        search: [
          '',
          [

          ]
        ]


      }
    );

   
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  public getRepos(search:string) {
    this.loading = true;
    this.errorMessage = "";
    this.BoardService.getRepos()
      .subscribe((response) => {
        // console.log("got it")
        const tempData : repos[] = response;
        const regexp = new RegExp(search, 'i');
       this.repos = tempData.filter(x => x.originalPoster.toLowerCase().includes(search.toLowerCase()))
      })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {

      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));

    const { search } = this.form.value;

    this.getRepos(search)

 
  }
}

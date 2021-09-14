import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: any
  question: any
  subjects: any
  filtered_questions: any[] = []
  isvisible = true
  foo: string = ""
  answers: Map<Number, string> = new Map();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.get_all_questions()
    // .subscribe((data) => {
    //   this.questions = data
    // })
    this.get_all_questions()
    this.get_all_subjects()
  }

  get_all_subjects = () => {
    this.dataService.get_all_subjects()
    .subscribe((data) => {
      this.subjects = data
    })
  }

  get_all_questions = () => {
    this.dataService.get_all_questions()
    .subscribe((data) => {
      this.questions = data
    })
  }

  subject_questions= (sub:number) => {
    var items: any[] = []
    this.questions.filter((value:any) => {
      if (value.subject_id == sub){
        items.push(value)
        
        // console.log(items)
        
      }
    this.filtered_questions = items  
    })
  }

  changeIsvisible = () => {
    this.isvisible = !this.isvisible
  }

  submit = (questionId: number) => {
    var answerToSubmit = this.answers.get(questionId)
    console.log("anwer to sumit:", answerToSubmit)
  }

  post_answers = (ans:any) => {
    this.dataService.post_ans(ans)
    .subscribe((data) => {
      console.log(data)

    })
  }

  submit_all = () => {
    var lis: any[] = []
    const iter_key = this.answers.keys()
    const iter = this.answers.values()
    interface dic_json{[key: string]: any}
    for(var val of this.answers){
      var ans_dict: dic_json = {}

      ans_dict["question_id"] = iter_key.next().value
      ans_dict["ans"] = iter.next().value
      lis.push(ans_dict)
    }
    for(var ans of lis){
      this.post_answers(ans)
    }
  }

  answerChanged = (questionId: number, event: any ) => {
    console.log("setting aswers")
    console.log(event.target)
    this.answers.set(questionId, event.target.value)
    console.log('answers:', this.answers)
  }



}

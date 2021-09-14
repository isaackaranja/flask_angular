import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpHeaders } from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

// export interface PeriodicElement{
//   question:string
//   name:string
//   answer:string
// }



@Component({
  selector: 'app-radmin',
  templateUrl: './radmin.component.html',
  styleUrls: ['./radmin.component.css']
})
export class RadminComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;

  combined_data: any[] = []
  selectedQuestion: any
  questions: any
  person_string: any = localStorage.getItem("person")
  user: any = JSON.parse(this.person_string)
  displayedColumns: string[] = ['name']
  columnsToDisplay: string[] = [];
  subjects: any[] = []
  filtered_questions: any

  
  // @ViewChild('nameRef') nameElementRef: ElementRef
  
  // data: any[] = [
  //   {name: "foo", answer: '1'},
  // ];

  data = new MatTableDataSource<any>([]);

  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private dataService: DataService, private changeDetectorRefs: ChangeDetectorRef) {
    this.selectedQuestion = {id: -1, qtn: '', subject_id: 0, person_id: -1}
    console.log("this is questionOld", this.questions)
    
   }

  ngOnInit(): void {
    // this.data.paginator = this.paginator;
     // this.displayedColumns = ["zack"];
     this.get_all_subjects()
     this.dataService.get_all_questions().
     subscribe((questions: any[]) => {
       // this.data.paginator = this.paginator;
       this.questions = questions;
       this.filtered_questions = questions;
       console.log("this is question", this.questions)

       
      //  this.data.data = this.questions
       for(let qtn of this.filtered_questions){

         if(this.displayedColumns.includes(qtn.qtn) === false){
           this.displayedColumns.push(qtn.qtn);
         }
         console.log("this is displayedColumn", this.displayedColumns)
         interface dic_jsos {[key:string]: any}
 
         if(qtn.answer){
           for(let ans of qtn.answer){
            let data_dict: dic_jsos = {}
             console.log("this is ans and details",ans)
             data_dict["name"] = ans.user
             data_dict[qtn.qtn] = ans.ans
             console.log("this is data dict",data_dict)
             this.data.data.push(data_dict)
         }
         }
       }
       console.log("this is element data", this.data.data)
       
      //  this.table.renderRows()
       // let map = new Map<object, string>();
     })
  }

  get_all_subjects = () => {
    this.dataService.get_all_subjects()
    .subscribe((data) => {
      this.subjects = data
    })
    
  }

  subject_questions = (sub:number) => {
    var items: any[] = []
    this.questions.filter((value:any) => {
      if (value.subject_id == sub){
        items.push(value)
        
        // console.log(items)
        
      }
    this.filtered_questions = items
    })
    console.log("this is filtered question",this.filtered_questions)
    this.populate_data_with_subject_questions()
  }

  populate_data_with_subject_questions = () => {
    this.data.data = []
    interface dic_jsos {[key:string]: any}
    let diss = ["name"]
    for(let question of this.filtered_questions){
      diss.push(question.qtn)
      if(question.answer){
        for(let ans of question.answer){
          let data_dict: dic_jsos = {}
          console.log("this is ans and details",ans)
          data_dict["name"] = ans.user
          data_dict[question.qtn] = ans.ans
          console.log("this is data dict",data_dict)
          this.data.data.push(data_dict)
        }
      }
    }
    this.displayedColumns = diss
    console.log("reloading")
    // this.table.renderRows()

  }

  qtnClicked = (question:any) => {
    console.log("this is select3",this.selectedQuestion)
    this.dataService.get_question(question)
    .subscribe((data: any) => {
      this.selectedQuestion.id = data.id
      this.selectedQuestion.qtn = data.qtn
      this.selectedQuestion.subject_id = data.subject_id
      console.log("this is select2",this.selectedQuestion)
    })
    console.log("this is select5",this.selectedQuestion)
    console.log("this is question2: ", this.questions)
  }

  combined = () => {
    for(let quest of this.questions){
      if(quest.answer){
        
        

      }
    }
  }

  updateQuestion = () => {
    this.dataService.updateQuestion(this.selectedQuestion)
    .subscribe((data: any) => {
      console.log("this is data", data)
      this.selectedQuestion = data
    })
  }

  postQuestion = () => {
    this.dataService.postQuestion(this.selectedQuestion)
    .subscribe((data:any) => {
      this.questions.push(data)
      console.log("this is data: ", data)
    })
    
  }


  deleteQuestion = () => {
    this.dataService.deleteQuestion(this.selectedQuestion)
    .subscribe((data:any) => {
      console.log(data)
    })

  }

}

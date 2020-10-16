import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, Form } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UserService } from './user.service';
import { user } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  userForm:FormGroup;
  userData:user[];
    movieQuestions = [
    {
      question: {
        title: "What is your favorite genre of movies?",
        answers: [
          "Action",
          "Sci-fi",
          "Comedy",
          "Horror"
        ]
      }
    },
    {
      question: {
        title: "What is your favorite to-go snack?",
        answers: [
          "Popcorn",
          "Chocolate",
          "Pizza"
        ]
      }
    },
  ];
 
  constructor(private fb: FormBuilder,
    private userDetail:UserService) { 
    

  }

  ngOnInit(){      
    this.createForm();    
  }

  private createForm():void{
    this.userForm=this.fb.group({    
      moviequestion:this.fb.array(this.questionForm())
    })
    
      console.log(this.userForm); 
    //  console.log(this.userForm.controls.question.controls[0].controls.answer);  
    //  console.log(this.userForm.controls.question.controls[0].controls.answer.controls);                                                            
  }
  onSubmit(){
   console.log(this.userForm.value);
  } 

  display(value):void{
console.log(value);

  }
  
  // {
  //   question: {
  //     title: "What is your favorite genre of movies?",
  //     answers: [
  //       "Action",
  //       "Sci-fi",
  //       "Comedy",
  //       "Horror"
  //     ]
  //   }
  // }

  questionForm():FormGroup[]{  
   
   return  this.movieQuestions.map((itemList)=>{     
    return this.fb.group({
     question:this.fb.group({
     title:[itemList.question.title],
     answers:this.fb.array(itemList.question.answers.map((item=>{
         return this.fb.group({key:[item],[item]:[false]})  
     })))
})
    })     
  });  
}

  private createAnswer(answerList):FormGroup{          
    let answer=this.fb.group({});    
     answerList.map((item,i)=>{                  
               let control=new FormControl(item);
             answer.addControl(item,control);      
     })    
      
    return answer;
   }

}
import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
  constructor(private fb: FormBuilder,
    private userDetail:UserService) { 
    

  }

  ngOnInit(){    
    this.getDetails();
  }

  private getDetails():void{
    this.userDetail.getData().subscribe((data=>{      
      this.userData=data;      
      let  formgroupData= this.userData.map(item=>this.buildForm(item));
      console.log(formgroupData);
        this.userForm=this.fb.group({         
          skills:this.fb.array(formgroupData)});                             
  }));
}
  private buildForm(item):FormGroup{
   return this.fb.group({
            name:[item?item.name:null,Validators.required],
            rollno:[item?item.rollno:null,Validators.required]
          
    });
//  return this.fb.group({
//     name:[name?item.name:null,Validators.required],
//     rollno:[name?item.rollno:null,Validators.required]
//   })
}

  createForm():void{
    this.userForm=this.fb.group({
      skills:this.fb.array([])
    })
  }

  get skills():FormArray{
    return this.userForm.get('skills') as FormArray;
  }

 Add(){
   this.skills.push(this.create());
 }

 create():FormGroup{
   return this.fb.group({
     name:[],
     rollno:[]
   })
 }

    
  onSubmit(){
   console.log(this.userForm.value);
  } 
}
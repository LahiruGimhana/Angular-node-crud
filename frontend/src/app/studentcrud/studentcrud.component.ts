import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
  
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-studentcrud',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.css'
})
export class StudentcrudComponent {
  StudentArray: any[] = [];
  isResultLoaded: boolean = false;
  isUpdateFormActive: boolean = false;

  stname: string = "";
  course: string = "";
  fee: number | undefined;
  currentStudentId: string = "";


  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  getAllStudent() { 
    this.http.get("http://localhost:3000/api/student/get").subscribe(
      (data: any) => {
        this.isResultLoaded = true;
        this.StudentArray = data;

        console.log('Successfully fetched students:', this.StudentArray);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  save() {
    let bodyData = {
      "stname": this.stname,
      "course": this.course,
      "fee":this.fee
    }
    
    console.log(bodyData);
    if (bodyData.stname.length > 0) {
      this.http.post("http://localhost:3000/api/student/add", bodyData).subscribe(data=> {
      console.log(data);
      alert("Employee Registered Successfully")
        this.getAllStudent();
        
        this.stname = "";
        this.course = "";
        this.fee = undefined;
       })      
    }
   }
  setUpdate(data: any){
      
    }
  setDelete(data: any) {
      
    }
}

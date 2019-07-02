import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { User } from 'src/app/user/user';
import { Courses } from '../course';

@Component({
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{
    courses:Array<Courses> = [];
    course:Courses;
    user: User;
    courseId:number;
    constructor(private courseService: CourseService) {}

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        // this.courses = this.user.course;
        console.log(this.user)
        for(let i =0;i<this.user.course.length;i++){
            this.courseId = this.user.course[i].courseId;
            console.log(this.courseId);
            if(this.courseId != 0){
                this.courseService.getCourseById(this.courseId).subscribe((data) =>{
                    this.course = data;
                    console.log(this.course)
                    this.courses.push(this.course);
                })
            }
        }

    }
}

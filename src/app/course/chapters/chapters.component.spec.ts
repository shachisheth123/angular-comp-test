
import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ChaptersComponent } from './chapters.component';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/user/user';

describe('Chapters Component', () => {
    let component: ChaptersComponent;
    let fixture: ComponentFixture<ChaptersComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let courseService: CourseService;
    let router: ActivatedRoute;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChaptersComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [
                CourseService
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ChaptersComponent);
            component = fixture.componentInstance;
            de = fixture.debugElement;
            // tslint:disable-next-line:no-unused-expression
            component.ngOnInit;
            component = new ChaptersComponent(courseService, router);
        });
    }));

    it('should create component', () => {
        expect(component).toBeDefined();
    });


    it('should test OnInit function', () => {
        spyOn(component, 'ngOnInit').and.callThrough();
        expect(component.ngOnInit).toBeTruthy();
        expect(component.ngOnInit).toBeDefined();
    });
    beforeEach(() => {
        let store = {};

        spyOn(sessionStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string): string => {
            // tslint:disable-next-line:no-angle-bracket-type-assertion
            return store[key] = <string>value;
        });
        spyOn(sessionStorage, 'clear').and.callFake(() => {
            store = {};
        });

    });

    it('should set an item', () => {
        // tslint:disable-next-line:max-line-length
        expect(sessionStorage.setItem('user', 'contactNumber: 7875059524 ,course: [],email: \"shachi@gmail.com\",name: \"sha\",password: \"shachi\",userName: \"shachi\"'))
            .toBe('contactNumber: 7875059524 ,course: [],email: \"shachi@gmail.com\",name: \"sha\",password: \"shachi\",userName: \"shachi\"');
        expect(sessionStorage.getItem('user'))
            .toBe('contactNumber: 7875059524 ,course: [],email: \"shachi@gmail.com\",name: \"sha\",password: \"shachi\",userName: \"shachi\"');
    });

    it('should set and remove Item', () => {
        // tslint:disable-next-line:max-line-length
        expect(sessionStorage.setItem('user', 'contactNumber: 887949498 ,course: [],email: \"mah@gmail.com\",name: \"mah\",password: \"mahvash2\",userName: \"mah\"'))
            .toBe('contactNumber: 887949498 ,course: [],email: \"mah@gmail.com\",name: \"mah\",password: \"mahvash2\",userName: \"mah\"');
        expect(localStorage.removeItem('user')).toBeUndefined(); // undefined
        expect(sessionStorage.getItem('user'))
            .toBe('contactNumber: 887949498 ,course: [],email: \"mah@gmail.com\",name: \"mah\",password: \"mahvash2\",userName: \"mah\"');
    });

    it('should display module wise chapters', inject([HttpTestingController, CourseService], (httpMock: HttpTestingController, service: CourseService) => {
        fixture.detectChanges();
        service.getCourseById(101).subscribe((data) => {
            //this.component.course = data;
            const card = de.query(By.css('.mainbox'));
            const courseChapter = card.query(By.css('.list-group'));
            // const chapterName = card.query(By.css('.modulelist'));
            const moduleName = card.query(By.css('.modulelist'));
            expect(card).toHaveBeenCalled();
            expect(card).toBeTruthy();
            expect(card).toBeDefined();
            expect(courseChapter.nativeElement.textContent).toBe(data[0].courseName);
            expect(courseChapter.nativeElement.textContent).toBe(courseChapter[0].chapterName[0].chapterName);
            for (let i = 0; i < this.chapters.length; i++) {

                expect(moduleName.nativeElement.textContent).toBe(courseChapter[i].chapterModule);

            }


        });

    }));

});

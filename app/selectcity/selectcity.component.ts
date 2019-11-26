import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-selectcity',
  templateUrl: './selectcity.component.html',
  styleUrls: ['./selectcity.component.css']
})
export class SelectcityComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  ngOnInit(): void {
    this.openModal.nativeElement.click();
   }
   url="/showaallproduct"
   

}

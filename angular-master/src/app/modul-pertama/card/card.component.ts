import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const subject = new Subject();
    const series$ = subject.asObservable();

    series$.subscribe(val => console.log("early sub:" + val));
    
    subject.next(1);
    subject.next(2);
    subject.next(3);

    setTimeout(() => {
      series$.subscribe(val => console.log("late sub:" + val));
      subject.next(4);
    }, 3000);
    
  }

  @Input() card: any;
  @Input() id!: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();


  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    console.log(status);
  }

}

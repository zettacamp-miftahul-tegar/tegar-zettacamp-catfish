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

  // const subjectt = new BehaviorSubject(123);

  // two new subscribers will get initial value => output: 123, 123
  // subject.subscribe(console.log);
  // subject.subscribe(console.log);

  // two subscribers will get new value => output: 456, 456
  // subject3.next(456);

  // new subscriber will get latest value (456) => output: 456
  // subject4.subscribe(console.log);

  // all three subscribers will get new value => output: 789, 789, 789
  // subject5.next(789);

  @Input() card: any;
  @Input() id!: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();


  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    console.log(status);
  }

}

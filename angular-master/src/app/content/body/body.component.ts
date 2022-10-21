import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  name:string = '';
  alamat:string = '';
  
  dataa = ['nama', 'alamat'];
  title = 'List User';

  @Input() namePerson :any;
  @Output() nameChild: EventEmitter<any>;

  @ViewChild('nama') nama!: ElementRef;

  @ViewChild('alamatt') alamatt!: ElementRef;

  constructor() {
    this.nameChild = new EventEmitter();
    setTimeout(() => {
      console.log('sudah 5 detik');
    }, 5000 )
  }

  addName(nama: HTMLInputElement, alamatt: HTMLInputElement) {
    // console.log('nama :', this.nama.nativeElement.value);
    // console.log('alamat :', this.alamatt.nativeElement.value);
    
    let newObject = {
      name : this.nama.nativeElement.value,
      alamat : this['alamatt'].nativeElement.value,
    }

    // method buat ngirim
    this.nameChild.emit(newObject);
  } 

  // -----------------------------------------------------------

  ngOnChanges(): void {
    console.log('1. OnChanges');
    console.log(this.namePerson);
    
  }

  ngOnInit(): void {
    console.log('2. OnInit');
  }
  

  ngDoCheck(): void {
    console.log('3. ngDocheck');
        
  }

  ngAfterContentInit(): void {
    console.log('4. ngAfterContentInit');
    
  }

  ngAfterContentChecked(): void {
    console.log('5. ngAfterContentChecked');
    
  }

  ngAfterViewInit(): void {
    console.log('6. ngAfterViewInit');
    
  }

  ngAfterViewChecked(): void {
    console.log('7. ngAfterViewChecked');
    
  }

  ngOnDestroy(): void {
    console.log('8. ngOnDestroy');
    
  }

}

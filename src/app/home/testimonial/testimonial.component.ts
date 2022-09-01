import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import { moveSyntheticComments } from 'typescript';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  constructor(public home:HomeService) {
    //this.home.GetAlltestimonialShow();
  }
  number:any=1;
  testimonailShowSelected:any=[]
  rand = new Set<number>();
  ngOnInit(): void {

    // debugger     
    //  console.log(this.home.testimonailShow.size);
    //  while(this.rand.size<7){
    //   this.rand.add((Math.floor(Math.random() * (15 - 1 + 1)) + 1)-1)
    //   console.log(this.rand.size);
    //  }

    //  for(let data in this.rand){
    //   this.testimonailShowSelected.push(this.home.testimonailShow[data]);
    //  }

    //  console.log(this.testimonailShowSelected+"dasdasdasdasdasd")


    
     



  }

  

change(num:any){
  //alert("dasdasd");

  const after = <HTMLElement> document.getElementsByClassName('client-single')[num-1];
  const before = <HTMLElement> document.getElementsByClassName('client-single')[this.number-1];


  after.className = 'client-single active position-'+num;
  before.className='client-single inactive position-'+ this.number;

  this.number=num;

  //testimanial list ----> get all
}

//   $(document).ready(
//     (function() {
//         $(".client-single").on("click", function(event) {
//             event.preventDefault();

//             var active = $(this).hasClass("active");

//             var parent = $(this).parents(".testi-wrap");

//             if (!active) {
//                 var activeBlock = parent.find(".client-single.active");

//                 var currentPos = $(this).attr("data-position");

//                 var newPos = activeBlock.attr("data-position");

//                 activeBlock
//                     .removeClass("active")
//                     .removeClass(newPos)
//                     .addClass("inactive")
//                     .addClass(currentPos);
//                 activeBlock.attr("data-position", currentPos);

//                 $(this)
//                     .addClass("active")
//                     .removeClass("inactive")
//                     .removeClass(currentPos)
//                     .addClass(newPos);
//                 $(this).attr("data-position", newPos);
//             }
//         });
//     })(jQuery)
// );
 
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  constructor(public admin:AdminService) { }
  number:any=1;
  ngOnInit(): void {
     this.admin.GetAlltestimonialShow();
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatechatComponent } from './createchat/createchat.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  {
    path:'createchat',
    component : CreatechatComponent,
    outlet: 'left'
  },
  {
    path:'Frinds',
    component : FriendsComponent,
    outlet: 'left'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarchatRoutingModule { }

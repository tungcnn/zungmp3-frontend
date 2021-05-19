import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPlayListComponent} from "./components/play_list/add-play-list/add-play-list.component";


const routes: Routes = [
  {
    path: 'playList',
    component: AddPlayListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

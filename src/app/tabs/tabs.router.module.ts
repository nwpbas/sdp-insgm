import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        canActivate: [AuthGuardService],
        loadChildren: '../tab1/tab1.module#Tab1PageModule'
        // children: [
        //   {
        //     path: '',
        //     loadChildren: '../tab1/tab1.module#Tab1PageModule'
        //   }
        // ]
      },
      {
        path: 'tab2',
        canActivate: [AuthGuardService],
        loadChildren: '../tab2/tab2.module#Tab2PageModule'
        // children: [
        //   {
        //     path: '',
        //     loadChildren: '../tab2/tab2.module#Tab2PageModule'
        //   }
        // ]
      },
      {
        path: 'tab3',
        canActivate: [AuthGuardService],
        loadChildren: '../tab3/tab3.module#Tab3PageModule'
        // children: [
        //   {
        //     path: '',
        //     canActivate: [AuthGuardService],
        //     loadChildren: '../tab3/tab3.module#Tab3PageModule'
        //   }
        // ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

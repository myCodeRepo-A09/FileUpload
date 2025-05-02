import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path:'',
    redirectTo:'upload',
    pathMatch:'full'
   },
   {
    path:'upload',
    loadComponent:()=>import('../app/components/file-upload/file-upload.component').then(m=>m.FileUploadComponent)
   }
];

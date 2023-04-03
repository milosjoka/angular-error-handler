import {RouterModule, Routes} from "@angular/router";
import {InternalServerErrorComponent} from "./pages/internal-server-error/internal-server-error.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: 'internal-server-error',
    component: InternalServerErrorComponent,
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorHandlerRoutingModule { }

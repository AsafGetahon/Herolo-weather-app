import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { LastSearchesComponent } from "./pages/last-searches/last-searches.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "last-searches", component: LastSearchesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

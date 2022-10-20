import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { AuthService } from "./service/auth.service";

@NgModule({
imports:[CommonModule],
providers: [AuthService],
})

export class CoreModule{}

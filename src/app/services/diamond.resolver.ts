import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { DiamondService } from "./diamond.service";

export function diamondResolver(route:ActivatedRouteSnapshot){
const id = route.params['id']
return inject(DiamondService).getById(id)
}
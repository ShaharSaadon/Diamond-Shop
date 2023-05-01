import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { DiamondService } from "./diamond.service";
import { LoaderService } from "./loader.service";
import { delay } from "rxjs";

export function diamondResolver(route:ActivatedRouteSnapshot){
inject (LoaderService).setIsLoading(true)

const id = route.params['id']
return inject(DiamondService).getById(id).pipe(delay(1500))

}
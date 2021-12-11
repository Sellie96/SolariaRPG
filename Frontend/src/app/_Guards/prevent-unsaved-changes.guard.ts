import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component): boolean {
      if(component.editForm.dirty){
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
      }
    return true;
  }
  
}

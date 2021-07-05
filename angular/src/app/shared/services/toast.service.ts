import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[];

  constructor() {
    this.toasts = [];
  }

  /**
   * METHOD TO SHOW A NEW TOAST MESSAGE FROM THE VIEW
   * @param textOrTpl 
   * @param options 
   */
  public show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  /**
   * METHOD TO REMOVE A TOAST MESSAGE FROM THE VIEW
   * @param toast 
   */
  public remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

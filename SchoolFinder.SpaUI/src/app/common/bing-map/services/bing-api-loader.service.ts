import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BingApiLoaderService {

  private promise: Promise<string>;
  private url = 'https://www.bing.com/api/maps/mapcontrol?callback=__onBingLoaded&branch=release';
  private _windowRef: Window;

  constructor(@Inject(DOCUMENT) private _documentRef: Document) {
    this._windowRef = this._documentRef.defaultView as Window;
  }

  public load() {
    // First time 'load' is called?
    if (!this.promise) {

        // Make promise to load
        this.promise = new Promise(resolve => {

            // Set callback for when bing maps is loaded.
            this._windowRef['__onBingLoaded'] = (ev) => {
              resolve('Bing Maps API loaded');
            };

            // const node = document.createElement('script');
            const node = this._documentRef.createElement('script');
            node.src = this.url;
            node.type = 'text/javascript';
            node.async = true;
            node.defer = true;
            // _documentRef.getElementsByTagName('head')[0].appendChild(node);
            this._documentRef.getElementsByTagName('head')[0].appendChild(node);

            console.log("node", node);
        });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return this.promise;
  }
}

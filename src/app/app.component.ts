import { Component  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlService } from './url.service';
import { Observable, firstValueFrom  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'JLim-ShortUrl';
  public aLink = '';
  public newURL$: Observable<any> | undefined;
  public counts = 0;

  constructor(
    private urlService: UrlService,
    private formBuilder: FormBuilder
  ) {
  }
  urlForm = this.formBuilder.group({
    url: ''
  });

  copy(){
    var copyText = document.getElementById("maskedURL");
    let clipText = copyText?.textContent;
  
    if(clipText){
      navigator.clipboard.writeText(clipText);
    }
  }

  onSubmit() {
    
    console.warn('Your url has been submitted', this.urlForm.value);
    this.aLink = String(this.urlForm.value.url);

    try {
      this.urlService.geturl(String(this.urlForm.value.url))
    }
    catch(e) {
        console.error(e);
    }
    this.counts = this.urlService.counter;
    this.newURL$ = this.urlService.serverMessageSubject.asObservable();
  }

}

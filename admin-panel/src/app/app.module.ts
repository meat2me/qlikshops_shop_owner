import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from '@layouts/main-layout/main-layout.module';

import { interceptors } from '@core/interceptor';
import { reducers } from '@core/redux/app.states';
import { AuthEffects } from '@core/redux/effects/auth.effect';
import { StoreEffects } from '@core/redux/effects/store.effect';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatedService } from '@services/translated.service';
import { LanguagesLayoutModule } from '@layouts/languages-layout/languages-layout.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { CitiesSelectedComponent } from '@modals/cities-selected/cities-selected.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageInputModule} from "@components/image-input/image-input.module";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';



export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
        {
            keys: ['auth'],
            rehydrate: true
        }, )(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CitiesSelectedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainLayoutModule,
    LanguagesLayoutModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AuthEffects, StoreEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    ImageInputModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    NgbTimepickerModule,
  ],
  providers: [TranslatedService, AuthGuard, ...interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }

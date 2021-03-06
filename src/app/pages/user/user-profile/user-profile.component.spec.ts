import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule} from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule, MatDialogRef, MatInputModule, MatIconModule, MatMenuModule, MatGridListModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule,
        ToastrModule.forRoot(), MatToolbarModule, MatCardModule, AngularFireStorageModule, FormsModule, ReactiveFormsModule,
        MatDialogModule, MatFormFieldModule, MatInputModule, HttpClientModule, BrowserAnimationsModule,
        MatIconModule, MatMenuModule, RouterTestingModule.withRoutes([]), MatGridListModule
      ],
      providers: [{ provide: MatDialogRef, AngularFirestore, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

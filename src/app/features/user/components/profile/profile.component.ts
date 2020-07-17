import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {name: "", profile_pic : ""};
  comps = [];
  loaded: boolean = false;

  // Edit user info
  form: FormGroup;
  editting: boolean = false;
  userLoading: boolean = false;
  @ViewChild("file", {static: true}) file: ElementRef;
  @ViewChild("img", {static: true}) img: ElementRef;
  fileError: string = ""; // Error message
  newImage: File = null;

  constructor(private _auth: AuthService, private _http: HttpClient, private _user: UserService) { }

  ngOnInit(): void {
    
    this._auth.user.subscribe(user => { this.user = user });
    this.user = this._auth.getUser();
    this.user = this.user ? this.user : {name: "", profile_pic: ""};

    this._auth.user.subscribe(user => {
      this.user = user;
    })

    // Fetch user company
    this.fetchCompany();

    this.init();
  }


  /**
   * Initizl edit form
   */
  init(){
    this.form = new FormGroup({
      name: new FormControl(this.user.name, {validators: [Validators.required, Validators.minLength(3)]}),
      bio: new FormControl(this.user.bio, {validators: [Validators.maxLength(500)]})
    });

    // Upload file input
    this.file.nativeElement.addEventListener("change", (e: any) => {
      // Start editting
      this.edit();
      
      const fileInput = this.file.nativeElement;

      if(fileInput.files.length == 0){
        return; 
      }

      const file = fileInput.files[0];

      if(file.type.split("/")[0] !== "image"){
        this.fileError = "File must be an image";
        return;
      } else if(file.size / 1024 / 1024 > 4){
        this.fileError = "The image can't be greater than 4MB";
        return;
      }

      this.newImage = file;
      this.img.nativeElement.src = URL.createObjectURL(file);
    });

  }

  /**
   * Fetch the companies that user works on
   */
  fetchCompany(){
    this._http.get(environment.url("api/organization"))
        .subscribe((res: any) => {
          this.comps = res.organizations
          this.loaded = true;
        });
        
  }


  /**
   * Start editting user data
   */ 
  edit(){
    this.editting = true;
    this.form.setValue({
      name: this.user.name,
      bio: this.user.bio
    });
  }

  /**
   * Close the editting
   */
  close(){
    this.editting = false;
    this.newImage = null;
    this.fileError = null;
    this.img.nativeElement.src = this.user.profile_pic ? this.user.profile_pic : '/assets/images/user.png';
  }

  /**
   * Submit edit user form
   */
  submit(){
    const formData = new FormData();

    formData.append("name", this.form.value.name);
    formData.append("bio", this.form.value.bio);
    if(this.newImage){
      formData.append("image", this.newImage);
    }

    this.userLoading = true;
    this._user.settings(formData)
              .pipe(finalize(() => this.userLoading = false))
              .subscribe((user)=>{
                this._auth.setUser(user);
                this.close(); // Close editting
              });

  }

}

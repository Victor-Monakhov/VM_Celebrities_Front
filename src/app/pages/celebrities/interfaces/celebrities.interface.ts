import {FormControl} from "@angular/forms";

export interface ICelebrity {
  id: number;
  name: string;
  gender: string;
  movie: string;
  imageUrl: string;
  info: string;
  roles: string[];
  birthDate: Date;
}

export interface ICelebrityForm {
  name: FormControl<string>;
  gender: FormControl<string>;
  birthDate: FormControl<Date>;
  roles: FormControl<string[]>;
  currRole: FormControl<string>;
  info: FormControl<string>;
}

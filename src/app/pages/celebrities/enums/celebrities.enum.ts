export enum ECelebrityProps {
  Id = 'id',
  Name = 'name',
  Gender = 'gender',
  BirthDate = 'birthDate',
  Roles = 'roles',
  Movie = 'movie',
  ImageUrl = 'imageUrl',
  Info = 'info',
}

export const celebrityPropsDescription: { [key in ECelebrityProps]: string } = {
  [ECelebrityProps.Id]: 'id',
  [ECelebrityProps.Name]: 'name',
  [ECelebrityProps.Gender]: 'gender',
  [ECelebrityProps.BirthDate]: 'birth date',
  [ECelebrityProps.Roles]: 'roles',
  [ECelebrityProps.Movie]: 'movie',
  [ECelebrityProps.ImageUrl]: 'imageUrl',
  [ECelebrityProps.Info]: 'info',
};

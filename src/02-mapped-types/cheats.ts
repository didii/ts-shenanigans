interface PersonDto {
  id: string;
  personFirstName: string;
  personLastName: string;
  personAge: number;
}

type PersonDtoKeys = Expand<keyof PersonDto>;
type PersonModel = {
  [K in keyof PersonDto as K extends `person${infer T}` ? (T extends `${infer A}${infer B}` ? `${Lowercase<A>}${B}` : never) : K]: PersonDto[K];
};

type RemovePrefix<TDto, TPrefix extends string> = {
  [K in keyof TDto as K extends `${TPrefix}${infer T}` ? (T extends `${infer A}${infer B}` ? `${Lowercase<A>}${B}` : never) : K]: TDto[K];
};

type PersonModel2 = RemovePrefix<PersonDto, 'person'>;

export { };

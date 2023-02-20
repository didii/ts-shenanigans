type Type<T> = { new(...args: any[]): T; };

function mapFrom<T>(propName: keyof T) {
  return (target: any, propertyKey: string | symbol) => {
    if (target['__mapInfo'] == null) {
      target['__mapInfo'] = {};
    }
    target['__mapInfo'][propertyKey] = propName;
  };
}

interface PersonDto {
  id: number;
  personFirstName: string;
  personLastName: string;
}


class PersonModel {
  @mapFrom<PersonDto>('id')
  public id!: number;

  @mapFrom<PersonDto>('personFirstName')
  public firstName!: string;

  @mapFrom<PersonDto>('personLastName')
  public lastName!: string;

  public constructor(init: PersonModel) {
    Object.assign(this, init);
  }
}

class AutoMapper {
  public map<TDest, TSource>(destType: Type<TDest>, source: TSource): TDest {
    const mapInfo = destType.prototype['__mapInfo'];

    const result: TDest = new destType();
    for (const _destProp in mapInfo) {
      const destProp = _destProp as keyof TDest;
      const sourceProp = mapInfo[destProp] as keyof TSource;
      result[destProp] = source[sourceProp] as any;
    }
    return result;
  }
}

const mapper = new AutoMapper();
const source: PersonDto = { id: 54, personFirstName: 'aslidufh', personLastName: 'asl;difuh' };
const mapped = mapper.map(PersonModel, source);

console.log(mapped);

export { };

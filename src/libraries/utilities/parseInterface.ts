import { getType, Type } from "tst-reflect";

function parseInterface<TType>(type?: Type) {
  const IType = type ? type : getType<TType>(); // <<== get type of generic TType
  const result: any = {};

  IType.getProperties().forEach(({ name, type }) => {
    const value = type.name !== "" ? type.name : parseInterface(type);
    result[name] = value;
  });

  return result;
}

export default parseInterface;

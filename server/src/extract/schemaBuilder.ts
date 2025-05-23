import { z, type ZodTypeAny } from "zod";

type FieldT = "string" | "number" | "date" | "boolean";
export type SchemaFieldT = { name: string; type: FieldT };

const schemafield = (type: FieldT): ZodTypeAny => {
  switch (type) {
    case "string":
      return z.string().nullable();

    case "number":
      return z.number().nullable();

    case "date":
      return z
        .string()
        .datetime()
        .nullable()
        .transform((val) => (val ? val.split("T")[0] : null));

    case "boolean":
      return z.boolean().nullable();
  }
};

const schemaBuild = (fields: SchemaFieldT[]) => {
  const shape: Record<string, ZodTypeAny> = {};

  for (const { name, type } of fields) {
    shape[name] = schemafield(type);
  }

  return z.object(shape);
};

export default schemaBuild;

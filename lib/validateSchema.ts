import { FieldError } from "react-hook-form";
import { ZodSchema, z } from "zod";
export type SchemaFieldError = FieldError & {
  path?: string; //| (string | number)[];
  extra?: string;
};
type ErrRes<T extends object> = {
  success: false;
  errors: Record<keyof T, SchemaFieldError>;
  data: never;
};
type SuccessRes<T extends object> = {
  success: true;
  errors: never;
  data: T;
};
export type State<I extends object> =
  | {
      success: false;
      errors?: Record<keyof I, SchemaFieldError>;
      data?: never;
    }
  | { success: true; data: I; errors?: never };

//eslint-disable-next-line
type H<T extends object> = SuccessRes<T> | ErrRes<T>;
export function validateSchema<
  //T extends FieldValues,
  S extends ZodSchema = ZodSchema,
  I extends object = z.infer<S>, //State<T> //T["safeParse"]
  //> & { errors: undefined }
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: S): State<I> {
  const valid = schema.safeParse(formData);
  if (!valid.success) {
    return {
      success: valid.success,
      //data: null, //valid.data, //Object.fromEntries(formData.entries()) as any,
      errors: Object.entries(valid.error.issues)?.reduce(
        //eslint-disable-next-line
        (acc, [n, issue]) => {
          acc[
            issue.path
              .map((a) => (!Number.isNaN(a) ? a.toString() : a))
              .join(".") as keyof I
          ] = {
            ...issue,
            path: Array.isArray(issue.path) ? issue.path.join(".") : issue.path,
            type: "required",
          } as SchemaFieldError;
          //issue as unknown as SchemaFieldError;
          return acc;
        },
        {} as Record<any, SchemaFieldError>
      ),
    };
  } else {
    return {
      success: valid.success,
      data: valid.data,
      errors: undefined,
    };
  }
}

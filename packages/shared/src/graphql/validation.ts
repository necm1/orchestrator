import * as z from 'zod'
import * as types from './types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const AuthCredentialInputSchema: z.ZodObject<Properties<types.AuthCredentialInput>> = z.object({
    name: z.string(),
    password: z.string()
});

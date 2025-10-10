import { z } from "zod";

export const AuthCredentialInputSchema = z.object({
  name: z.string().min(3, {
    message: 'Der Benutzername muss mindestens 3 Zeichen enthalten',
  }).max(50, {
    message: 'Der Benutzername darf höchstens 50 Zeichen enthalten',
  }),
  password: z.string().min(8, { message: 'Das Passwort muss mindestens 8 Zeichen enthalten' }),
});

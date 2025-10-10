import { auth } from './auth';

export default async function middleware(req: any) {
  // WIP
  return auth(req);
}

import { User } from '@prisma/client';

export function isValidPayloadUser(obj: any): obj is PayloadUser {
  return 'displayName' in obj && 'id' in obj && 'email' in obj;
}

export type PayloadUser = Pick<User, 'displayName' | 'id' | 'email'>;

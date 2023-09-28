import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectDatabase, findOne } from '../../../helpers/db-util';
import { verifyPassword } from '../../../helpers/auth';

export const authOptions = {
  secret: 'thequickbrownfox',
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDatabase();

        const user = await findOne(client, 'users', { email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);

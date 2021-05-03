import { query as q } from 'faunadb';
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { fauna } from '../../../services/fauna';

export default (req, res) => NextAuth(req, res, {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            const { name, email, image } = user

            try {
              await fauna.query(
                q.If(
                  q.Not(
                    q.Exists(
                      q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(user.email)
                      )
                    )
                  ),
                  q.Create(
                    q.Collection('users'),
                      { data: {name, email, image, level: 0, currentExperience: 0, challengesCompleted: 0 } }
                    ),
                    q.Get(
                      q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(user.email)
                      )
                    )
                )
              )
              return true
            } catch {
              return false
            }
        },
    }
})
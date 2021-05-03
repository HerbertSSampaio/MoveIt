import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';
import { fauna } from "../../services/fauna";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
    const session = await getSession({ req });
    const { level, currentExperience, challengesCompleted } = req.query;

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    session.user.email
                )
            )
        )
    )

    fauna.query(
        q.Update(
            userRef,
            { data: 
                {
                    level: level,
                    currentExperience: currentExperience,
                    challengesCompleted: challengesCompleted
                }
            },
        )
      )
    }
}
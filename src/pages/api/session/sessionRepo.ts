import { MongoClient, ServerApiVersion } from 'mongodb';
import { DefaultSession, User } from 'next-auth';

export interface ISession{
	name:string,
	email:string,
	time:Date|string,
	task:string
}

const SessionRepo = () => {
    const uri = process.env.MONGODB_URI||"";
    const OAUTH_DB = process.env.DB_NAME;
    const sessionCollection = 'session';
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    const saveDetails = async (session: ISession): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            let result = null;
            try {
                await client.connect();
                const db = client.db(OAUTH_DB);
                result = await db
                    .collection(sessionCollection)
                    .insertOne(session);
            } catch (e) {
                reject(e);
            } finally {
                await client.close();
            }
            if (result) resolve(result.insertedId.toString());
        });
    };

    async function testConnection() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db('admin').command({ ping: 1 });
            console.log(
                'Session Repo Up',
            );
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    return { saveDetails, testConnection };
};

export default SessionRepo;

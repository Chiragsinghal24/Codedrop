//provide all the things related to the appwrite

import { Account, Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("651942bbd48b5af3bbf9");

const account = new Account(client);

const databases = new Databases(client);

const getCurrentUser = async () => {
  const promise = account.get();
  const result = promise
    .then((user) => {
      return user;
    })
    .catch(() => {
      return null;
    });
  return result;
};

const addCodeDropToDb = async (codeDropData) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const promise = databases.createDocument(
    "651d2479343ba1410095",
    "651d24ada0661cbabf0b",
    ID.unique(),
    {
      ...codeDropData,
      owner: user.$id,
    }
  );
  const result = promise.then((response) => response).catch(() => null);
  return result;
};

export { account, addCodeDropToDb, client, databases, getCurrentUser };


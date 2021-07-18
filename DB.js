
import { MongoClient } from 'mongodb';

async function main(){
    const uri = "mongodb+srv://test_01:test_01@cluster0.gqckr.mongodb.net/Cluster0?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await createListing(client, {
            title: "Nuovo Articolo",
            body: "lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum",
            status: "draft",
            author_name: "Brian Fox"
        });

        await createMultipleListings(client, [
            {
                title: "sample_article_1",
                body: "lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum",
                status: "draft",
                author_name: "Brian Fox"
            },
            {
                title: "sample_article_2",
                body: "lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum lorem picsum",
                status: "draft",
                author_name: "Brian Fox"
            }
        ]);

        await findOneListingByName(client, "sample_article");

        await findListingsByFeatures(client, {
            status: "draft",
            author_name: "Brian Fox",
            maximunNumberOfResults: 7
         }); 

    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error);

async function findListingsByFeatures(client, {
    status = "",
    author_name = "",
    maximunNumberOfResults = Number.MAX_SAFE_INTEGER,
} = {}) {

    const cursor = client.db("myapp_articles").collection("articles").find(
    {
        status: { $gte: status},
        characters: { $gte: author_name}
    }).sort({ title: -1 }).limit(maximunNumberOfResults);

    const results = await cursor.toArray();

    if (results.length != 0){

        console.log(`Found listing(s) with ${author_name} as author name and still in ${status} status`);
        results.forEach((result, i) =>{

            console.log();
            console.log(`${i + 1}.name: ${result.title}`);
            console.log(` _id: ${result._id}`);
            console.log(` author_name: ${author_name}`);
            console.log(` status: ${status}`);
            
        });
    }else{
        console.log(`No listings found with ${author_name} as author and with a ${status} status`);
    }

}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("myapp_articles").collection("articles").findOne({name: nameOfListing});

    if(result != 0){ 
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        
        console.log(result);
    }else{
        console.log(`No listing found with the name '${nameOfListing}'`);
    }

}

async function createMultipleListings(client, newListings){
    const result = await client.db("myapp_articles").collection("articles").insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following id(s):`);

    console.log(result.insertedIds);
}

async function createListing(client, newListing){
    const result = await client.db("myapp_articles").collection("articles").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });

}


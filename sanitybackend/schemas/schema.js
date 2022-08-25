// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

//import all created schemas
import post from './post';
import user from './user';
import comment from './comment';
import postedBy from './postedBy';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    //add imported schemas below here. sanity read here
    //terminal: sanity start | for sanity to compile the schemas
    post,
    user,
    comment,
    postedBy,
  ]),
});

/**
vercel app
github need to push then it would refresh the files to upload to domain/web
 */
export default {
  name: 'postedBy',
  title: 'PostedBy',
  //connect to difference document 
  type: 'reference',
  //array of user, 1 user can multple comments 
  to: [{ type: 'user' }],
};

//sanity docs
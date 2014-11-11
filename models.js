module.exports = [{
  identity: 'post',
  attributes: {
    title : 'string',
    content : 'string',
    category : 'array'
  },
  security : {
    "content" : ['xss']
  },
  isNode : true,
  rest : true
},{
  identity : 'tag',
  attributes : {
    name : {
      type : 'string',
      unique : true
    },
    nodes : 'json'
  },
  relations : {
    posts :{
      model : "post",
      auth : ['read'],
      multiple : true,
      reverse : {
        name : "tags",
        index:"name",
        auth : ['read','write'],
        multiple : true
      }
    }
  },
  index : 'name',
  rest : true
},{
  identity : 'avatar',
  attributes : {
    'name' : 'string',
    'originalname' : 'string',
    'mimetype' : 'string',
    'extension' : 'string',
    'size' : 'int'
  },
  isFile : true,
  rest : true
}]
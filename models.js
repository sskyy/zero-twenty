module.exports = [{
  identity: 'post',
  connection : 'mongo',
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
  identity : 'category',
  attributes : {
    name : 'string',
    nodes : 'json'
  },
  isIndex : true,
  rest : true
},{
  identity : 'media',
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
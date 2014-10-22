module.exports = [{
  identity: 'post',
  attributes: {
    title : 'string',
    content : 'string',
    category : 'array'
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
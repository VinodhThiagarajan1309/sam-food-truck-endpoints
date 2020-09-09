const AWS = require('aws-sdk');
exports.handler =  (event, context, callback) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // We need the table name
  const tableName = process.env.TABLE_NAME;

  // We need the Dynamo API to insert

  var params = {
    TableName : tableName,
    Item: {
      orderId: event.requestContext.requestId,
      lineItems: JSON.parse(event.body).lineItems,
      orderTotal: JSON.parse(event.body).orderTotal
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  // We need to return the value

  const sampleMessage = {
    "statusCode" : 201,
    "body" : JSON.stringify({
      "message" : " Your order number is " + event.requestContext.requestId + "." 
    })
  }

  return callback(null, sampleMessage);
};

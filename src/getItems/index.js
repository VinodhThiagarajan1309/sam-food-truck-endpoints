const AWS = require('aws-sdk');
exports.handler =  (event, context, callback) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // The table name
   // We need the table name
   const tableName = process.env.TABLE_NAME;

  // The scan query
  var params = {
    TableName : tableName,
  };

  var documentClient = new AWS.DynamoDB.DocumentClient();
  

  // Return the data

  documentClient.scan(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data.Items)
      }

      callback(null, response);
    }
 });

};

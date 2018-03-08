let request = require("request");
let querystring = require("querystring");

let arcgis = {
	CLIENT_ID: null, // This is set via CLI parameter
	CLIENT_SECRET: null, // This is set via CLI parameter
	URI_GENERATE_TOKEN: 'https://www.arcgis.com/sharing/rest/oauth2/token',
	URI_REQUEST_VRP: 'https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob',
};

function generateToken() {

	// Token generated using the following specs:
	// https://developers.arcgis.com/labs/rest/get-an-access-token/

	console.log("Generating token for client: " + arcgis.CLIENT_ID);

	let params = {
		method: 'POST',
		url: arcgis.URI_GENERATE_TOKEN,
		headers: {'content-type': 'application/x-www-form-urlencoded'},
		form: {
			client_id: arcgis.CLIENT_ID,
			client_secret: arcgis.CLIENT_SECRET,
			grant_type: 'client_credentials'
		}
	};

	request(params, onTokenGenerated);
}

function onTokenGenerated(error, response, body) {
	if (error) throw new Error(error);

	let payload = JSON.parse(body);

	console.log("Token generated: ", payload.access_token);
	console.log("Requesting VRP optimization...");

	requestVRPOptimization(payload.access_token);
}

function requestVRPOptimization(access_token) {

	// Request created using the following specs:
	// https://developers.arcgis.com/rest/network/api-reference/vehicle-routing-problem-service.htm
	// The request is done in asynchronous mode

	let vrpRequest = {
		"f": "json",
		"token": access_token,
		"default_date": 1520467200000,
		"orders": "{\"features\":[{\"geometry\":{\"x\":-46.63513,\"y\":-23.55587},\"attributes\":{\"Name\":\"40f77920-21ea-11e8-af81-a1ba4671b74a\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.64945,\"y\":-23.59534},\"attributes\":{\"Name\":\"505b7110-2207-11e8-9130-f32958eebb55\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-47.02045,\"y\":-22.82018},\"attributes\":{\"Name\":\"6d2e24d0-212b-11e8-95c8-cf87b3dfa7d3\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.57475,\"y\":-23.53049},\"attributes\":{\"Name\":\"74a3b160-2246-11e8-94e8-4d7d08c91c58\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.66726,\"y\":-23.52221},\"attributes\":{\"Name\":\"762a8bc0-225f-11e8-89ef-d73ccb52670f\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.61154,\"y\":-23.5719},\"attributes\":{\"Name\":\"9b6c4b10-21ed-11e8-a3e0-c5f659735340\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.63589,\"y\":-23.57667},\"attributes\":{\"Name\":\"bfac6060-21ed-11e8-8726-cd8f621357cf\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.64922,\"y\":-23.60119},\"attributes\":{\"Name\":\"f13ddd80-227c-11e8-9102-0da38ad1e4a0\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.73102,\"y\":-23.62582},\"attributes\":{\"Name\":\"f1613490-227c-11e8-a3b7-81321c85a929\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.66256,\"y\":-23.53759},\"attributes\":{\"Name\":\"f17b9ec0-227c-11e8-b719-cf8598978d8a\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.65435,\"y\":-23.56527},\"attributes\":{\"Name\":\"f191d1a0-227c-11e8-ad1d-197fcb19a7c7\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.7035,\"y\":-23.55575},\"attributes\":{\"Name\":\"f1acaf60-227c-11e8-ae25-8db08585ce00\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}},{\"geometry\":{\"x\":-46.68062,\"y\":-23.52844},\"attributes\":{\"Name\":\"f6710a40-1fc4-11e8-8ed1-3f5df7e8c6a7\",\"ServiceTime\":0,\"AssignmentRule\":3,\"TimeWindowStart1\":1520467200000,\"TimeWindowEnd1\":1520467200000,\"DeliveryQuantities\":\"1 1\"}}]}",
		"depots": "{\"features\":[{\"geometry\":{\"x\":\"-46.73735\",\"y\":\"-23.53655\"},\"attributes\":{\"Name\":\"c6de75e0-df87-11e7-a365-f115a1b70742\",\"TimeWindowStart1\":1520499600000,\"TimeWindowEnd1\":1520532000000}}]}",
		"routes": "{\"features\":[{\"attributes\":{\"Name\":\"7ed81e90-df76-11e7-8a38-adac776f3553\",\"StartDepotName\":\"c6de75e0-df87-11e7-a365-f115a1b70742\",\"EndDepotName\":\"c6de75e0-df87-11e7-a365-f115a1b70742\",\"StartDepotServiceTime\":0,\"EndDepotServiceTime\":0,\"OverTimeStartTime\":1440,\"ArriveDepartDelay\":20,\"FixedCost\":275,\"CostPerUnitTime\":1,\"CostPerUnitDistance\":1,\"CostPerUnitOvertime\":2,\"MaxOrderCount\":40,\"EarliestStartTime\":1520496000000,\"LatestStartTime\":1520532000000,\"MaxTotalTime\":1440,\"MaxTotalDistance\":1000,\"Capacities\":\"40 1000\"}}]}",
		"time_units": "Minutes",
		"distance_units": "Kilometers",
		"time_window_factor": "Medium",
		"populate_route_lines": "false",
		"populate_directions": "false"
	};

	let params = {
		method: 'POST',
		url: arcgis.URI_REQUEST_VRP + "?" + querystring.encode(vrpRequest),
		headers: {'content-type': 'application/x-www-form-urlencoded'},
	};

	request(params, onVRPSubmit)

}

function onVRPSubmit(error, response, body) {
	if (error) throw new Error(error);

	console.log("VRP response: ", body);
}

function init() {

	if(process.argv.length < 4) {
		console.error("Usage: node index.js {client_id} {client_secret}");
		return;
	}

	console.info("ArcGIS VRP Demo Application");
	console.info("Client ID: ", process.argv[2]);
	console.info("Client Secret: ", process.argv[3]);
	console.info("Date: ", (new Date()).toISOString());

	arcgis.CLIENT_ID = process.argv[2];
	arcgis.CLIENT_SECRET = process.argv[3];

	console.log("---------------");

	generateToken();
}

init();

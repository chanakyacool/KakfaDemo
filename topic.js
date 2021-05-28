const { Kafka } = require("kafkajs");

run();
async function run() {
	try {
		const kakfa = new Kafka({
			clientId: "myapplication",
			brokers: ["localhost:9092"],
		});
		const admin = kakfa.admin();
		console.log("Connecting......");
		await admin.connect();
		console.log("Connected!");
		// A-M N-Z
		await admin.createTopics({
			topics: [
				{
					topic: "Posts",
					numPartitions: 2,
				},
			],
		});
		console.log("Created Successfully!");
		await admin.disconnect();
	} catch (error) {
		console.log(`Something bad happened ${error}`);
	} finally {
		process.exit(0);
	}
}

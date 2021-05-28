const { Kafka } = require("kafkajs");

run();
async function run() {
	try {
		const kakfa = new Kafka({
			clientId: "myapplication",
			brokers: ["localhost:9092"],
		});
		const consumer = kakfa.consumer({
			groupId: "test",
		});
		console.log("Connecting......");
		await consumer.connect();
		console.log("Connected!");
		await consumer.subscribe({
			topic: "Posts",
			fromBeginning: true,
		});

		await consumer.run({
			eachMessage: async (result) => {
				console.log(
					`Recieved Message ${result.message.value} on partition ${result.partition}`
				);
			},
		});
	} catch (error) {
		console.log(`Something bad happened ${error}`);
	} finally {
	}
}

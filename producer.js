const { Kafka } = require("kafkajs");
const msg = process.argv[2]; // Second argument from node[arg0] producer.js[arg1] test[arg2]
run();
async function run() {
	try {
		const kakfa = new Kafka({
			clientId: "myapplication",
			brokers: ["localhost:9092"],
		});
		const producer = kakfa.producer();
		console.log("Connecting......");
		await producer.connect();
		console.log("Connected!");
		// A-M 0  N-Z 1
		const partition = msg[0] < "N" ? 0 : 1;
		const result = await producer.send({
			topic: "Posts",
			messages: [
				{
					value: msg,
					partition: partition,
				},
			],
		});

		console.log(`Send Successfully! ${JSON.stringify(result)}`);
		await producer.disconnect();
	} catch (error) {
		console.log(`Something bad happened ${error}`);
	} finally {
		process.exit(0);
	}
}

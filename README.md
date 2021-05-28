# Kakfka Zookeeper Demo

Demonstration with Kafka-Zookeeper

## Installation

Project requires [Node.js](https://nodejs.org/) v10+ to run.

### Create a docker network

```sh
docker network create -d bridge kafka-network
```

### Zookeeper

```sh
docker run -d -p 2181:2181 --network kafka-network --name zookeeper zookeeper:latest
```

### Kafka

```sh
docker run -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 --network kafka-network --name kafka1 confluentinc/cp-kafka:latest
```

`KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1` if not used it will assume there are 3 nodes, the default value is 1

### Topics, Consumer and Producer

1. Connect Topics
   `node topics.js`
2. Create the data
   `node producer.js test_name`
3. Fetch the data
   `node consumer.js`

> Step can be run twice for each partition or else one consumer will detect the data for both of the partitions
> we have 2 partitions

## License

MIT

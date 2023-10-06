import {
    SubqlCosmosDatasourceKind,
    SubqlCosmosHandlerKind,
    CosmosProject
} from "@subql/types-cosmos";


// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
    specVersion: "1.0.0",
    version: "0.0.1",
    name: "neutron-starter",
    description:
        "This project can be use as a starting point for developing your Cosmos neutron based SubQuery project",
    runner: {
        node: {
            name: "@subql/node-cosmos",
            version: ">=3.0.0",
        },
        query: {
            name: "@subql/query",
            version: "*",
        },
    },
    schema: {
        file: "./schema.graphql",
    },
    network: {
        /* The genesis hash of the network (hash of block 0) */
        chainId: "neutron-1",
        /**
         * This endpoint must be a public non-pruned archive node
         * Public nodes may be rate limited, which can affect indexing speed
         * When developing your project we suggest getting a private API key
         * You can get them from OnFinality for free https://app.onfinality.io
         * https://documentation.onfinality.io/support/the-enhanced-api-service
         */
        endpoint: [
                "https://rpc-kralum.neutron-1.neutron.org",
                "https://neutron-rpc.lavenderfive.com",
                "https://rpc-neutron.whispernode.com",
        ],
    },
    dataSources: [
        {
            kind: SubqlCosmosDatasourceKind.Runtime,
            startBlock: 1,
            mapping: {
                file: './dist/index.js',
                handlers: [
                    {
                        handler: 'handleAirdropClaim',
                        kind: SubqlCosmosHandlerKind.Message,
                        filter: {
                            type: "/cosmwasm.wasm.v1.MsgExecuteContract",
                            contractCall: "claim",
                            values: {
                                contract: "neutron198sxsrjvt2v2lln2ajn82ks76k97mj72mtgl7309jehd0vy8rezs7e6c56"
                            }
                        }
                    }
                ]
            },
        },
    ],
};

export default project;
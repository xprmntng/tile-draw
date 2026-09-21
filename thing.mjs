import { fromBinary } from "@bufbuild/protobuf";
import { TileSchema } from "./gen/proto/vector_tile_pb.js";
import * as pako from "pako";
import * as fs from "fs";

function main() {
    const compressedData = fs.readFileSync("zxy/0/0/0.pbf");
    const decompressedData = pako.inflate(new Uint8Array(compressedData));

    const tile = fromBinary(TileSchema, decompressedData);
    extractFeatures(tile.layers[0]);
}

function extractFeatures(layer) {
    for (const feature of layer.features) {
        console.log(feature.geometry);
    }
}

main();

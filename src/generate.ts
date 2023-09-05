import { Writer } from "@treecg/connector-types";
import { Parser, Quad } from "n3";

async function _generate(
  writer: Writer<Quad[]>,
) {
  console.log("Not Generating!", writer);

}

export async function generate(
  writer: Writer<Quad[]>,
) {
  _generate(writer);
}

import { assertEquals } from "@std/assert";
import { Helper } from "@utils";

Deno.test({
  name: "Helper | convert json to object",
  async fn() {
    assertEquals(
      { firstname: "Marcus", lastname: "Garvey", age: 45 },
      await Helper.convertJsonToObject("/tests/data/user.json"),
    );
  },
});

Deno.test({
  name: "Helper | convert file to string",
  async fn() {
    assertEquals(
      '{\n  "firstname": "Marcus",\n  "lastname": "Garvey",\n  "age": 45\n}\n',
      await Helper.convertFileToString("/tests/data/user.json"),
    );
  },
});

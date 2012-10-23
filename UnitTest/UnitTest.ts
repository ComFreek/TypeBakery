///<reference path="../EventHandler.ts" />

module TypeBakery.UnitTests {

  export interface TestReturnData {
    msg: string;
    status: bool;
  }

  export interface TestCallback {
    (data: TestReturnData): any;
  }

  export class UnitTest extends TypeBakery.EventHandler {
    public asynchronous: bool = false;
    private statusCallback: TestCallback;
    
    public start(callback?: TestCallback): any {
      if (!this.asynchronous) {
        return this.run();
      }

      else {
        this.statusCallback = callback;
        this.run();
      }
    }

    private run(): any {
      return { msg: "Derive a class", status: false };
    }

    private fireStatus(data: TestReturnData) {
      this.statusCallback(data);
    }
  }

  export function run(unitTest: string, callback: TestCallback) {
    var obj = new UnitTests[unitTest]();
    return obj.start(callback);
  }
}
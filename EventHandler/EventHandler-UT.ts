///<reference path="EventHandler.ts" />
///<reference path="../UnitTest/UnitTest.ts" />

module TypeBakery.UnitTests {

  export class EventHandlerTest extends TypeBakery.UnitTests.UnitTest {
    public asynchronous = true;

    public run() {
      var $this = this;

      this.addEventListener("test", function () {
        $this.fireStatus({ msg: "Normal event handler 'test' fired.", status: true });
      });

      var test2EvtListener = function () {
        $this.fireStatus({ msg: "This removed event handler 'test2' MUST NOT be fired!", status: false });
      }
      this.addEventListener("test2", test2EvtListener);

      var test3EvtListener = function (i) {
        return function () {
          $this.fireStatus({ msg: "Testing multiple event handlers, this is #" + i + ".", status: true });
          i++;
        };
      }
      this.addEventListener("test3", test3EvtListener(1));
      this.addEventListener("test3", test3EvtListener(2));

      this.fireEvent("test");
      this.removeEventListener("test2", test2EvtListener);
      this.fireEvent("test2");
      
      this.fireEvent("test3");
    }
  }
}
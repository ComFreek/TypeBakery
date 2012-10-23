///<reference path="UnitTest.ts" />

///<reference path="../EventHandler/EventHandler-UT.ts" />

module TypeBakery.UnitTests {

  var outputList = document.getElementById("lOutput");
  
  function log(data) {
    var str = "<li class='" + (data.status ? "good" : "bad") + "'>";
    str += "<span class='spMsgContainer'>Message: <span class='spMsg'>" + data.msg + "</span></span>";
    str += "<br />";
    outputList.innerHTML += str;
  }

  export function start() {
    UnitTests.run("EventHandlerTest", log);
  }

}
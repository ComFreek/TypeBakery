var TypeBakery;
(function (TypeBakery) {
    var EventHandler = (function () {
        function EventHandler() {
            this.evtListeners = {
            };
        }
        EventHandler.prototype.addEventListener = function (type, evtHandler) {
            if(!this.evtListeners[type]) {
                this.evtListeners[type] = [];
            }
            this.evtListeners[type].push(evtHandler);
        };
        EventHandler.prototype.removeEventListener = function (type, evtHandler) {
            if(!this.evtListeners[type]) {
                return;
            }
            var evtFuncs = this.evtListeners[type];
            for(var i = 0, len = evtFuncs.length; i < len; i++) {
                if(evtFuncs[i] == evtHandler) {
                    this.evtListeners[type].splice(i, 1);
                }
            }
        };
        EventHandler.prototype.fireEvent = function (type, data, context) {
            if (typeof data === "undefined") { data = null; }
            if (typeof context === "undefined") { context = null; }
            var evtFuncs = this.evtListeners[type];
            if(!evtFuncs) {
                return;
            }
            for(var i = 0, len = evtFuncs.length; i < len; i++) {
                evtFuncs[i].apply(context, data);
            }
        };
        return EventHandler;
    })();
    TypeBakery.EventHandler = EventHandler;    
})(TypeBakery || (TypeBakery = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var TypeBakery;
(function (TypeBakery) {
    (function (UnitTests) {
        var UnitTest = (function (_super) {
            __extends(UnitTest, _super);
            function UnitTest() {
                _super.apply(this, arguments);

                this.asynchronous = false;
            }
            UnitTest.prototype.start = function (callback) {
                if(!this.asynchronous) {
                    return this.run();
                } else {
                    this.statusCallback = callback;
                    this.run();
                }
            };
            UnitTest.prototype.run = function () {
                return {
                    msg: "Derive a class",
                    status: false
                };
            };
            UnitTest.prototype.fireStatus = function (data) {
                this.statusCallback(data);
            };
            return UnitTest;
        })(TypeBakery.EventHandler);
        UnitTests.UnitTest = UnitTest;        
        function run(unitTest, callback) {
            var obj = new UnitTests[unitTest]();
            return obj.start(callback);
        }
        UnitTests.run = run;
    })(TypeBakery.UnitTests || (TypeBakery.UnitTests = {}));
    var UnitTests = TypeBakery.UnitTests;

})(TypeBakery || (TypeBakery = {}));

var TypeBakery;
(function (TypeBakery) {
    (function (UnitTests) {
        var EventHandlerTest = (function (_super) {
            __extends(EventHandlerTest, _super);
            function EventHandlerTest() {
                _super.apply(this, arguments);

                this.asynchronous = true;
            }
            EventHandlerTest.prototype.run = function () {
                var $this = this;
                this.addEventListener("test", function () {
                    $this.fireStatus({
                        msg: "Normal event handler 'test' fired.",
                        status: true
                    });
                });
                var test2EvtListener = function () {
                    $this.fireStatus({
                        msg: "This removed event handler 'test2' MUST NOT be fired!",
                        status: false
                    });
                };
                this.addEventListener("test2", test2EvtListener);
                var test3EvtListener = function (i) {
                    return function () {
                        $this.fireStatus({
                            msg: "Testing multiple event handlers, this is #" + i + ".",
                            status: true
                        });
                        i++;
                    }
                };
                this.addEventListener("test3", test3EvtListener(1));
                this.addEventListener("test3", test3EvtListener(2));
                this.fireEvent("test");
                this.removeEventListener("test2", test2EvtListener);
                this.fireEvent("test2");
                this.fireEvent("test3");
            };
            return EventHandlerTest;
        })(TypeBakery.UnitTests.UnitTest);
        UnitTests.EventHandlerTest = EventHandlerTest;        
    })(TypeBakery.UnitTests || (TypeBakery.UnitTests = {}));
    var UnitTests = TypeBakery.UnitTests;

})(TypeBakery || (TypeBakery = {}));

var TypeBakery;
(function (TypeBakery) {
    (function (UnitTests) {
        var outputList = document.getElementById("lOutput");
        function log(data) {
            var str = "<li class='" + (data.status ? "good" : "bad") + "'>";
            str += "<span class='spMsgContainer'>Message: <span class='spMsg'>" + data.msg + "</span></span>";
            str += "<br />";
            outputList.innerHTML += str;
        }
        function start() {
            TypeBakery.UnitTests.run("EventHandlerTest", log);
        }
        UnitTests.start = start;
    })(TypeBakery.UnitTests || (TypeBakery.UnitTests = {}));
    var UnitTests = TypeBakery.UnitTests;

})(TypeBakery || (TypeBakery = {}));


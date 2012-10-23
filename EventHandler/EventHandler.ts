module TypeBakery {
  export interface EventListener {
    (evtData: any): any;
  }

  export class EventHandler {
    private evtListeners: any = {};

    public addEventListener(type: string, evtHandler: EventListener) {
      if (!this.evtListeners[type]) {
        this.evtListeners[type] = [];
      }
      this.evtListeners[type].push(evtHandler);
    }

    public removeEventListener(type: string, evtHandler: EventListener) {
      if (!this.evtListeners[type]) {
        return;
      }

      var evtFuncs = this.evtListeners[type];

      for (var i = 0, len = evtFuncs.length; i < len; i++) {
        if (evtFuncs[i] == evtHandler) {
          this.evtListeners[type].splice(i, 1);
        }
      }
    }

    public fireEvent(type: string, data: any = null, context: any = null) {
      var evtFuncs = this.evtListeners[type];

      if (!evtFuncs) {
        return;
      }

      for (var i = 0, len = evtFuncs.length; i < len; i++) {
        evtFuncs[i].apply(context, data);
      }
    }
  }
}
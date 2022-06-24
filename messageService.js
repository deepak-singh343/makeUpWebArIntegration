class MessageService {
  constructor() {
    this.iframe = null;
    this.queue = [];
  }
  sendMessageToRendererOnProductChange(product) {
    const body = {
      event: "productChanged",
      from: "mirrar",
      data: product,
    };
    if (!this.sendEvent(body)) {
      // iframe not intialized
      // put it in queue
      this.queue.push({
        fn: "sendMessageToRendererOnProductChange",
        param: [product],
      });
    }
  }
  sendMessageToRendererOnDeselection(product) {
    const body = {
      event: "productRemoved",
      from: "mirrar",
      data: product,
    };
    if (!this.sendEvent(body)) {
      // iframe not intialized
      // put it in queue
      this.queue.push({
        fn: "sendMessageToRendererOnDeselection",
        param: [product],
      });
    }
  }
  getFrame() {
    console.log('hello')
    return this.iframe;
  }
  sendEvent(body) {
    let iframe = this.getFrame();
    if (iframe) {
      iframe.contentWindow.postMessage(body, "*");
      return true;
    } else {
      return null;
    }
  }
  setIframe(iframe) {
    this.iframe = iframe;
    this.emptyQueue();
  }
  emptyQueue(iframe) {
    for (let i of this.queue) {
      try {
        this[i.fn](...i.param);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

let messageService = new MessageService();

export { messageService as MessageService };

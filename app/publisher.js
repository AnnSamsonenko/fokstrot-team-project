export class Publisher{

    subscribers = {};
    
    constructor(){
        if (!Publisher._instance) {
            Publisher._instance = this;
        }
        return Publisher._instance;
    }

    subscribe(ev,func){
        if(!this.subscribers[ev]){
            this.subscribers[ev] = [];
        }
        this.subscribers[ev].push(func);
    }
    unsubscribe(ev,func){
        if(!this.subscribers[ev]){
            this.subscribers[ev] = [];
        }
        this.subscribers[ev] = this.subscribers[ev].filter(listener => listener!=func);
    }
    notice(ev,...data){
        if(!this.subscribers[ev]){
            this.subscribers[ev] = [];
        } 
        this.subscribers[ev].forEach(item => item(...data));

    }
}
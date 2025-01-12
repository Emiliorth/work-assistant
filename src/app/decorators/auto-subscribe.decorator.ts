export function AutoSubscribe(component: any, key: string | symbol): void {
    const subscriptions = 'subscriptions';
    const originalOnInit = component.ngOnInit;
    component.ngOnInit = function () {
        const componentName = this['componentName'];
        if (!this[subscriptions]) console.error(subscriptions + ' variable not found in component: ' + componentName + ' and function: ' + key.toString());
        if (originalOnInit) originalOnInit.call(this);
        this[subscriptions].add(this[key]());
    };
}
export default class ShopItem {
    uuid = Math.random() * 1e16;
    constructor(item, cost, costType) {
        this.gear = item;
        this.cost = cost;
        this.costType = costType;
    }
}
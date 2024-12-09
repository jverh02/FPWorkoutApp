export default class Shop {
    shopItems = [];

    constructor() {
        this.addItem = function (item) {
            this.shopItems.push(item);
            return this;
        }
        this.getShopItems = function() {
            return this.shopItems;
        }
        this.sell = function (item, player) {
            switch(item.costType) {
                case "Gold":
                    if(player.gold > item.cost) {
                        this.removeItem(item);
                        player.gold -= item.cost;
                        player.addGear(item.gear);
                        console.log("Sold " + item.gear.name);
                        console.log(player.chest);
                    }
                    break;
                case "Reputation":
                    if(player.reputation > item.cost) {
                        this.removeItem(item);
                        player.reputation -= item.cost;
                        player.addGear(item.gear);
                        console.log("Sold " + item.gear.name);
                    }
                    break;
            }
        }
        this.removeItem = function (item) {
            this.shopItems.splice(this.shopItems.indexOf(item), 1);
        }
    }
}
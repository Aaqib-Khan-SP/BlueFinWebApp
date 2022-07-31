export interface Order {
}

export class Credentials {
    phoneNumber: string;
    password: string;
    constructor(phoneNumber: string, password: string) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}

export class Item {
    itemId: string;
    name: string;
    localName: string;
    imageURL: string;
    shopID: string;
    quantity: string;
    rate: string;

    constructor(
        itemId: string,
        name: string,
        localName: string,
        imageURL: string,
        shopID: string,
        quantity: string,
        rate: string
    ) {
        this.itemId = itemId
        this.name = name
        this.localName = localName
        this.imageURL = imageURL
        this.shopID = shopID
        this.quantity = quantity
        this.rate = rate
    }
}

export class Stock {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items
    }
}
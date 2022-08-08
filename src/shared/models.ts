export class ErrorResponse {
    traceID: string;
    userMessage: string;
    constructor(traceID: string, userMessage: string) {
        this.traceID = traceID
        this.userMessage = userMessage
    }
}
export class Credentials {
    userId?: string;
    phoneNumber: string;
    password: string;
    emailId?: string

    constructor(
        userId: string,
        phoneNumber: string,
        password: string,
        emailId: string
    ) {
        this.userId = userId
        this.phoneNumber = phoneNumber
        this.password = password
        this.emailId = emailId
    }

}

export class Item {
    itemId: string;
    name: string;
    localName: string;
    imageURL: string;
    shopID: string;
    quantity: number;
    rate: number;

    constructor(
        itemId: string,
        name: string,
        localName: string,
        imageURL: string,
        shopID: string,
        quantity: number,
        rate: number
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

export class AddressDetails {
    type?: string;
    addressLine1: string;
    addressLine2: string;
    district: string;
    city: string;
    pincode: number;
    landmark: string;

    constructor(
        addressLine1: string,
        addressLine2: string,
        district: string,
        city: string,
        pincode: number,
        landmark: string
    ) {
        this.addressLine1 = addressLine1
        this.addressLine2 = addressLine2
        this.district = district
        this.city = city
        this.pincode = pincode
        this.landmark = landmark
    }
}

export class ContactInfo {
    phoneNumber: string;
    alternateNumber: string;
    emailId: string;

    constructor(phoneNumber: string, alternateNumber: string, emailId: string) {
        this.phoneNumber = phoneNumber
        this.alternateNumber = alternateNumber
        this.emailId = emailId
    }
}

export class CustomerInfo {
    customerId: string;
    firstName: string;
    lastName: string;
    primaryOutletId: string;
    contactInfo: ContactInfo;

    constructor(
        customerId: string,
        firstName: string,
        lastName: string,
        primaryOutletId: string,
        contactInfo: ContactInfo
    ) {
        this.customerId = customerId
        this.firstName = firstName
        this.lastName = lastName
        this.primaryOutletId = primaryOutletId
        this.contactInfo = contactInfo
    }
}

export class CustomerInfoForOrder extends CustomerInfo {
    addressDetails: AddressDetails;
    constructor(customerId: string, firstName: string, lastName: string, primaryOutletId: string, contactInfo: ContactInfo, addressDetails: AddressDetails) {
        super(customerId, firstName, lastName, primaryOutletId, contactInfo);
        this.addressDetails = addressDetails
    }
}

export class CustomerFullDetails extends CustomerInfo {
    addresses: AddressDetails[];
}

export class TrackingItem {
    status: string;
    time: string;
    constructor(status: string, time: string) {
        this.status = status
        this.time = time
    }
}

export class TrackingDetails {
    trackingId: string;
    trackingItems: TrackingItem[];
    constructor(trackingId: string, trackingItem: TrackingItem[]) {
        this.trackingId = trackingId
        this.trackingItems = trackingItem
    }
}

export class Order {
    orderId?: string;
    orderDateTime: Date = new Date;
    transactionId: string;
    customerInfo: CustomerInfoForOrder;
    items: Item[];
    trackingDetails: TrackingDetails;

    constructor(
        customerInfo: CustomerInfoForOrder,
        items: Item[],
    ) {
        this.customerInfo = customerInfo
        this.items = items
    }
}

export class CustomerData {
    customerDetails: CustomerFullDetails;
    orders: Order[];
    constructor(customerDetails: CustomerFullDetails, orders: Order[]) {
        this.customerDetails = customerDetails
        this.orders = orders
    }
}
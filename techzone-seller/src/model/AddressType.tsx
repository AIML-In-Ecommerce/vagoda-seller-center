export type Address = {
    street: string;
    idCommune: string;
    idDistrict: string;
    idProvince: string;
    country: string;
}

export type AddressType = {
    _id: string;
    receiverName: string,
    address: Address,
    phoneNumber: string,
    addressType: string,
    note?: string,
    selectedAsDefault: boolean // is selected as default address
}
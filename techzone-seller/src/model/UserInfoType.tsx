
interface AddressCoordinate
{
    _id: string,
    lng: number,
    lat: number
}

export type UserShippingAddressType =
{
    _id: string,
    street: string,
    idProvince: string,
    idDistrict: string,
    idCommune: string,
    country: string,
    receiverName: string,
    phoneNumber: string,
    coordinate: AddressCoordinate | null,
    label: string,
    isDefault: boolean
}

export type UserInfoType = 
{
    _id: string,
    fullName: string,
    avatar: string,
    dob: string,
    phoneNumber: string,
    // address: UserShippingAddressType[],
    createAt: Date | string
    account: string,
    __v: number
}

export type SimpleUserInfoType =
{
    _id: string,
    fullName: string,
    avatar: string,
    dob: string,
    phoneNumber: string,
    createAt: Date | string
    account: string,
    __v: number
}
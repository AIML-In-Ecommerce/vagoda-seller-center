import axios from 'axios';
import * as jsonData from './db.json';
import { Address } from '@/model/AddressType';

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const USER_PORT = process.env.NEXT_PUBLIC_USER_PORT
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX

export interface ShippingAddress {
    street: string;
    idProvince: string;
    idDistrict: string;
    idCommune: string;
    country: string;
    receiverName: string;
    phoneNumber: string;
    coordinate: Coordinate;
    label: string;
    isDefault: boolean;
    _id: string;
}

export interface Coordinate {
    lng: number;
    lat: number;
    _id: string;
}

export interface Province {
    idProvince: string;
    name: string;
}
export interface District {
    idProvince: string;
    idDistrict: string;
    name: string;
}
export interface Commune {
    idDistrict: string;
    idCommune: string;
    name: string;
}

export function getProvince() {
    const provinceList: Province[] = jsonData.province;
    return provinceList;
}

export function getDistrict(idProvince: any) {
    const districtList: District[] = jsonData.district.filter(item => item.idProvince === idProvince);
    return districtList;
}

export function getCommune(idDistrict: any) {
    const communeList: Commune[] = jsonData.commune.filter(item => item.idDistrict === idDistrict);
    return communeList;
}

export function getFullAddress(address: Address): string {
    const { street, idProvince, idDistrict, idCommune, country } = address;

    try {
        const [provinces, districts, communes] = [getProvince(), getDistrict(idProvince), getCommune(idDistrict)];

        const province = provinces.find((p: any) => p.idProvince === idProvince);
        const district = districts.find((d: any) => d.idDistrict === idDistrict);
        const commune = communes.find((c: any) => c.idCommune === idCommune);

        const provinceName = province!.name;
        const districtName = district!.name;
        const communeName = commune!.name;

        return `${street}, ${communeName}, ${districtName}, ${provinceName}, ${country}`;
    } catch (error) {
        console.error("Failed to get full address:", error);
        return 'Address not found';
    }
}

export async function GET_getUserShippingAddress(userId: string) {
    const url = `${GATEWAY_PREFIX}/user_info/shipping_address?userId=${userId}`
    try {
        const response = await axios.get(url);
        if (userId == null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        let responseData = response.data;
        if (response.status === 200) {
            const shippingAddress = responseData.data as ShippingAddress[];
            return { isDenied: false, message: "Get Shipping Address successfully", status: response.status, data: shippingAddress }
        }
        else {
            return { isDenied: true, message: "Failed to get Shipping Address", status: response.status, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get Shipping Address: ", error)
        return { isDenied: true, message: "Failed to get Shipping Address", status: 500, data: undefined }
    }
}

export async function POST_addUserShippingAddress(userId: string, shippingAddress: ShippingAddress) {
    const url = `${GATEWAY_PREFIX}/user_info/shipping_address?userId=${userId}`
    try {
        const response = await axios.post(url, {
            "street": shippingAddress.street,
            "idProvince": shippingAddress.idProvince,
            "idDistrict": shippingAddress.idDistrict,
            "idCommune": shippingAddress.idCommune,
            "country": shippingAddress.country ?? "Việt Nam",
            "receiverName": shippingAddress.receiverName,
            "phoneNumber": shippingAddress.phoneNumber,
            "coordinate": shippingAddress.coordinate ?? {},
            "label": shippingAddress.label,
            "isDefault": shippingAddress.isDefault,
        });
        if (userId === null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        if (response.status === 200) {
            const ResponseData = response.data;
            const addressList: ShippingAddress[] = ResponseData.data;
            return { isDenied: false, message: response.statusText, status: response.status, data: addressList }
        }
        else {
            return { isDenied: true, message: response.statusText, status: response.status, data: undefined }
        }
    } catch (error) {
        console.error("Failed to update Shipping Address: ", error)
        return { isDenied: true, message: "Failed to insert Shipping Address", status: 500, data: undefined }
    }
}

export async function PUT_updateUserShippingAddress(userId: string, shippingAddress: ShippingAddress) {
    const url = `${GATEWAY_PREFIX}/user_info/shipping_address?userId=${userId}&targetId=${shippingAddress._id}`;
    try {
        const response = await axios.put(url, {
            "street": shippingAddress.street,
            "idProvince": shippingAddress.idProvince,
            "idDistrict": shippingAddress.idDistrict,
            "idCommune": shippingAddress.idCommune,
            "country": shippingAddress.country ?? "Việt Nam",
            "receiverName": shippingAddress.receiverName,
            "phoneNumber": shippingAddress.phoneNumber,
            "coordinate": shippingAddress.coordinate ?? {},
            "label": shippingAddress.label,
            "isDefault": shippingAddress.isDefault,
        });
        if (userId === null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        if (response.status === 200) {
            return { isDenied: false, message: response.statusText, status: response.status, data: undefined }
        }
        else {
            return { isDenied: true, message: response.statusText, status: response.status, data: undefined }
        }
    } catch (error) {
        console.error("Failed to insert Shipping Address: ", error)
        return { isDenied: true, message: "Failed to update Shipping Address", status: 500, data: undefined }
    }
}

export async function DELETE_removeUserShippingAddress(userId: string, _id: string) {
    const url = `${GATEWAY_PREFIX}/user_info/shipping_address?userId=${userId}&targetId=${_id}`;
    try {
        const response = await axios.delete(url);
        if (userId === null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        if (response.status === 200) {
            return { isDenied: false, message: response.statusText, status: response.status, data: undefined }
        }
        else {
            return { isDenied: true, message: response.statusText, status: response.status, data: undefined }
        }
    } catch (error) {
        console.error("Failed to delete Shipping Address: ", error)
        return { isDenied: true, message: "Failed to delete Shipping Address", status: 500, data: undefined }
    }
}
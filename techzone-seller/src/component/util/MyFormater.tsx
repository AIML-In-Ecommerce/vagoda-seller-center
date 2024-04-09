import locale from "antd/es/date-picker/locale/en_US"

interface MyLocale 
{
    locale: string,
    currency: string,
}

export const MyLocaleRef = 
{
    VN:
    {
        locale: "vi-VN",
        currency: "VND"
    },
    EN_US:
    {
        locale: "en-US",
        currency: "DLR"
    }
}

export function currencyFormater2(locale: MyLocale, value: number ,maximumSignificantDigits: number| undefined, maximumFractionDigits: number| undefined)
{
    const option: Intl.NumberFormatOptions =
    {
        maximumSignificantDigits: maximumSignificantDigits, 
        maximumFractionDigits: maximumFractionDigits,
        style: "currency",
        currency: locale.currency
    }

    const formater = Intl.NumberFormat(locale.locale, option)

    return formater.format(value)
}

export function currencyFormater(locale: MyLocale, value: number)
{
    const option: Intl.NumberFormatOptions =
    {
        style: "currency",
        currency: locale.currency
    }

    const formater = Intl.NumberFormat(locale.locale, option)

    return formater.format(value)
}

export function datetimeFormaterShort(locale: MyLocale, value: Date | number)
{
    const myoption: Intl.DateTimeFormatOptions =
    {
        dateStyle: "short",
        timeStyle: "short"
    }

    const date = new Date(value).getTime()

    const formater = Intl.DateTimeFormat(locale.locale, myoption)

    return formater.format(date * 1000)
}

export function datetimeFormaterLong(locale: MyLocale, value: Date | number)
{
    const myoption: Intl.DateTimeFormatOptions =
    {
        dateStyle: "long",
        timeStyle: "long"
    }
    const date = new Date(value).getTime()
    const formater = Intl.DateTimeFormat(locale.locale, myoption)
    
    return formater.format(date * 1000)
}

export function datetimeFormaterFull(locale: MyLocale, value: Date | number)
{
    const myoption: Intl.DateTimeFormatOptions =
    {
        dateStyle: "full",
        timeStyle: "full"
    }

    const date = new Date(value).getTime()
    const formater = Intl.DateTimeFormat(locale.locale, myoption)

    return formater.format(date * 1000)
}
interface CurrencyProps {
    value: number,
    locales?: Intl.LocalesArgument, // default: "vi-VN"
    currency?: string, // default: "VND"
    minimumFractionDigits?: number, // default: 0
}

//Default formatting for Vietnamese currency
//How to use: <Currency value={value} locales={..} currency={..} mininumFractionDigits={..}/>

export const Currency = (props: CurrencyProps) => {
    return <span>
        {props.value.toLocaleString(props.locales ?? "vi-VN", {
            style: "currency",
            currency: props.currency ?? "VND",
            minimumFractionDigits: props.minimumFractionDigits ?? 0
        })}</span>
}

export function formatCurrencyFromValue(props: CurrencyProps) {
    return  Number(props.value).toLocaleString(props.locales ?? "vi-VN", {
        style: "currency",
        currency: props.currency ?? "VND",
        minimumFractionDigits: props.minimumFractionDigits ?? 0
    })
}
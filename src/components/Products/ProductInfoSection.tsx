import { PropsWithChildren } from "react";


export const ProductInfoSection = ({title, children} : PropsWithChildren<{title: string}> ) => {
    
    return (
        <section className="space-y-2">
            <h2 className="text-base text-neutral-500">{title}</h2>
            {children}
        </section>
    )
}
import { PropsWithChildren, useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

export const FilterContainer = ({title, children} : PropsWithChildren<{title: string}>) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="space-y-4 border-b pb-4">
            <div className="flex items-center justify-between">
                <h4>{title}</h4>
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <RiSubtractLine /> : <RiAddLine />}</button>
            </div>
            <div className={`${isOpen ? "max-h-96" : "max-h-0"} transition-all overflow-hidden`}>
                {children}
            </div>
        </section>
    )
}
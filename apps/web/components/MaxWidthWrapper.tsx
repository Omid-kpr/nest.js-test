//for styling all pages with similar styles and have optionality to ad more styles

import { ReactNode } from "react"

function MaxWidthWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className={`mx-auto w-full max-w-screen-xl px-2.5 md:px-20`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
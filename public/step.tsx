import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={56}
        height={54}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M48.128 0 56 4.726l-7.647 4.62c-.146-.159-.237-.21-.241-.27-.116-1.314-.854-1.97-2.214-1.967h-6.981v2.347c.008 3.07.027 6.136.027 9.207 0 2.01-.958 2.927-3.001 2.924-4.34-.008-8.677-.012-13.017-.008-.309 0-.617.043-1.077.075v2.007c0 2.912-.004 5.824-.008 8.737-.004 3.01-.594 3.611-3.572 3.615-4.063 0-8.125.028-12.184-.02-1.006-.011-1.375.233-1.355 1.308.068 3.54.056 7.085 0 10.626-.016.992.313 1.26 1.283 1.26 14.632-.027 29.264-.027 43.893.004 1.057 0 1.322-.312 1.318-1.335-.031-11.175 0-22.354-.043-33.528-.004-1.21.336-1.537 1.532-1.514 3.287.072 3.251.02 3.247 3.296-.015 11.293-.004 22.586-.004 33.88 0 .395.012.786.004 1.18-.035 1.846-.91 2.74-2.78 2.743-4.771.016-9.543-.008-14.315.008-6.427.02-12.85.075-19.277.079-5.639 0-11.278-.04-16.913-.087-1.735-.016-2.65-.9-2.657-2.624-.024-5.785-.024-11.57 0-17.35.008-1.802.875-2.628 2.748-2.64 4.34-.024 8.676-.04 13.017.012 1.033.012 1.358-.273 1.338-1.328-.063-3.461-.024-6.927-.016-10.388.004-1.81.844-2.715 2.653-2.726 4.376-.036 8.756-.056 13.132 0 1.073.011 1.326-.34 1.31-1.348-.06-3.461-.035-6.927-.027-10.388.004-1.857.89-2.742 2.752-2.746 3.196-.008 6.391-.052 9.583.035 1.22.032 1.778-.28 1.564-1.549-.032-.185.02-.383.052-.865L48.128 0Z"
        />
    </svg>
)
export default SvgComponent

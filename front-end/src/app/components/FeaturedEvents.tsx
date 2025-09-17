
import {useRouter} from 'next/navigation';

export function FeaturedEventsSection(){
    const router = useRouter();
    router.push("/featured_events");
    return (
        <></>
    );
}



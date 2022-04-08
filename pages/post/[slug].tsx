import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";

function Post() {
    return <main>
        <Header />

    </main>;
}

export default Post;

export const getStaticPaths = async () => {
    const query = 
}
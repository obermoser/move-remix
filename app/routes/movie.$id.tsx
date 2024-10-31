import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
    const url = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=de-DE`, {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`

        }
    })
    return json(await url.json());
}

export default function MovieId() {
    const data = useLoaderData<typeof loader>();
    return (
        <div className="min-h-screen p-10">
            <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}?api_key=8dc8f8536d3d3e74ba48381f642fffd6`} className="h-[40vh] object-cover object-center w-full rounded-lg shadow-md" alt="" />
            <h1 className="text-4xl font-bold text-center pt-5">
                {data.title}
            </h1>
            <div className="flex gap-x-10 mt-10">
                <div className="w-1/2 font-medium">
                    <h1><span className="underline">Homepage:</span>
                        <Link
                            to={data.homepage}
                            target="_blank"
                            rel="noreferrer"
                        > Link</Link></h1>

                    <h1>
                        <span className="underline">Originalsprache:</span>{" "}{data.original_language}
                    </h1>

                    <h1>
                        <p className="leading-7"><span className="underline">Overview: <br /></span>{data.overview}</p>
                        <p><span className="underline">Release: {" "}</span>{new Date(data.release_date).toLocaleDateString("de-DE")}</p>
                    </h1>
                </div>


                <div className="w-1/2">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
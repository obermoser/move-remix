/* eslint-disable react/jsx-key */
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData, useParams } from "@remix-run/react";
import { prisma } from '../db.server'

export async function loader({ params }: LoaderFunctionArgs) {
    const data = await prisma.comment.findMany({
        where: {
            movieId: params.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return json({ data })
}


export default function MovieComments() {
    const { id } = useParams()
    const { data } = useLoaderData<typeof loader>();
    return (
        <div className="rounded-lg border p-4">
            <h1 className="text-xl font-regular mb-8 pb-8">
                <div>
                    <Form method="POST">
                        <textarea name="comment" className="w-full mb-4 h-32 border border-teal-500 rounded-lg p-2" placeholder="not yet implemented">

                        </textarea>
                        <input type="hidden" name="id" value={id} />
                        <button type="submit" className="border bg-teal-500 w-full px-4 py-2 rounded-lg text-white">Absenden</button>
                    </Form>

                    <div className="mt-5 flex flex-col gap-y-3">
                        {data.map((post) => (
                            <div className="" key={post.id}>
                                <p>{post.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </h1>
        </div>
    )
}
/* eslint-disable react/jsx-key */
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData, useNavigation, useParams } from "@remix-run/react";
import { prisma } from '../utils/db.server'

export async function loader({ params }: LoaderFunctionArgs) {
    const data = await prisma.comment.findMany({
        cacheStrategy: {
            swr: 150,
            ttl: 3600
        },
        where: {
            movieId: params.id
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 20,
    })

    return json({ data })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const data = await prisma.comment.create({
        data: {
            message: formData.get('comment') as string,
            movieId: formData.get('id') as string
        },
        select: {
            id: true,
            message: true,
            movieId: true
        }
    })
    return json({ data });
}


export default function MovieComments() {
    const { id } = useParams()
    const { data } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    return (
        <div className="rounded-lg border p-4">
            <h1 className="text-xl font-regular mb-8 pb-8">
                <div>
                    <Form method="POST">
                        <textarea required name="comment" className="w-full mb-4 h-32 border border-teal-500 rounded-lg p-2" placeholder="Sag uns deine Meinung...">

                        </textarea>
                        <input type="hidden" name="id" value={id} />
                        {navigation.state === "submitting" ? (
                            <button type="button" disabled className="border bg-teal-100 w-full px-4 py-2 rounded-lg text-white">lade...</button>

                        ) : (
                            <button type="submit" className="border bg-teal-500 w-full px-4 py-2 rounded-lg text-white">Absenden</button>

                        )}
                    </Form>

                    <div className="mt-5 flex flex-col gap-y-3">
                        {data.map((post) => (
                            <div className="" key={post.id}>
                                <p>{post.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </h1 >
        </div >
    )
}
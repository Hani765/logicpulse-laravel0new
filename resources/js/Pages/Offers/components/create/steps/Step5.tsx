import SubmitBtn from "@/components/ui/SubmitBtn";
import { Head } from "@inertiajs/react";
interface stepProp {
    data: any;
    onClick: any;
    fetchedData: any;
    fetchedUsersData: any;
    processing: Boolean;
}
interface InputField {
    url: string;
    deviceType: string;
}
export default function Step5({
    data,
    onClick,
    processing,
    fetchedData,
    fetchedUsersData,
}: stepProp) {
    return (
        <div>
            <Head title="Review" />
            <div className="space-y-2 bg-white dark:bg-sate-800 shadow rounded p-2">
                <h3 className="text-lg font-bold">Title:</h3>
                <p>{data.title}</p>
                <h3 className="text-lg font-bold">Descripton:</h3>
                <p>{data.description}</p>
                <h3 className="text-lg font-bold">Keywords:</h3>
                <p>{data.keywords}</p>
                <h3 className="text-lg font-bold">Image:</h3>
                <img
                    src={data.image}
                    alt={data.image}
                    className="w-full h-[300px]"
                />
                <div className="md:grid grid-cols-3">
                    <div>
                        <h3 className="text-lg font-bold">Age:</h3>
                        <p>{data.age}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Rate:</h3>
                        <p>{data.rate}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Proxy:</h3>
                        <p>{data.proxy}</p>
                    </div>
                </div>
                <div className="md:grid grid-cols-3">
                    <div>
                        <h3 className="text-lg font-bold">Network:</h3>
                        <p>
                            {data.network_id !== ""
                                ? fetchedData.networks.find(
                                      (network: any) =>
                                          network.unique_id === data.network_id,
                                  )?.name
                                : "not selected"}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Domain:</h3>
                        <p>
                            {data.domain_id !== ""
                                ? fetchedData.domains.find(
                                      (domain: any) =>
                                          domain.unique_id === data.domain_id,
                                  )?.name
                                : "not selected"}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Category:</h3>
                        <p>
                            {data.category_id !== ""
                                ? fetchedData.categories.find(
                                      (category: any) =>
                                          category.unique_id ===
                                          data.category_id,
                                  )?.name
                                : "not selected"}
                        </p>
                    </div>
                </div>
                <h3 className="text-lg font-bold">Urls:</h3>
                <table className="w-full">
                    <thead className="w-full">
                        <tr>
                            <td>id</td>
                            <td>Url</td>
                            <td>DeviceTYpe</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.urls.map((input: InputField, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{input.url}</td>
                                <td>{input.deviceType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg font-bold">Status:</h3>
                        <p className="shadow bg-gray-500 text-white px-1 py-0.5 w-fit">
                            {data.status}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Who can apply:</h3>
                        <p className="shadow bg-gray-500 text-white px-1 py-0.5 w-fit">
                            {data.appliableFor}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex py-2 items-center justify-end">
                <SubmitBtn
                    label="Submit"
                    processing={processing}
                    onClick={onClick}
                />
            </div>
        </div>
    );
}

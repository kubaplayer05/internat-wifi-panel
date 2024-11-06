import ApplicationsTable from "@/components/applicationsTable";

export default function ApplicationPage() {

    return (
        <main className="flex flex-col p-10 items-center gap-10">
            <h1 className="text-3xl">Przechowywane podania.</h1>
            <ApplicationsTable/>
        </main>
    )
}